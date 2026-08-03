import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteNav } from './site-nav';

describe('SiteNav', () => {
  it('renders the brand name', () => {
    render(<SiteNav />);
    expect(screen.getByText('Светлана Хайрудинова')).toBeInTheDocument();
  });

  it('renders all six anchor links with the correct hrefs', () => {
    render(<SiteNav />);
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
    render(<SiteNav />);
    const ruButton = screen.getByRole('button', { name: 'RU' });
    const enButton = screen.getByRole('button', { name: 'EN' });

    expect(ruButton).toHaveAttribute('aria-pressed', 'true');
    expect(enButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches aria-pressed to EN after a click', async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'RU' })).toHaveAttribute('aria-pressed', 'false');
  });
});
