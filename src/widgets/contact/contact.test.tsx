import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from './contact';

describe('Contact', () => {
  it('has the #contact anchor id and shows the form initially', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(screen.getByLabelText('Имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Сообщение')).toBeInTheDocument();
  });

  it('shows direct email and Telegram links', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Email/ })).toHaveAttribute(
      'href',
      'mailto:sveta.sharymova@gmail.com',
    );
    expect(screen.getByRole('link', { name: /Telegram/ })).toHaveAttribute(
      'href',
      'https://t.me/svetka_khai',
    );
  });

  it('shows a thank-you message instead of the form after submit', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText('Имя'), 'Света');
    await user.type(screen.getByLabelText('Email'), 'sveta@example.com');
    await user.type(screen.getByLabelText('Сообщение'), 'Привет!');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));

    expect(screen.getByText('Спасибо, сообщение отправлено')).toBeInTheDocument();
    expect(screen.queryByLabelText('Имя')).not.toBeInTheDocument();
  });
});
