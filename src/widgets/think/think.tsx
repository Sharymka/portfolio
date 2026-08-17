'use client';

import type { ReactNode } from 'react';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import styles from './think.module.scss';

const ITEMS: Array<{
  title: string;
  body: string;
  gradient: string;
  radius: string;
  icon: ReactNode;
}> = [
  {
    title: 'Сначала понимаю ограничения',
    body: 'Прежде чем выбирать решение, определяю требования, ограничения и то, что нельзя менять.',
    gradient: 'linear-gradient(140deg, var(--color-accent-400), var(--color-accent-700))',
    radius: '50%',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </>
    ),
  },
  {
    title: 'Простота — по умолчанию',
    body: 'Выбираю самое простое решение и усложняю его только тогда, когда это действительно необходимо.',
    gradient: 'linear-gradient(140deg, var(--color-accent-2-400), var(--color-accent-2-700))',
    radius: '38% 62% 63% 37% / 41% 44% 56% 59%',
    icon: (
      <>
        <path d="M16 16h6" />
        <path d="M2 16h6" />
        <path d="M12 3v18" />
        <path d="m2 16 4-9 4 9" />
        <path d="m16 16 4-9 4 9" />
      </>
    ),
  },
  {
    title: 'Думаю о развитии проекта',
    body: 'Предпочитаю решения, которые легко поддерживать, расширять и при необходимости изменить.',
    gradient: 'linear-gradient(140deg, var(--color-accent-2-300), var(--color-accent-500))',
    radius: '50%',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
];

export function Think() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section id="think" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <div className={styles.intro}>
        <h6 className={styles.kicker}>Как я думаю</h6>
        <h2 className={styles.heading}>
          <span className={styles.gradientText}>Инженерный подход</span>
          <span className={styles.commaThin}>,</span> а не просто реализация
        </h2>
        <p className={styles.lead}>
          Каждое техническое решение принимаю с учетом требований продукта, ограничений проекта и
          долгосрочной поддержки кода.
        </p>
      </div>
      <div className={styles.items}>
        {ITEMS.map((item) => (
          <div key={item.title} className={styles.item}>
            <div
              className={styles.itemIcon}
              style={{ background: item.gradient, borderRadius: item.radius }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {item.icon}
              </svg>
            </div>
            <div>
              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.itemBody}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
