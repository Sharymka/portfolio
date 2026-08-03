import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Documents } from './documents';

describe('Documents', () => {
  it('has the #documents anchor id', () => {
    const { container } = render(<Documents />);
    expect(container.querySelector('#documents')).toBeInTheDocument();
  });

  it('links each document to its real file with a download attribute', () => {
    render(<Documents />);
    expect(screen.getByRole('link', { name: /Резюме/ })).toHaveAttribute('href', '/documents/resume.pdf');
    expect(screen.getByRole('link', { name: /Диплом/ })).toHaveAttribute('href', '/documents/diploma.pdf');
    expect(screen.getByRole('link', { name: /Сертификат/ })).toHaveAttribute(
      'href',
      '/documents/certificate.pdf',
    );
    for (const name of [/Резюме/, /Диплом/, /Сертификат/]) {
      expect(screen.getByRole('link', { name })).toHaveAttribute('download');
    }
  });
});
