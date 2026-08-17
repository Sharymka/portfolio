import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { Hero } from './hero';

function HeroWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <Hero />
    </>
  );
}

describe('Hero', () => {
  it('renders the role tag, heading, and positioning paragraph', () => {
    render(<Hero />);
    expect(screen.getByText('Frontend-разработчик (React / Next.js)')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Интерфейсы.*которые не теряют пользователя/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/делаю интерфейсы, которые быстро грузятся/)).toBeInTheDocument();
  });

  it('renders the CTA linking to #cases', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /Смотреть кейсы/ })).toHaveAttribute('href', '#cases');
  });

  it('renders the profile photo with alt text', () => {
    render(<Hero />);
    expect(screen.getByAltText('Светлана Хайрудинова')).toBeInTheDocument();
  });

  it('translates the tag, heading, lead, and CTA after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <HeroWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText('Frontend Developer (React / Next.js)')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /Interfaces.*keep users on track/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/interfaces that load fast/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View case studies/ })).toHaveAttribute(
      'href',
      '#cases',
    );
  });
});
