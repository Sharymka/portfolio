import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { buildSystemPrompt } from '@/features/ask-ai-chat/model/system-prompt';
import type { Lang } from '@/shared/lib/language';

const MAX_MESSAGE_LENGTH = 500;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 m'),
});

function lastMessageText(messages: UIMessage[]): string {
  const last = messages[messages.length - 1];
  if (!last) return '';
  return last.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
}

export async function POST(req: Request) {
  let body: { messages: UIMessage[]; lang: Lang };
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const { messages, lang } = body;

  if (!Array.isArray(messages)) {
    return new Response(null, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response(null, { status: 429 });
  }

  if (lastMessageText(messages).length > MAX_MESSAGE_LENGTH) {
    return new Response(null, { status: 400 });
  }

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system: buildSystemPrompt(lang),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
