'use client';

import { AskAiChat } from '@/features/ask-ai-chat';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import styles from './ask-ai.module.scss';

export function AskAi() {
  const { ref, visible } = useReveal<HTMLElement>();

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
            Есть вопрос обо мне<span className={styles.commaThin}>?</span> Спросите напрямую
          </h2>
          <p className={styles.subtitle}>
            Небольшой помощник, обученный на моём опыте и кейсах — задайте вопрос или выберите один
            из готовых.
          </p>
        </div>
      </div>
      <AskAiChat />
    </section>
  );
}
