import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from './language';

function Probe() {
  const { lang, toggle } = useLanguage();
  return (
    <div>
      <span>current: {lang}</span>
      <button type="button" onClick={toggle}>
        toggle
      </button>
    </div>
  );
}

describe('useLanguage', () => {
  it('defaults to ru when rendered outside a provider', () => {
    render(<Probe />);
    expect(screen.getByText('current: ru')).toBeInTheDocument();
  });

  it('provides ru by default inside a provider and toggles to en and back', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <Probe />
      </LanguageProvider>,
    );
    expect(screen.getByText('current: ru')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByText('current: en')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByText('current: ru')).toBeInTheDocument();
  });
});
