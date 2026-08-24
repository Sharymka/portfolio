'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useLanguage } from '@/shared/lib/language';
import styles from './case-carousel.module.scss';

const COPY = {
  ru: {
    close: 'Закрыть',
    prev: 'Предыдущий скриншот',
    next: 'Следующий скриншот',
    alt: (title: string, n: number) => `${title} — скриншот ${n}`,
  },
  en: {
    close: 'Close',
    prev: 'Previous screenshot',
    next: 'Next screenshot',
    alt: (title: string, n: number) => `${title} — screenshot ${n}`,
  },
};

interface CaseCarouselProps {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}

export function CaseCarousel({ images, title, initialIndex, onClose }: CaseCarouselProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const copy = COPY[lang];

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowRight') {
        next();
        return;
      }
      if (event.key === 'ArrowLeft') {
        prev();
        return;
      }
      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, onClose]);

  // Portalled to document.body: sections use a scroll-reveal `transform`
  // (see useReveal/revealStyle), and any transform on an ancestor makes it
  // the containing block for position:fixed descendants — without the
  // portal, this backdrop would center against the section's box instead
  // of the viewport, sometimes landing the close button behind the sticky nav.
  return createPortal(
    // Click-to-close backdrop convenience; Escape and the close button already
    // cover full keyboard access, so this decorative layer doesn't need its own.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={styles.backdrop} onClick={onClose}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageFrame}>
          {/* Preloaded so the browser already has the neighboring
              screenshots cached by the time next/prev is clicked — same
              `sizes` as the visible images, so it's the exact URL that
              gets reused, not just the raw file. */}
          {[(index - 1 + images.length) % images.length, (index + 1) % images.length].map(
            (neighborIndex) => (
              <Image
                key={`${images[neighborIndex]}-preload`}
                src={images[neighborIndex]}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                className={styles.preload}
              />
            ),
          )}
          <Image
            src={images[index]}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.imageBg}
          />
          <Image
            src={images[index]}
            alt={copy.alt(title, index + 1)}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.image}
          />
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
          <button type="button" className={styles.prev} aria-label={copy.prev} onClick={prev}>
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
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className={styles.next} aria-label={copy.next} onClick={next}>
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
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
        <div className={styles.counter}>
          {index + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body,
  );
}
