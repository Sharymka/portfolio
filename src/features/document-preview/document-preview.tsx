'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/shared/lib/language';
import styles from './document-preview.module.scss';

const COPY = {
  ru: { close: 'Закрыть', download: 'Скачать' },
  en: { close: 'Close', download: 'Download' },
};

interface DocumentPreviewProps {
  href: string;
  label: string;
  onClose: () => void;
}

export function DocumentPreview({ href, label, onClose }: DocumentPreviewProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const copy = COPY[lang];

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('a, button');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Portalled to document.body for the same reason as CaseCarousel: the
  // section's scroll-reveal transform would otherwise become the containing
  // block for this backdrop's position:fixed and break centering/stacking.
  return createPortal(
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={styles.backdrop} onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.controls}>
          <a href={href} download className={styles.download} aria-label={copy.download}>
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
              <path d="M12 3v13" />
              <path d="m7 11 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
          </a>
          <button type="button" className={styles.close} aria-label={copy.close} onClick={onClose}>
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
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {/* #toolbar=0 hides the browser's own built-in PDF viewer toolbar
            (Chrome/Edge honor this PDF open parameter) — otherwise it shows
            its own download button on top of ours. */}
        <iframe src={`${href}#toolbar=0`} title={label} className={styles.frame} />
      </div>
    </div>,
    document.body,
  );
}
