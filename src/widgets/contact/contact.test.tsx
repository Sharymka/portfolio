import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { Contact } from './contact';

function ContactWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <Contact />
    </>
  );
}

describe('Contact', () => {
  it('has the #contact anchor id', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('shows direct email and Telegram links', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute(
      'href',
      'mailto:sveta.sharymova@gmail.com',
    );
    expect(screen.getByRole('link', { name: /Telegram/ })).toHaveAttribute(
      'href',
      'https://t.me/svetka_khai',
    );
  });

  it('translates the heading after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <ContactWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText("Let's discuss the project")).toBeInTheDocument();
  });
});
