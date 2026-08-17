'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './hero.module.scss';

const COPY = {
  ru: {
    tag: 'Frontend-разработчик (React / Next.js)',
    headingStart: 'Интерфейсы',
    headingEnd: 'которые не теряют пользователя',
    lead: 'Frontend-разработчик с опытом backend: делаю интерфейсы, которые быстро грузятся, легко масштабируются и не теряют пользователя на сложных сценариях.',
    cta: 'Смотреть кейсы',
    photoAlt: 'Светлана Хайрудинова',
  },
  en: {
    tag: 'Frontend Developer (React / Next.js)',
    headingStart: 'Interfaces',
    headingEnd: 'built to keep users on track',
    lead: "Frontend developer with backend experience: I build interfaces that load fast, scale easily, and don't lose users in complex scenarios.",
    cta: 'View case studies',
    photoAlt: 'Svetlana Khairudinova',
  },
};

export function Hero() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section ref={ref} className={styles.hero} style={revealStyle(visible)}>
      <div className={styles.circleTopLeft} />
      <div className={styles.circleSmall} />
      <div className={styles.circleBottomLeft} />
      <div className={styles.circleFloating} />

      <div className={styles.content}>
        <div className={styles.tag}>{copy.tag}</div>
        <h1 className={styles.heading}>
          {copy.headingStart}
          <span className={styles.commaThin}>,</span> {copy.headingEnd}
        </h1>
        <p className={styles.lead}>{copy.lead}</p>
        <Button as="a" href="#cases" className={styles.cta}>
          {copy.cta}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </svg>
        </Button>
      </div>

      <div className={styles.photoFrame}>
        <Image
          src="/images/hero-photo.png"
          alt={copy.photoAlt}
          fill
          sizes="(max-width: 768px) 88vw, 400px"
          className={styles.photo}
          priority
        />
      </div>
    </section>
  );
}
