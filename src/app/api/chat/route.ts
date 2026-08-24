import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { buildSystemPrompt } from '@/features/ask-ai-chat/model/system-prompt';
import type { Lang } from '@/shared/lib/language';

export const maxDuration = 30;

const MAX_MESSAGE_LENGTH = 500;
const MAX_MESSAGES = 40;

type ErrorReason = 'rate_limited' | 'invalid_request' | 'service_unavailable';

// Checked once at module load. If Upstash isn't provisioned (today's actual
// state), we must not attempt to construct a real client or hit the network
// at request time — that either hangs for seconds or fails open.
const hasUpstashConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const ratelimit = hasUpstashConfig
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '10 m'),
    })
  : null;

function errorResponse(status: number, error: ErrorReason): Response {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function partText(part: unknown): string {
  if (isRecord(part) && part.type === 'text' && typeof part.text === 'string') {
    return part.text;
  }
  return '';
}

function messageText(parts: unknown[]): string {
  return parts.map(partText).join('');
}

function isValidRole(role: unknown): role is 'user' | 'assistant' {
  return role === 'user' || role === 'assistant';
}

/**
 * Validates the raw, untrusted `messages` payload from the request body.
 * Rejects anything that would otherwise crash later processing (missing
 * `parts`), bypass the system-prompt guardrails (a forged `role: "system"`
 * message), or blow past sane size/length limits.
 */
function parseMessages(value: unknown): UIMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) {
    return null;
  }

  for (const message of value) {
    if (!isRecord(message) || !Array.isArray(message.parts)) {
      return null;
    }
    if (!isValidRole(message.role)) {
      return null;
    }
    if (messageText(message.parts).length > MAX_MESSAGE_LENGTH) {
      return null;
    }
  }

  return value as UIMessage[];
}

function narrowLang(lang: unknown): Lang {
  return lang === 'en' ? 'en' : 'ru';
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return errorResponse(400, 'invalid_request');
  }

  if (!isRecord(body)) {
    return errorResponse(400, 'invalid_request');
  }

  const messages = parseMessages(body.messages);
  if (!messages) {
    return errorResponse(400, 'invalid_request');
  }

  if (!ratelimit) {
    return errorResponse(503, 'service_unavailable');
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  let success: boolean;
  try {
    ({ success } = await ratelimit.limit(ip));
  } catch {
    return errorResponse(503, 'service_unavailable');
  }
  if (!success) {
    return errorResponse(429, 'rate_limited');
  }

  const lang = narrowLang(body.lang);

  const result = streamText({
    model: google('gemini-3.5-flash-lite'),
    system: buildSystemPrompt(lang),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
