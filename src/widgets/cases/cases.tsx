'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CASES } from '@/entities/case';
import { CaseCarousel } from '@/features/case-carousel';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import styles from './cases.module.scss';

export function Cases() {
  const { ref, visible } = useReveal<HTMLElement>();
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const openCase = CASES.find((c) => c.slug === openSlug) ?? null;

  return (
    <section id="cases" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>Избранные кейсы</h6>
      <h2 className={styles.heading}>
        <span className={styles.gradientText}>Результат сначала</span>
        <span className={styles.commaThin}>,</span> детали реализации — потом
      </h2>
      <div className={styles.list}>
        {CASES.map((c) => (
          <div key={c.slug} className={styles.card}>
            <div className={styles.thumbWrap}>
              <button
                type="button"
                className={styles.thumbButton}
                aria-label={`Открыть скриншоты кейса ${c.title}`}
                onClick={() => setOpenSlug(c.slug)}
              >
                <Image src={c.images[0]} alt="" fill className={styles.thumb} />
              </button>
              <div className={styles.badge}>{c.index}</div>
            </div>
            <div className={styles.body}>
              <div className={styles.tags}>
                <span className={styles.tagNeutral}>Роль: {c.role}</span>
                <span className={styles.tagOutline}>{c.period}</span>
              </div>
              <h3 className={styles.title}>{c.title}</h3>
              <div className={styles.factRow}>
                <strong>Цель:</strong> {c.goal}
              </div>
              <div className={styles.factRow}>
                <strong>Результат:</strong> <span className={styles.resultText}>{c.result}</span>
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
