'use client';

import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './contact.module.scss';

const COPY = {
  ru: {
    kicker: 'Контакты',
    headingStart: 'Обсудим задачу',
  },
  en: {
    kicker: 'Contact',
    headingStart: "Let's discuss the project",
  },
};

const DIRECT_LINKS = [
  {
    label: 'Email',
    href: 'mailto:sveta.sharymova@gmail.com',
    icon: (
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
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/svetka_khai',
    icon: (
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
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    ),
  },
];

export function Contact() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section id="contact" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>{copy.kicker}</h6>
      <h2 className={styles.heading}>
        {copy.headingStart}
        <span className={styles.commaThin}>?</span>
      </h2>
      <div className={styles.directLinks}>
        {DIRECT_LINKS.map((link) => (
          <a key={link.label} href={link.href} className={styles.directLink}>
            <span className={styles.directLinkIcon}>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
