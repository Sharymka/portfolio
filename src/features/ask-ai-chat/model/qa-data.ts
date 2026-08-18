import type { Lang } from '@/shared/lib/language';

export interface QaEntry {
  question: string;
  keywords: string[];
  answer: string;
}

export const QA_DATA: Record<Lang, QaEntry[]> = {
  ru: [
    {
      question: 'Как ты подходишь к сложным задачам на фронте?',
      keywords: ['сложн', 'решен', 'подход'],
      answer:
        'Стараюсь синхронизировать состояние между источниками правды заранее — например, между Redux, URL и API, — чтобы данные не терялись при навигации. Подробнее — в разделе «Обо мне».',
    },
    {
      question: 'Каким кейсом ты больше всего гордишься?',
      keywords: ['кейс', 'горд', 'проект', 'альфа'],
      answer:
        'Работой над Экосистемой Альфа: устранила повторные сетевые запросы при переключении вкладок каталога — с 3-4 до 0. Детали — в разделе «Кейсы».',
    },
    {
      question: 'Какой стек предпочитаешь?',
      keywords: ['стек', 'технолог', 'язык'],
      answer:
        'Основной стек — React, TypeScript, Next.js, Redux Toolkit с RTK Query. Также есть опыт backend: Node.js, Express, Laravel, PostgreSQL.',
    },
    {
      question: 'Готова к переезду или удалёнке?',
      keywords: ['переезд', 'удал', 'релокац'],
      answer:
        'Открыта к удалённой работе и гибридному формату; переезд обсуждаем индивидуально. Лучше уточнить в разделе «Контакты».',
    },
  ],
  en: [
    {
      question: 'How do you approach complex frontend problems?',
      keywords: ['complex', 'solv', 'approach'],
      answer:
        'I try to sync state across sources of truth early on — for example, between Redux, the URL, and the API — so data doesn\'t get lost during navigation. More details in the "About me" section.',
    },
    {
      question: 'Which case are you most proud of?',
      keywords: ['case', 'proud', 'project', 'alpha'],
      answer:
        'Working on the Alpha Ecosystem: I eliminated repeat network requests when switching catalog tabs — from 3-4 down to 0. Details in the "Cases" section.',
    },
    {
      question: "What's your preferred stack?",
      keywords: ['stack', 'technolog', 'language'],
      answer:
        'My main stack is React, TypeScript, Next.js, Redux Toolkit with RTK Query. I also have backend experience: Node.js, Express, Laravel, PostgreSQL.',
    },
    {
      question: 'Are you open to relocation or remote work?',
      keywords: ['relocat', 'remote', 'moving'],
      answer:
        'I\'m open to remote work and hybrid setups; relocation is something we can discuss individually. Best to check the "Contact" section.',
    },
  ],
};

const FALLBACK_ANSWER: Record<Lang, string> = {
  ru: 'Хороший вопрос — отвечу подробно лично. Оставьте сообщение в разделе «Контакты», и я вернусь с ответом.',
  en: 'Good question — I\'ll answer that in detail personally. Leave a message in the "Contact" section and I\'ll get back to you.',
};

export function answerFor(text: string, lang: Lang): string {
  const lower = text.toLowerCase();
  const hit = QA_DATA[lang].find((qa) => qa.keywords.some((k) => lower.includes(k)));
  return hit ? hit.answer : FALLBACK_ANSWER[lang];
}
