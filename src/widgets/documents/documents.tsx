'use client';

import { useState } from 'react';
import { revealStyle, useReveal } from '@/shared/lib/use-reveal';
import { useLanguage } from '@/shared/lib/language';
import { DocumentPreview } from '@/features/document-preview';
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
  const [openFile, setOpenFile] = useState<{ href: string; label: string } | null>(null);

  return (
    <section id="documents" ref={ref} className={styles.section} style={revealStyle(visible)}>
      <h6 className={styles.kicker}>{copy.kicker}</h6>
      <h2 className={styles.heading}>{copy.heading}</h2>
      <div className={styles.list}>
        {copy.files.map((file) => (
          <button
            key={file.href}
            type="button"
            className={styles.card}
            onClick={() => setOpenFile(file)}
          >
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
          </button>
        ))}
      </div>

      {openFile && (
        <DocumentPreview
          href={openFile.href}
          label={openFile.label}
          onClose={() => setOpenFile(null)}
        />
      )}
    </section>
  );
}
