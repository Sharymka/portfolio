import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('renders the copyright line', () => {
    render(<SiteFooter />);
    expect(screen.getByText('© 2026 Светлана Хайрудинова')).toBeInTheDocument();
  });
});
