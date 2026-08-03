import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skills } from './skills';

describe('Skills', () => {
  it('has the #skills anchor id for nav scrolling', () => {
    const { container } = render(<Skills />);
    expect(container.querySelector('#skills')).toBeInTheDocument();
  });

  it('renders all four category labels', () => {
    render(<Skills />);
    for (const label of ['Core', 'State & Data', 'Тесты и качество', 'Backend-смежное']) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('renders React as a Core tag and Docker as a Backend tag', () => {
    render(<Skills />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });
});
