import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './hero';

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
});
