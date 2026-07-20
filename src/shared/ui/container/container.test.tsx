import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
  it('renders children inside a div by default', () => {
    render(<Container>content</Container>);
    const el = screen.getByText('content');
    expect(el.tagName).toBe('DIV');
  });

  it('renders as a custom element via the `as` prop', () => {
    render(<Container as="section">content</Container>);
    const el = screen.getByText('content');
    expect(el.tagName).toBe('SECTION');
  });
});
