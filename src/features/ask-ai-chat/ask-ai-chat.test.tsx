import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AskAiChat } from './ask-ai-chat';

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
});
