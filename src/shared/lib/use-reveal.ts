import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Fades an element in and slides it up once it scrolls into view.
 * Mirrors the reveal-on-scroll effect from the source design (IntersectionObserver,
 * threshold 0.15, reveal once and stop observing).
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/** Inline style for the fade + slide-up reveal, matching the source design's transition. */
export function revealStyle(visible: boolean): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease',
  };
}
