'use client';

import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import { SKILL_CATEGORIES } from '@/entities/skill';
import styles from './skills.module.scss';

const COPY = {
  ru: {
    kicker: 'Навыки',
    headingStart: 'Инструменты',
    headingEnd: 'которыми решаю задачи каждый день',
    alsoLabel: 'Также работала с:',
  },
  en: {
    kicker: 'Skills',
    headingStart: 'Tools',
    headingEnd: 'I use to solve problems every day',
    alsoLabel: 'Also worked with:',
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
        {SKILL_CATEGORIES[lang].map((category) => (
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
