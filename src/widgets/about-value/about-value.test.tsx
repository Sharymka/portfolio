import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { AboutValue } from './about-value';

function AboutValueWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <AboutValue />
    </>
  );
}

const CARD_TITLES = [
  'Убираю лишние запросы',
  'Собираю сложные модули',
  'Ускоряю загрузку',
  'AI',
  'Проектирую архитектуру приложений',
  'Синхронизирую состояние',
  'Покрываю код тестами',
];

describe('AboutValue', () => {
  it('renders the section heading', () => {
    render(<AboutValue />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toMatch(/Пишу код/);
    expect(heading.textContent).toMatch(/приносит/);
  });

  it('renders all seven card titles', () => {
    render(<AboutValue />);
    for (const title of CARD_TITLES) {
      expect(screen.getByText(new RegExp(title))).toBeInTheDocument();
    }
  });

  it('renders an icon inside every card', () => {
    const { container } = render(<AboutValue />);
    expect(container.querySelectorAll('svg').length).toBe(7);
  });

  it('highlights "пользу пользователям" and "результат продукту" in the heading', () => {
    render(<AboutValue />);
    expect(screen.getByText('пользу пользователям')).toBeInTheDocument();
    expect(screen.getByText('результат продукту')).toBeInTheDocument();
  });

  it('translates the heading and card copy after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <AboutValueWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toMatch(/I write code/);
    expect(screen.getByText('I eliminate redundant requests')).toBeInTheDocument();
    expect(screen.getByText(/I use AI as an engineering tool/)).toBeInTheDocument();
  });
});
