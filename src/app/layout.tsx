import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './styles/globals.scss';
import { unbounded, nunito } from './fonts';

export const metadata: Metadata = {
  title: 'Светлана Хайрудинова — Frontend-разработчик',
  description: 'Портфолио frontend-разработчика (React / Next.js)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
