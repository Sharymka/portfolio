'use client';

import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './skills.module.scss';

interface Category {
  label: string;
  tags: string[];
  variant: 'accent' | 'accent2' | 'neutral';
}

const COPY = {
  ru: {
    kicker: 'Навыки',
    headingStart: 'Инструменты',
    headingEnd: 'которыми решаю задачи каждый день',
    alsoLabel: 'Также работала с:',
    categories: [
      {
        label: 'Core',
        variant: 'accent',
        tags: ['React', 'TypeScript', 'Next.js', 'JavaScript (ES6+)', 'HTML5'],
      },
      {
        label: 'State & Data',
        variant: 'accent2',
        tags: [
          'Redux Toolkit',
          'RTK Query',
          'REST API',
          'SSR / Hydration',
          'client-side caching',
          'React Hook Form',
          'Zod',
        ],
      },
      {
        label: 'Тесты и качество',
        variant: 'neutral',
        tags: ['Vitest', 'Storybook', 'Git', 'CI/CD', 'Feature-Sliced Design'],
      },
      {
        label: 'Backend-смежное',
        variant: 'neutral',
        tags: [
          'Node.js',
          'Express',
          'PHP',
          'Laravel',
          'PostgreSQL',
          'MySQL',
          'Docker',
          'Cloudinary',
        ],
      },
    ] satisfies Category[],
  },
  en: {
    kicker: 'Skills',
    headingStart: 'Tools',
    headingEnd: 'I use to solve problems every day',
    alsoLabel: 'Also worked with:',
    categories: [
      {
        label: 'Core',
        variant: 'accent',
        tags: ['React', 'TypeScript', 'Next.js', 'JavaScript (ES6+)', 'HTML5'],
      },
      {
        label: 'State & Data',
        variant: 'accent2',
        tags: [
          'Redux Toolkit',
          'RTK Query',
          'REST API',
          'SSR / Hydration',
          'client-side caching',
          'React Hook Form',
          'Zod',
        ],
      },
      {
        label: 'Testing & Quality',
        variant: 'neutral',
        tags: ['Vitest', 'Storybook', 'Git', 'CI/CD', 'Feature-Sliced Design'],
      },
      {
        label: 'Backend-adjacent',
        variant: 'neutral',
        tags: [
          'Node.js',
          'Express',
          'PHP',
          'Laravel',
          'PostgreSQL',
          'MySQL',
          'Docker',
          'Cloudinary',
        ],
      },
    ] satisfies Category[],
  },
};

export function Skills() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section id="skills" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>{copy.kicker}</h6>
      <h2 className={styles.heading}>
        <span className={styles.gradientText}>{copy.headingStart}</span>
        <span className={styles.commaThin}>,</span> {copy.headingEnd}
      </h2>
      <div className={styles.rows}>
        {copy.categories.map((category) => (
          <div key={category.label} className={styles.row}>
            <div className={styles.label}>{category.label}</div>
            <div className={styles.tags}>
              {category.tags.map((tag) => (
                <span key={tag} className={`${styles.tag} ${styles[category.variant]}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.row}>
          <div className={styles.alsoLabel}>{copy.alsoLabel}</div>
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles.neutral} ${styles.small}`}>Vue.js</span>
            <span className={`${styles.tag} ${styles.neutral} ${styles.small}`}>Material UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
