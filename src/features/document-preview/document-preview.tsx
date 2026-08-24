'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/shared/lib/language';
import styles from './document-preview.module.scss';

const COPY = {
  ru: { close: 'Закрыть' },
  en: { close: 'Close' },
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
        // Only one focusable control (close) — keep Tab from leaving the dialog.
        event.preventDefault();
        dialogRef.current?.querySelector<HTMLElement>('button')?.focus();
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
        <iframe src={href} title={label} className={styles.frame} />
      </div>
    </div>,
    document.body,
  );
}
