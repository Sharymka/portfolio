'use client';

import type { ReactNode } from 'react';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './think.module.scss';

interface ItemMeta {
  gradient: string;
  radius: string;
  icon: ReactNode;
}

interface ItemCopy {
  title: string;
  body: string;
}

const ITEM_META: ItemMeta[] = [
  {
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

const COPY = {
  ru: {
    kicker: 'Как я думаю',
    headingStart: 'Инженерный подход',
    headingEnd: 'а не просто реализация',
    lead: 'Каждое техническое решение принимаю с учетом требований продукта, ограничений проекта и долгосрочной поддержки кода.',
    items: [
      {
        title: 'Сначала понимаю ограничения',
        body: 'Прежде чем выбирать решение, определяю требования, ограничения и то, что нельзя менять.',
      },
      {
        title: 'Простота — по умолчанию',
        body: 'Выбираю самое простое решение и усложняю его только тогда, когда это действительно необходимо.',
      },
      {
        title: 'Думаю о развитии проекта',
        body: 'Предпочитаю решения, которые легко поддерживать, расширять и при необходимости изменить.',
      },
    ] satisfies ItemCopy[],
  },
  en: {
    kicker: 'How I think',
    headingStart: 'An engineering approach',
    headingEnd: 'not just implementation',
    lead: 'I make every technical decision with product requirements, project constraints, and long-term maintainability in mind.',
    items: [
      {
        title: 'I understand the constraints first',
        body: "Before picking a solution, I define the requirements, constraints, and what can't be changed.",
      },
      {
        title: 'Simplicity by default',
        body: "I choose the simplest solution and only add complexity when it's truly necessary.",
      },
      {
        title: "I think about the project's growth",
        body: 'I prefer solutions that are easy to maintain, extend, and change when needed.',
      },
    ] satisfies ItemCopy[],
  },
};

export function Think() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section id="think" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <div className={styles.intro}>
        <h6 className={styles.kicker}>{copy.kicker}</h6>
        <h2 className={styles.heading}>
          <span className={styles.gradientText}>{copy.headingStart}</span>
          <span className={styles.commaThin}>,</span> {copy.headingEnd}
        </h2>
        <p className={styles.lead}>{copy.lead}</p>
      </div>
      <div className={styles.items}>
        {ITEM_META.map((meta, i) => {
          const item = copy.items[i];
          return (
            <div key={item.title} className={styles.item}>
              <div
                className={styles.itemIcon}
                style={{ background: meta.gradient, borderRadius: meta.radius }}
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
                  {meta.icon}
                </svg>
              </div>
              <div>
                <div className={styles.itemTitle}>{item.title}</div>
                <div className={styles.itemBody}>{item.body}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
