import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '@/shared/lib/language';
import { SiteNav } from './site-nav';

function renderNav() {
  return render(
    <LanguageProvider>
      <SiteNav />
    </LanguageProvider>,
  );
}

describe('SiteNav', () => {
  it('renders the brand name', () => {
    renderNav();
    expect(screen.getByText('Светлана Хайрудинова')).toBeInTheDocument();
  });

  it('renders all six anchor links with the correct hrefs', () => {
    renderNav();
    const expected: Record<string, string> = {
      Навыки: '#skills',
      Кейсы: '#cases',
      Подход: '#think',
      'Спросить ИИ': '#ai',
      Документы: '#documents',
      Связаться: '#contact',
    };
    for (const [label, href] of Object.entries(expected)) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('toggles the active RU/EN pill on click without changing any other text', () => {
    renderNav();
    const ruButton = screen.getByRole('button', { name: 'RU' });
    const enButton = screen.getByRole('button', { name: 'EN' });

    expect(ruButton).toHaveAttribute('aria-pressed', 'true');
    expect(enButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches aria-pressed to EN after a click', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'RU' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('translates the brand name, links, and CTA after switching to EN', async () => {
    const user = userEvent.setup();
    renderNav();
    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByText('Svetlana Khairudinova')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(screen.getByRole('link', { name: 'Cases' })).toHaveAttribute('href', '#cases');
    expect(screen.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '#think');
    expect(screen.getByRole('link', { name: 'Ask My AI' })).toHaveAttribute('href', '#ai');
    expect(screen.getByRole('link', { name: 'Documents' })).toHaveAttribute('href', '#documents');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });
});
