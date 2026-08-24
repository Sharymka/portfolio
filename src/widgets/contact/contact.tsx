'use client';

import { useState } from 'react';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './contact.module.scss';

const EMAIL = 'sveta.sharymova@gmail.com';

const COPY = {
  ru: {
    kicker: 'Контакты',
    headingStart: 'Обсудим задачу',
    copyEmail: 'Скопировать email',
    copied: 'Скопировано',
  },
  en: {
    kicker: 'Contact',
    headingStart: "Let's discuss the project",
    copyEmail: 'Copy email',
    copied: 'Copied',
  },
};

const DIRECT_LINKS = [
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
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
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable or permission denied (older browser,
      // insecure context) — the mailto link above still works as a fallback,
      // so failing silently here is fine.
    }
  }

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
        <button
          type="button"
          className={styles.directLink}
          onClick={copyEmail}
          aria-label={copied ? copy.copied : copy.copyEmail}
        >
          <span className={styles.directLinkIcon}>
            {copied ? (
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
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
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
                <rect x="8" y="8" width="14" height="14" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            )}
          </span>
          {copied ? copy.copied : copy.copyEmail}
        </button>
      </div>
    </section>
  );
}
