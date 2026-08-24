import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { Documents } from './documents';

function DocumentsWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <Documents />
    </>
  );
}

describe('Documents', () => {
  it('has the #documents anchor id', () => {
    const { container } = render(<Documents />);
    expect(container.querySelector('#documents')).toBeInTheDocument();
  });

  it('renders a button per file, not a direct download link', () => {
    render(<Documents />);
    for (const name of [/Резюме/, /Диплом/, /Сертификат/]) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('opens the preview with the right file when a card is clicked', async () => {
    const user = userEvent.setup();
    render(<Documents />);

    await user.click(screen.getByRole('button', { name: /Диплом/ }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTitle('Диплом (PDF)')).toHaveAttribute('src', '/documents/diploma.pdf');
  });

  it('closes the preview from its close button', async () => {
    const user = userEvent.setup();
    render(<Documents />);

    await user.click(screen.getByRole('button', { name: /Резюме/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('translates the heading and file labels after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <DocumentsWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText('Resume and supporting documents')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Resume/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Diploma/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Certificate/ })).toBeInTheDocument();
  });
});
