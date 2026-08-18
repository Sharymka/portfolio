'use client';

import { useLanguage } from '@/shared/lib/language';
import styles from './site-footer.module.scss';

const COPY = {
  ru: '© 2026 Светлана Хайрудинова',
  en: '© 2026 Svetlana Khairudinova',
};

export function SiteFooter() {
  const { lang } = useLanguage();
  return <footer className={styles.footer}>{COPY[lang]}</footer>;
}
