'use client';

import { useState, type FormEvent } from 'react';
import { answerFor, QA_DATA } from './model/qa-data';
import styles from './ask-ai-chat.module.scss';

interface Message {
  role: 'ai' | 'user';
  text: string;
}

const STARTING_MESSAGE: Message = {
  role: 'ai',
  text: 'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
};

export function AskAiChat() {
  const [messages, setMessages] = useState<Message[]>([STARTING_MESSAGE]);
  const [input, setInput] = useState('');

  function respondTo(question: string, answer: string) {
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: answer }]);
    }, 300);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    respondTo(text, answerFor(text));
    setInput('');
  }

  return (
    <div className={styles.card}>
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? styles.rowUser : styles.rowAi}>
            <div className={m.role === 'user' ? styles.bubbleUser : styles.bubbleAi}>{m.text}</div>
          </div>
        ))}
      </div>
      <div className={styles.prompts}>
        {QA_DATA.map((qa) => (
          <button
            key={qa.question}
            type="button"
            className={styles.promptButton}
            onClick={() => respondTo(qa.question, qa.answer)}
          >
            {qa.question}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Спросите что-нибудь..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className={styles.submit} aria-label="Отправить">
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
