'use client';

import { useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/shared/lib/language';
import { MAX_MESSAGE_LENGTH } from './model/limits';
import styles from './ask-ai-chat.module.scss';

const QUICK_PROMPTS = {
  ru: [
    'Как ты подходишь к сложным задачам на фронте?',
    'Каким кейсом ты больше всего гордишься?',
    'Какой стек предпочитаешь?',
    'Готова к переезду или удалёнке?',
  ],
  en: [
    'How do you approach complex frontend problems?',
    'Which case are you most proud of?',
    "What's your preferred stack?",
    'Are you open to relocation or remote work?',
  ],
};

const COPY = {
  ru: {
    startingMessage:
      'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
    placeholder: 'Спросите что-нибудь...',
    submitLabel: 'Отправить',
    tooLong: `Слишком длинное сообщение — сократите до ${MAX_MESSAGE_LENGTH} символов.`,
    errorFallback:
      'Не получилось отправить сообщение — возможно, вопросов было слишком много, или ассистент временно недоступен. Попробуйте через несколько минут или напишите мне напрямую.',
  },
  en: {
    startingMessage:
      'Hi! Ask me something about me and my work, or pick one of the ready-made questions below.',
    placeholder: 'Ask something...',
    submitLabel: 'Send',
    tooLong: `Message is too long — keep it under ${MAX_MESSAGE_LENGTH} characters.`,
    errorFallback:
      "Couldn't send your message — you may be asking too fast, or the assistant is temporarily unavailable. Try again in a few minutes, or message me directly.",
  },
};

// Keyed by the short error code the server's /api/chat route returns (see
// classifyError in route.ts) — not full sentences, so the client owns all
// the translated wording. Any code not listed here (including a genuinely
// unrecognized one) falls back to the generic errorFallback above.
const ERROR_COPY: Record<string, { ru: string; en: string }> = {
  rate_limited: {
    ru: 'Вы задали уже немало вопросов подряд — подождите немного и попробуйте снова, или напишите мне напрямую.',
    en: "You've asked quite a few questions in a row — wait a bit and try again, or message me directly.",
  },
  gemini_rate_limited_minute: {
    ru: 'ИИ сейчас обрабатывает много вопросов от разных посетителей — подождите примерно минуту и попробуйте снова.',
    en: 'The AI is handling a lot of questions from other visitors right now — wait about a minute and try again.',
  },
  gemini_rate_limited_day: {
    ru: 'Бесплатный дневной лимит вопросов к ИИ на сегодня исчерпан — возвращайтесь завтра, или напишите мне напрямую.',
    en: "Today's free daily limit for AI questions is used up — come back tomorrow, or message me directly.",
  },
  gemini_rate_limited: {
    ru: 'ИИ сейчас перегружен запросами — попробуйте через пару минут, или напишите мне напрямую.',
    en: 'The AI is overloaded right now — try again in a couple of minutes, or message me directly.',
  },
  service_unavailable: {
    ru: 'ИИ-ассистент временно недоступен — попробуйте позже, или напишите мне напрямую.',
    en: 'The AI assistant is temporarily unavailable — try again later, or message me directly.',
  },
};

export function AskAiChat() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const busy = status === 'submitted' || status === 'streaming';
  const tooLong = input.length > MAX_MESSAGE_LENGTH;
  const errorMessage = error ? (ERROR_COPY[error.message]?.[lang] ?? copy.errorFallback) : null;

  function ask(text: string) {
    if (busy || text.length > MAX_MESSAGE_LENGTH) return;
    sendMessage({ text }, { body: { lang } });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    ask(text);
    setInput('');
  }

  return (
    <div className={styles.card}>
      <div className={styles.messages}>
        <div className={styles.rowAi}>
          <div className={styles.bubbleAi}>{copy.startingMessage}</div>
        </div>
        {messages.map((m) => {
          const text = m.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
          return (
            <div key={m.id} className={m.role === 'user' ? styles.rowUser : styles.rowAi}>
              <div className={m.role === 'user' ? styles.bubbleUser : styles.bubbleAi}>
                {m.role === 'user' ? text : <ReactMarkdown>{text}</ReactMarkdown>}
              </div>
            </div>
          );
        })}
        {errorMessage && (
          <div className={styles.rowAi}>
            <div className={styles.bubbleAi}>{errorMessage}</div>
          </div>
        )}
      </div>
      <div className={styles.prompts}>
        {QUICK_PROMPTS[lang].map((question) => (
          <button
            key={question}
            type="button"
            className={styles.promptButton}
            onClick={() => ask(question)}
            disabled={busy}
          >
            {question}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formRow}>
          <input
            className={styles.input}
            type="text"
            placeholder={copy.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
            aria-invalid={tooLong}
          />
          <button
            type="submit"
            className={styles.submit}
            aria-label={copy.submitLabel}
            disabled={busy || tooLong}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
        {tooLong && <p className={styles.lengthError}>{copy.tooLong}</p>}
      </form>
    </div>
  );
}
