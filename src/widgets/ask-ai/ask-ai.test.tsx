import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { AskAi } from './ask-ai';

function AskAiWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <AskAi />
    </>
  );
}

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

  it('translates the heading and subtitle after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <AskAiWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText(/Ask directly/)).toBeInTheDocument();
    expect(screen.getByText(/Hi! Ask me something/)).toBeInTheDocument();
  });
});
