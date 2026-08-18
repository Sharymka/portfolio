import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';

const sendMessageMock = vi.fn();

interface MockChatState {
  messages: Array<{ id: string; role: string; parts: Array<{ type: string; text?: string }> }>;
  status: string;
  error: Error | undefined;
}

const mockChatState: MockChatState = { messages: [], status: 'ready', error: undefined };

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: mockChatState.messages,
    sendMessage: sendMessageMock,
    status: mockChatState.status,
    error: mockChatState.error,
  }),
}));

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
  beforeEach(() => {
    sendMessageMock.mockReset();
    mockChatState.messages = [];
    mockChatState.status = 'ready';
    mockChatState.error = undefined;
  });

  it('shows the starting AI message', () => {
    render(<AskAiChat />);
    expect(
      screen.getByText(
        'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
      ),
    ).toBeInTheDocument();
  });

  it('renders one quick-prompt button per topic', () => {
    render(<AskAiChat />);
    expect(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' })).toBeInTheDocument();
  });

  it('clicking a quick prompt sends the question with the current language', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.click(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' }));
    expect(sendMessageMock).toHaveBeenCalledWith(
      { text: 'Какой стек предпочитаешь?' },
      { body: { lang: 'ru' } },
    );
  });

  it('typing and submitting sends the message', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.type(screen.getByPlaceholderText('Спросите что-нибудь...'), 'Привет');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(sendMessageMock).toHaveBeenCalledWith({ text: 'Привет' }, { body: { lang: 'ru' } });
  });

  it('does nothing on empty submit', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it('renders assistant and user messages from the conversation', () => {
    mockChatState.messages = [
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Какой стек?' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'React и TypeScript' }] },
    ];
    render(<AskAiChat />);
    expect(screen.getByText('Какой стек?')).toBeInTheDocument();
    expect(screen.getByText('React и TypeScript')).toBeInTheDocument();
  });

  it('shows the error fallback when the chat errors', () => {
    mockChatState.error = new Error('network error');
    render(<AskAiChat />);
    expect(
      screen.getByText(
        'ИИ-ассистент временно недоступен, попробуйте позже, или напишите мне напрямую.',
      ),
    ).toBeInTheDocument();
  });

  it('disables input and prompt buttons while a response is streaming', () => {
    mockChatState.status = 'streaming';
    render(<AskAiChat />);
    expect(screen.getByPlaceholderText('Спросите что-нибудь...')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' })).toBeDisabled();
  });

  it('translates UI chrome and sends the language after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <AskAiChatWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText(/Hi! Ask me something/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: "What's your preferred stack?" }));
    expect(sendMessageMock).toHaveBeenCalledWith(
      { text: "What's your preferred stack?" },
      { body: { lang: 'en' } },
    );
  });
});
