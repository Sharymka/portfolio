import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { DocumentPreview } from './document-preview';

describe('DocumentPreview', () => {
  it('shows the document in an iframe pointed at the file, with the native PDF toolbar hidden', () => {
    render(<DocumentPreview href="/documents/resume.pdf" label="Резюме (PDF)" onClose={vi.fn()} />);
    expect(screen.getByTitle('Резюме (PDF)')).toHaveAttribute(
      'src',
      '/documents/resume.pdf#toolbar=0',
    );
  });

  it('offers a real download link for the same file', () => {
    render(<DocumentPreview href="/documents/resume.pdf" label="Резюме (PDF)" onClose={vi.fn()} />);
    const downloadLink = screen.getByRole('link', { name: 'Скачать' });
    expect(downloadLink).toHaveAttribute('href', '/documents/resume.pdf');
    expect(downloadLink).toHaveAttribute('download');
  });

  it('calls onClose on Escape and on the close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<DocumentPreview href="/documents/resume.pdf" label="Резюме (PDF)" onClose={onClose} />);

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Закрыть' }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('moves focus into the dialog on open', () => {
    render(<DocumentPreview href="/documents/resume.pdf" label="Резюме (PDF)" onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toHaveFocus();
  });

  it('translates control labels after switching to EN', async () => {
    const user = userEvent.setup();
    function PreviewWithToggle() {
      const { toggle } = useLanguage();
      return (
        <>
          <button type="button" onClick={toggle}>
            toggle
          </button>
          <DocumentPreview href="/documents/resume.pdf" label="Резюме (PDF)" onClose={vi.fn()} />
        </>
      );
    }
    render(
      <LanguageProvider>
        <PreviewWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Download' })).toBeInTheDocument();
  });
});
