import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './styles/globals.scss';
import { spaceGrotesk, inter, jetbrainsMono } from './fonts';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Frontend developer portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
