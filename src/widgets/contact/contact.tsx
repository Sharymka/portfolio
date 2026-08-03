'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/shared/ui/button';
import styles from './contact.module.scss';

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className={styles.section}>
      <h6 className={styles.kicker}>Контакты</h6>
      <h2 className={styles.heading}>
        Обсудим задачу<span className={styles.commaThin}>?</span>
      </h2>
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
