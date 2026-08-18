import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { AskAiChat } from './ask-ai-chat';

function AskAiChatWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <AskAiChat />
    </>
  );
}

describe('AskAiChat', () => {
  it('shows the starting AI message', () => {
    render(<AskAiChat />);
    expect(
      screen.getByText(
        'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
      ),
    ).toBeInTheDocument();
  });

  it('renders one quick-prompt button per QA_DATA entry', () => {
    render(<AskAiChat />);
    expect(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' })).toBeInTheDocument();
  });

  it('clicking a quick prompt adds the question then the matching answer', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.click(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' }));
    expect(await screen.findByText(/Основной стек/)).toBeInTheDocument();
  });

  it('typing and submitting a question answers with a keyword match', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.type(screen.getByPlaceholderText('Спросите что-нибудь...'), 'какой у тебя стек?');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(await screen.findByText(/Основной стек/)).toBeInTheDocument();
  });

  it('falls back to the generic answer when nothing matches', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.type(screen.getByPlaceholderText('Спросите что-нибудь...'), 'любимый цвет?');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(await screen.findByText(/Хороший вопрос/)).toBeInTheDocument();
  });

  it('does nothing on empty submit', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(screen.getAllByText(/Привет!/)).toHaveLength(1);
  });

  it('translates the starting message, prompts, and answers after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <AskAiChatWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText(/Hi! Ask me something/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: "What's your preferred stack?" }));
    expect(await screen.findByText(/My main stack is/)).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Ask something...'), 'what do you know?');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(await screen.findByText(/Good question/)).toBeInTheDocument();
  });
});
