import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { Cases } from './cases';

function CasesWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <Cases />
    </>
  );
}

describe('Cases', () => {
  it('has the #cases anchor id and renders all three titles', () => {
    const { container } = render(<Cases />);
    expect(container.querySelector('#cases')).toBeInTheDocument();
    expect(
      screen.getByText('Экосистема Альфа — маркетплейс объявлений и аукционов'),
    ).toBeInTheDocument();
    expect(screen.getByText('myHotel — система управления гостиницей')).toBeInTheDocument();
    expect(screen.getByText('Questionnaire App — Itransition')).toBeInTheDocument();
  });

  it('opens the carousel for a case on thumbnail click, and closes it', async () => {
    const user = userEvent.setup();
    render(<Cases />);

    await user.click(screen.getByRole('button', { name: /Открыть скриншоты.*Альфа/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('1 / 12')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('translates the heading and case copy after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <CasesWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toMatch(/Results first/);
    expect(
      screen.getByText('Alpha Ecosystem — a marketplace for listings and auctions'),
    ).toBeInTheDocument();
    expect(screen.getByText('myHotel — a hotel management system')).toBeInTheDocument();
    expect(screen.getAllByText('Goal:').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Result:').length).toBeGreaterThan(0);
  });
});
