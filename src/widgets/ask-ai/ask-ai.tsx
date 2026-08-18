'use client';

import { AskAiChat } from '@/features/ask-ai-chat';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './ask-ai.module.scss';

const COPY = {
  ru: {
    headingStart: 'Есть вопрос обо мне',
    headingEnd: 'Спросите напрямую',
    subtitle:
      'Небольшой помощник, обученный на моём опыте и кейсах — задайте вопрос или выберите один из готовых.',
  },
  en: {
    headingStart: 'Have a question about me',
    headingEnd: 'Ask directly',
    subtitle:
      'A small assistant trained on my experience and cases — ask a question or pick one of the ready-made ones.',
  },
};

export function AskAi() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section id="ai" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <div className={styles.intro}>
        <div className={styles.icon}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 3-1.9 4.6L5 9.5l4.1 3-1.5 5 4.4-3 4.4 3-1.5-5 4.1-3-5.1-1.9Z" />
          </svg>
        </div>
        <div>
          <h6 className={styles.kicker}>
            Ask My <span className={styles.thin}>AI</span>
          </h6>
          <h2 className={styles.heading}>
            {copy.headingStart}
            <span className={styles.commaThin}>?</span> {copy.headingEnd}
          </h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>
      </div>
      <AskAiChat />
    </section>
  );
}
