'use client';

import { Button } from '@/shared/ui/button';
import { useLanguage } from '@/shared/lib/language';
import styles from './site-nav.module.scss';

const COPY = {
  ru: {
    brand: 'Светлана Хайрудинова',
    langLabel: 'Язык',
    cta: 'Связаться',
    links: [
      { label: 'Навыки', href: '#skills' },
      { label: 'Кейсы', href: '#cases' },
      { label: 'Подход', href: '#think' },
      { label: 'Спросить ИИ', href: '#ai' },
      { label: 'Документы', href: '#documents' },
    ],
  },
  en: {
    brand: 'Svetlana Khairudinova',
    langLabel: 'Language',
    cta: 'Contact',
    links: [
      { label: 'Skills', href: '#skills' },
      { label: 'Cases', href: '#cases' },
      { label: 'Approach', href: '#think' },
      { label: 'Ask My AI', href: '#ai' },
      { label: 'Documents', href: '#documents' },
    ],
  },
};

export function SiteNav() {
  const { lang, setLang } = useLanguage();
  const copy = COPY[lang];

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>{copy.brand}</div>
      <div className={styles.links}>
        {copy.links.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
      </div>
      <div className={styles.controls}>
        <div className={styles.langToggle} role="group" aria-label={copy.langLabel}>
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
          {copy.cta}
        </Button>
      </div>
    </nav>
  );
}
