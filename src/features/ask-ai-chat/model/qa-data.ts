export interface QaEntry {
  question: string;
  keywords: string[];
  answer: string;
}

export const QA_DATA: QaEntry[] = [
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
];

const FALLBACK_ANSWER =
  'Хороший вопрос — отвечу подробно лично. Оставьте сообщение в разделе «Контакты», и я вернусь с ответом.';

export function answerFor(text: string): string {
  const lower = text.toLowerCase();
  const hit = QA_DATA.find((qa) => qa.keywords.some((k) => lower.includes(k)));
  return hit ? hit.answer : FALLBACK_ANSWER;
}
