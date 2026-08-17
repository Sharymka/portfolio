'use client';

import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import styles from './hero.module.scss';

export function Hero() {
  const { ref, visible } = useReveal<HTMLElement>();

  return (
    <section ref={ref} className={styles.hero} style={revealStyle(visible)}>
      <div className={styles.circleTopLeft} />
      <div className={styles.circleSmall} />
      <div className={styles.circleBottomLeft} />
      <div className={styles.circleFloating} />

      <div className={styles.content}>
        <div className={styles.tag}>Frontend-разработчик (React / Next.js)</div>
        <h1 className={styles.heading}>
          Интерфейсы<span className={styles.commaThin}>,</span> которые не теряют пользователя
        </h1>
        <p className={styles.lead}>
          Frontend-разработчик с опытом backend: делаю интерфейсы, которые быстро грузятся, легко
          масштабируются и не теряют пользователя на сложных сценариях.
        </p>
        <Button as="a" href="#cases" className={styles.cta}>
          Смотреть кейсы
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
          alt="Светлана Хайрудинова"
          fill
          sizes="(max-width: 768px) 88vw, 400px"
          className={styles.photo}
          priority
        />
      </div>
    </section>
  );
}
