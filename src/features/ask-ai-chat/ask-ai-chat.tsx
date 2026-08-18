'use client';

import { useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useLanguage } from '@/shared/lib/language';
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
    errorFallback: 'ИИ-ассистент временно недоступен, попробуйте позже, или напишите мне напрямую.',
  },
  en: {
    startingMessage:
      'Hi! Ask me something about me and my work, or pick one of the ready-made questions below.',
    placeholder: 'Ask something...',
    submitLabel: 'Send',
    errorFallback:
      'The AI assistant is temporarily unavailable, please try again later, or message me directly.',
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

  function ask(text: string) {
    if (busy) return;
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
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? styles.rowUser : styles.rowAi}>
            <div className={m.role === 'user' ? styles.bubbleUser : styles.bubbleAi}>
              {m.parts.map((part) => (part.type === 'text' ? part.text : '')).join('')}
            </div>
          </div>
        ))}
        {error && (
          <div className={styles.rowAi}>
            <div className={styles.bubbleAi}>{copy.errorFallback}</div>
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
        <input
          className={styles.input}
          type="text"
          placeholder={copy.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
        <button
          type="submit"
          className={styles.submit}
          aria-label={copy.submitLabel}
          disabled={busy}
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
      </form>
    </div>
  );
}
