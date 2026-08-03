import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutValue } from './about-value';

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
    expect(
      screen.getByRole('heading', { level: 2, name: /Пишу код.*приносит пользу пользователям/ }),
    ).toBeInTheDocument();
  });

  it('renders all seven card titles', () => {
    render(<AboutValue />);
    for (const title of CARD_TITLES) {
      expect(screen.getByText(new RegExp(title))).toBeInTheDocument();
    }
  });
});
