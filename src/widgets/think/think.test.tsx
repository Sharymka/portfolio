import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Think } from './think';

describe('Think', () => {
  it('has the #think anchor id', () => {
    const { container } = render(<Think />);
    expect(container.querySelector('#think')).toBeInTheDocument();
  });

  it('renders all three approach items', () => {
    render(<Think />);
    expect(screen.getByText('Сначала понимаю ограничения')).toBeInTheDocument();
    expect(screen.getByText('Простота — по умолчанию')).toBeInTheDocument();
    expect(screen.getByText('Думаю о развитии проекта')).toBeInTheDocument();
  });

  it('renders an icon for every item', () => {
    const { container } = render(<Think />);
    expect(container.querySelectorAll('svg').length).toBe(3);
  });
});
