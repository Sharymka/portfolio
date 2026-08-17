'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './case-carousel.module.scss';

interface CaseCarouselProps {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}

export function CaseCarousel({ images, title, initialIndex, onClose }: CaseCarouselProps) {
  const [index, setIndex] = useState(initialIndex);
  const dialogRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} aria-label="Закрыть" onClick={onClose}>
          ✕
        </button>
        <div className={styles.imageFrame}>
          <Image
            src={images[index]}
            alt={`${title} — скриншот ${index + 1}`}
            fill
            className={styles.image}
          />
        </div>
        <button
          type="button"
          className={styles.prev}
          aria-label="Предыдущий скриншот"
          onClick={prev}
        >
          ←
        </button>
        <button
          type="button"
          className={styles.next}
          aria-label="Следующий скриншот"
          onClick={next}
        >
          →
        </button>
        <div className={styles.counter}>
          {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
