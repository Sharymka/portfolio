import { google } from '@ai-sdk/google';
import {
  streamText,
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  APICallError,
  type UIMessage,
} from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { buildSystemPrompt } from '@/features/ask-ai-chat/model/system-prompt';
import { MAX_MESSAGE_LENGTH } from '@/features/ask-ai-chat/model/limits';
import type { Lang } from '@/shared/lib/language';

export const maxDuration = 30;

const MAX_MESSAGES = 40;

// Checked once at module load. If Upstash isn't provisioned (today's actual
// state), we must not attempt to construct a real client or hit the network
// at request time — that either hangs for seconds or fails open.
const hasUpstashConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const ratelimit = hasUpstashConfig
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      // 25, not the original 10 — a genuinely curious visitor easily sends
      // that many messages in one sitting; the limit exists to stop abuse,
      // not to interrupt an ordinary conversation.
      limiter: Ratelimit.slidingWindow(25, '10 m'),
    })
  : null;

class ChatError extends Error {
  constructor(code: 'rate_limited' | 'service_unavailable') {
    super(code);
  }
}

/**
 * Maps whatever went wrong to a short code — never a full sentence. The
 * client (ask-ai-chat.tsx) owns the RU/EN wording for each code, so this
 * function's job is only to classify.
 *
 * Distinguishing Gemini's own per-minute vs per-day quota is best-effort:
 * Google returns a 429 with a quota-metric identifier in the response body
 * that conventionally contains "PerMinute" or "PerDay", but that convention
 * isn't a documented guarantee for this specific API. An unrecognized 429
 * falls back to a generic "the AI is busy" code rather than guessing which
 * one it was.
 */
function classifyError(error: unknown): string {
  if (error instanceof ChatError) {
    return error.message;
  }
  if (APICallError.isInstance(error) && error.statusCode === 429) {
    const body = error.responseBody ?? '';
    if (/perday|\bdaily\b/i.test(body)) return 'gemini_rate_limited_day';
    if (/perminute/i.test(body)) return 'gemini_rate_limited_minute';
    return 'gemini_rate_limited';
  }
  console.error('Unhandled /api/chat error:', error);
  return 'unknown_error';
}

function errorResponse(status: number, error: string): Response {
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
 * message), or blow past sane size limits. The length cap only applies to
 * `user` messages — `assistant` messages are the model's own prior replies
 * echoed back as conversation history by useChat, and routinely run longer
 * than a single typed question (especially once Markdown formatting is in
 * play), so capping them the same way would reject ordinary conversations
 * a few turns in.
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
    if (message.role === 'user' && messageText(message.parts).length > MAX_MESSAGE_LENGTH) {
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

  const lang = narrowLang(body.lang);

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      if (!ratelimit) {
        throw new ChatError('service_unavailable');
      }

      const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
      let success: boolean;
      try {
        ({ success } = await ratelimit.limit(ip));
      } catch {
        throw new ChatError('service_unavailable');
      }
      if (!success) {
        throw new ChatError('rate_limited');
      }

      const result = streamText({
        model: google('gemini-3.5-flash-lite'),
        system: buildSystemPrompt(lang),
        messages: await convertToModelMessages(messages),
      });
      writer.merge(result.toUIMessageStream());
    },
    onError: classifyError,
  });

  return createUIMessageStreamResponse({ stream });
}
