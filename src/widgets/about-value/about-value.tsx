'use client';

import type { CSSProperties, ReactNode } from 'react';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './about-value.module.scss';

const BLOB_RADIUS = '38% 62% 63% 37% / 41% 44% 56% 59%';

interface CardMeta {
  gradient: string;
  radius: string;
  rotate?: number;
  icon: ReactNode;
}

interface CardCopy {
  title: string;
  body: string;
}

const CARD_META: CardMeta[] = [
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-2-400), var(--color-accent-2-700))',
    radius: BLOB_RADIUS,
    rotate: -4,
    icon: (
      <>
        <path d="m12 14 4-4" />
        <path d="M3.34 19a10 10 0 1 1 17.32 0" />
      </>
    ),
  },
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-2-300), var(--color-accent-500))',
    radius: '50%',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-500), var(--color-accent-2-500))',
    radius: BLOB_RADIUS,
    rotate: 4,
    icon: (
      <>
        <path d="m13 2-2 2.5h3L12 7" />
        <path d="M12 22a10 10 0 1 0-8-16" />
        <path d="M2 12h4" />
        <path d="M12 2v2" />
      </>
    ),
  },
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-2-400), var(--color-accent-700))',
    radius: '50%',
    icon: (
      <>
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 2v10l7 5" />
      </>
    ),
  },
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-400), var(--color-accent-2-600))',
    radius: BLOB_RADIUS,
    rotate: -3,
    icon: (
      <>
        <path d="M4 20V10" />
        <path d="M12 20V4" />
        <path d="M20 20v-6" />
      </>
    ),
  },
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-300), var(--color-accent-700))',
    radius: '50%',
    icon: (
      <>
        <path d="M17 2v20" />
        <path d="M7 2v20" />
        <path d="M2 12h20" />
      </>
    ),
  },
  {
    gradient: 'linear-gradient(140deg, var(--color-accent-2-300), var(--color-accent-2-700))',
    radius: BLOB_RADIUS,
    rotate: 3,
    icon: <path d="M20 6 9 17l-5-5" />,
  },
];

const COPY = {
  ru: {
    kicker: 'Обо мне',
    headingStart: 'Пишу код',
    headingMid: 'который приносит',
    and: 'и',
    highlight1: 'пользу пользователям',
    highlight2: 'результат продукту',
    cards: [
      {
        title: 'Убираю лишние запросы',
        body: 'Перевела главную ленту с SSR на RTK Query — повторные запросы сократились с 3–4 до 0 благодаря клиентскому кэшированию.',
      },
      {
        title: 'Собираю сложные модули',
        body: 'Создала модуль отзывов с бесконечной пагинацией, оптимистическими обновлениями и inline-редактированием без перехода на отдельную страницу.',
      },
      {
        title: 'Ускоряю загрузку',
        body: 'Использую SSR, lazy loading и code splitting для ускорения первой загрузки и уменьшения объёма JavaScript.',
      },
      {
        title: 'Использую AI как инженерный инструмент',
        body: 'Интегрировала Cursor, Codex и MCP в процесс разработки: исследование → проектирование → реализация → ревью кода.',
      },
      {
        title: 'Проектирую архитектуру приложений',
        body: 'Разделяю ответственность между Server и Client Components, использую SSR и гидратацию в Next.js App Router.',
      },
      {
        title: 'Синхронизирую состояние',
        body: 'Связала Redux, URL и API — фильтры каталога сохраняются при навигации и обновлении страницы.',
      },
      {
        title: 'Покрываю код тестами',
        body: 'Использую Vitest для проверки компонентов и бизнес-логики, снижая риск регрессий.',
      },
    ] satisfies CardCopy[],
  },
  en: {
    kicker: 'About me',
    headingStart: 'I write code',
    headingMid: 'that delivers',
    and: 'and',
    highlight1: 'value to users',
    highlight2: 'results to the product',
    cards: [
      {
        title: 'I eliminate redundant requests',
        body: 'Migrated the main feed from SSR to RTK Query — repeat requests dropped from 3–4 to 0 thanks to client-side caching.',
      },
      {
        title: 'I build complex modules',
        body: 'Built a reviews module with infinite pagination, optimistic updates, and inline editing without navigating to a separate page.',
      },
      {
        title: 'I speed up load times',
        body: 'Use SSR, lazy loading, and code splitting to speed up the initial load and reduce JavaScript bundle size.',
      },
      {
        title: 'I use AI as an engineering tool',
        body: 'Integrated Cursor, Codex, and MCP into the dev workflow: research → design → implementation → code review.',
      },
      {
        title: 'I design application architecture',
        body: 'Split responsibilities between Server and Client Components, use SSR and hydration in the Next.js App Router.',
      },
      {
        title: 'I sync state',
        body: 'Connected Redux, the URL, and the API — catalog filters persist across navigation and page reloads.',
      },
      {
        title: 'I cover code with tests',
        body: 'Use Vitest to test components and business logic, reducing regression risk.',
      },
    ] satisfies CardCopy[],
  },
};

export function AboutValue() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>{copy.kicker}</h6>
      <h2 className={styles.heading}>
        {copy.headingStart}
        <span className={styles.commaThin}>,</span> {copy.headingMid}
        <br />
        <span className={styles.gradientAccent}>{copy.highlight1}</span>{' '}
        <span className={styles.commaThin}>{copy.and}</span>{' '}
        <span className={styles.gradientAccent2}>{copy.highlight2}</span>
      </h2>
      <div className={styles.grid}>
        {CARD_META.map((meta, i) => {
          const card = copy.cards[i];
          const iconStyle: CSSProperties = {
            background: meta.gradient,
            borderRadius: meta.radius,
            transform: meta.rotate ? `rotate(${meta.rotate}deg)` : undefined,
          };
          return (
            <div key={card.title} className={styles.card}>
              <div className={styles.icon} style={iconStyle}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {meta.icon}
                </svg>
              </div>
              <div className={styles.cardTitle}>{card.title}</div>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
