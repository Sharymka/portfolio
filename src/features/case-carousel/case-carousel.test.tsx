import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CaseCarousel } from './case-carousel';

const IMAGES = [
  '/images/cases/auction/01.png',
  '/images/cases/auction/02.png',
  '/images/cases/auction/03.png',
];

describe('CaseCarousel', () => {
  it('shows the counter for the starting image', () => {
    render(<CaseCarousel images={IMAGES} title="Альфа" initialIndex={0} onClose={vi.fn()} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('advances the counter on next and wraps around', async () => {
    const user = userEvent.setup();
    render(<CaseCarousel images={IMAGES} title="Альфа" initialIndex={2} onClose={vi.fn()} />);
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Следующий скриншот' }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('goes back on prev and wraps around', async () => {
    const user = userEvent.setup();
    render(<CaseCarousel images={IMAGES} title="Альфа" initialIndex={0} onClose={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: 'Предыдущий скриншот' }));
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('calls onClose on Escape and on the close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<CaseCarousel images={IMAGES} title="Альфа" initialIndex={0} onClose={onClose} />);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('navigates with arrow keys', async () => {
    const user = userEvent.setup();
    render(<CaseCarousel images={IMAGES} title="Альфа" initialIndex={0} onClose={vi.fn()} />);
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('moves focus into the dialog on open', () => {
    render(<CaseCarousel images={IMAGES} title="Альфа" initialIndex={0} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toHaveFocus();
  });
});
