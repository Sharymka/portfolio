'use client';

import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import styles from './documents.module.scss';

const COPY = {
  ru: {
    kicker: 'Документы',
    heading: 'Резюме и подтверждающие документы',
    files: [
      { label: 'Резюме (PDF)', href: '/documents/resume.pdf' },
      { label: 'Диплом (PDF)', href: '/documents/diploma.pdf' },
      { label: 'Сертификат (PDF)', href: '/documents/certificate.pdf' },
    ],
  },
  en: {
    kicker: 'Documents',
    heading: 'Resume and supporting documents',
    files: [
      { label: 'Resume (PDF)', href: '/documents/resume.pdf' },
      { label: 'Diploma (PDF)', href: '/documents/diploma.pdf' },
      { label: 'Certificate (PDF)', href: '/documents/certificate.pdf' },
    ],
  },
};

export function Documents() {
  const { ref, visible } = useReveal<HTMLElement>();
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section id="documents" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>{copy.kicker}</h6>
      <h2 className={styles.heading}>{copy.heading}</h2>
      <div className={styles.list}>
        {copy.files.map((file) => (
          <a key={file.href} href={file.href} download className={styles.card}>
            <span className={styles.icon}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v13" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </span>
            <span className={styles.label}>{file.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
