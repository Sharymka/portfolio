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

  it('links each document to its real file with a download attribute', () => {
    render(<Documents />);
    expect(screen.getByRole('link', { name: /Резюме/ })).toHaveAttribute(
      'href',
      '/documents/resume.pdf',
    );
    expect(screen.getByRole('link', { name: /Диплом/ })).toHaveAttribute(
      'href',
      '/documents/diploma.pdf',
    );
    expect(screen.getByRole('link', { name: /Сертификат/ })).toHaveAttribute(
      'href',
      '/documents/certificate.pdf',
    );
    for (const name of [/Резюме/, /Диплом/, /Сертификат/]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('download');
    }
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
    expect(screen.getByRole('link', { name: /Resume/ })).toHaveAttribute(
      'href',
      '/documents/resume.pdf',
    );
    expect(screen.getByRole('link', { name: /Diploma/ })).toHaveAttribute(
      'href',
      '/documents/diploma.pdf',
    );
    expect(screen.getByRole('link', { name: /Certificate/ })).toHaveAttribute(
      'href',
      '/documents/certificate.pdf',
    );
  });
});
