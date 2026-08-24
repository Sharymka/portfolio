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

  it('shows the direct Telegram link', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Telegram/ })).toHaveAttribute(
      'href',
      'https://t.me/svetka_khai',
    );
  });

  it('does not show a direct mailto link', () => {
    render(<Contact />);
    expect(screen.queryByRole('link', { name: /Email/ })).not.toBeInTheDocument();
  });

  it('copies the email to the clipboard and shows confirmation', async () => {
    const user = userEvent.setup({ writeToClipboard: true });
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Скопировать email' }));

    await expect(navigator.clipboard.readText()).resolves.toBe('sveta.sharymova@gmail.com');
    expect(await screen.findByRole('button', { name: 'Скопировано' })).toBeInTheDocument();
  });

  it('reverts the confirmation back to the copy label after a couple of seconds', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: 'Скопировать email' }));
    await screen.findByRole('button', { name: 'Скопировано' });

    expect(
      await screen.findByRole('button', { name: 'Скопировать email' }, { timeout: 3000 }),
    ).toBeInTheDocument();
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
