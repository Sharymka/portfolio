'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CASES, CASES_EN } from '@/entities/case';
import { CaseCarousel } from '@/features/case-carousel';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './cases.module.scss';

const COPY = {
  ru: {
    kicker: 'Избранные кейсы',
    headingStart: 'Результат сначала',
    headingEnd: 'детали реализации — потом',
    role: 'Роль:',
    goal: 'Цель:',
    result: 'Результат:',
    openLabel: (title: string) => `Открыть скриншоты кейса ${title}`,
    cases: CASES,
  },
  en: {
    kicker: 'Featured cases',
    headingStart: 'Results first',
    headingEnd: 'implementation details — after',
    role: 'Role:',
    goal: 'Goal:',
    result: 'Result:',
    openLabel: (title: string) => `Open screenshots for the ${title} case`,
    cases: CASES_EN,
  },
};

export function Cases() {
  const { ref, visible } = useReveal<HTMLElement>();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const { lang } = useLanguage();
  const copy = COPY[lang];

  const openCase = copy.cases.find((c) => c.slug === openSlug) ?? null;

  return (
    <section id="cases" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>{copy.kicker}</h6>
      <h2 className={styles.heading}>
        <span className={styles.gradientText}>{copy.headingStart}</span>
        <span className={styles.commaThin}>,</span> {copy.headingEnd}
      </h2>
      <div className={styles.list}>
        {copy.cases.map((c) => (
          <div key={c.slug} className={styles.card}>
            <div className={styles.thumbWrap}>
              <button
                type="button"
                className={styles.thumbButton}
                aria-label={copy.openLabel(c.title)}
                onClick={() => setOpenSlug(c.slug)}
              >
                <Image src={c.images[0]} alt="" fill className={styles.thumb} />
              </button>
              <div className={styles.badge}>{c.index}</div>
            </div>
            <div className={styles.body}>
              <div className={styles.tags}>
                <span className={styles.tagNeutral}>
                  {copy.role} {c.role}
                </span>
                <span className={styles.tagOutline}>{c.period}</span>
              </div>
              <h3 className={styles.title}>{c.title}</h3>
              <div className={styles.factRow}>
                <strong>{copy.goal}</strong> {c.goal}
              </div>
              <div className={styles.factRow}>
                <strong>{copy.result}</strong> <span className={styles.resultText}>{c.result}</span>
              </div>
              <p className={styles.details}>{c.details}</p>
              <div className={styles.techTags}>
                {c.tags.map((tag) => (
                  <span key={tag} className={styles.tagOutline}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {openCase && (
        <CaseCarousel
          images={openCase.images}
          title={openCase.title}
          initialIndex={0}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </section>
  );
}
