import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { SiteFooter } from './site-footer';

function SiteFooterWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <SiteFooter />
    </>
  );
}

describe('SiteFooter', () => {
  it('renders the copyright line', () => {
    render(<SiteFooter />);
    expect(screen.getByText('© 2026 Светлана Хайрудинова')).toBeInTheDocument();
  });

  it('translates the name after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <SiteFooterWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByText('© 2026 Svetlana Khairudinova')).toBeInTheDocument();
  });
});
