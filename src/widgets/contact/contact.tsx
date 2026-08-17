'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import styles from './contact.module.scss';

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
  const [sent, setSent] = useState(false);
  const { ref, visible } = useReveal<HTMLElement>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>Контакты</h6>
      <h2 className={styles.heading}>
        Обсудим задачу<span className={styles.commaThin}>?</span>
      </h2>
      <div className={styles.directLinks}>
        {DIRECT_LINKS.map((link) => (
          <a key={link.label} href={link.href} className={styles.directLink}>
            <span className={styles.directLinkIcon}>{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
      {sent ? (
        <div className={styles.sentCard}>
          <div className={styles.sentTitle}>Спасибо, сообщение отправлено</div>
          <p className={styles.sentBody}>Отвечу в течение дня.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="contact-name">Имя</label>
            <input id="contact-name" className={styles.input} type="text" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" className={styles.input} type="email" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-message">Сообщение</label>
            <textarea id="contact-message" className={styles.input} required />
          </div>
          <Button type="submit" className={styles.submit}>
            Отправить
          </Button>
        </form>
      )}
    </section>
  );
}
