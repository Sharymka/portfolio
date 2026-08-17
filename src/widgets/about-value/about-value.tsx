'use client';

import type { CSSProperties, ReactNode } from 'react';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import styles from './about-value.module.scss';

const BLOB_RADIUS = '38% 62% 63% 37% / 41% 44% 56% 59%';

interface Card {
  title: string;
  body: string;
  gradient: string;
  radius: string;
  rotate?: number;
  icon: ReactNode;
}

const CARDS: Card[] = [
  {
    title: 'Убираю лишние запросы',
    body: 'Перевела главную ленту с SSR на RTK Query — повторные запросы сократились с 3–4 до 0 благодаря клиентскому кэшированию.',
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
    title: 'Собираю сложные модули',
    body: 'Создала модуль отзывов с бесконечной пагинацией, оптимистическими обновлениями и inline-редактированием без перехода на отдельную страницу.',
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
    title: 'Ускоряю загрузку',
    body: 'Использую SSR, lazy loading и code splitting для ускорения первой загрузки и уменьшения объёма JavaScript.',
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
    title: 'Использую AI как инженерный инструмент',
    body: 'Интегрировала Cursor, Codex и MCP в процесс разработки: исследование → проектирование → реализация → ревью кода.',
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
    title: 'Проектирую архитектуру приложений',
    body: 'Разделяю ответственность между Server и Client Components, использую SSR и гидратацию в Next.js App Router.',
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
    title: 'Синхронизирую состояние',
    body: 'Связала Redux, URL и API — фильтры каталога сохраняются при навигации и обновлении страницы.',
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
    title: 'Покрываю код тестами',
    body: 'Использую Vitest для проверки компонентов и бизнес-логики, снижая риск регрессий.',
    gradient: 'linear-gradient(140deg, var(--color-accent-2-300), var(--color-accent-2-700))',
    radius: BLOB_RADIUS,
    rotate: 3,
    icon: <path d="M20 6 9 17l-5-5" />,
  },
];

export function AboutValue() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>Обо мне</h6>
      <h2 className={styles.heading}>
        Пишу код<span className={styles.commaThin}>,</span> который приносит
        <br />
        <span className={styles.gradientAccent}>пользу пользователям</span>{' '}
        <span className={styles.commaThin}>и</span>{' '}
        <span className={styles.gradientAccent2}>результат продукту</span>
      </h2>
      <div className={styles.grid}>
        {CARDS.map((card) => {
          const iconStyle: CSSProperties = {
            background: card.gradient,
            borderRadius: card.radius,
            transform: card.rotate ? `rotate(${card.rotate}deg)` : undefined,
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
                  {card.icon}
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
