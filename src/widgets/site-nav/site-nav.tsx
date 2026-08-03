'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import styles from './site-nav.module.scss';

const LINKS: Array<{ label: string; href: string }> = [
  { label: 'Навыки', href: '#skills' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Подход', href: '#think' },
  { label: 'Спросить ИИ', href: '#ai' },
  { label: 'Документы', href: '#documents' },
];

export function SiteNav() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Светлана Хайрудинова</div>
      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className={styles.link}>
          {link.label}
        </a>
      ))}
      <div className={styles.langToggle} role="group" aria-label="Язык">
        <button
          type="button"
          className={styles.langPill}
          aria-pressed={lang === 'ru'}
          data-active={lang === 'ru'}
          onClick={() => setLang('ru')}
        >
          RU
        </button>
        <button
          type="button"
          className={styles.langPill}
          aria-pressed={lang === 'en'}
          data-active={lang === 'en'}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>
      <Button as="a" href="#contact" variant="primary" className={styles.cta}>
        Связаться
      </Button>
    </nav>
  );
}
