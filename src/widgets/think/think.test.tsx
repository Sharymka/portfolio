import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { Think } from './think';

function ThinkWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <Think />
    </>
  );
}

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

  it('translates the heading and items after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <ThinkWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toMatch(/engineering approach/);
    expect(screen.getByText('I understand the constraints first')).toBeInTheDocument();
    expect(screen.getByText('Simplicity by default')).toBeInTheDocument();
    expect(screen.getByText(/think about the project's growth/)).toBeInTheDocument();
  });
});
