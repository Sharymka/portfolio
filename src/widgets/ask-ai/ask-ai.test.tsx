import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AskAi } from './ask-ai';

describe('AskAi', () => {
  it('has the #ai anchor id, heading, and the chat', () => {
    const { container } = render(<AskAi />);
    expect(container.querySelector('#ai')).toBeInTheDocument();
    expect(screen.getByText(/Спросите напрямую/)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
      ),
    ).toBeInTheDocument();
  });
});
