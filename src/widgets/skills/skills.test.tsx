import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';
import { Skills } from './skills';

function SkillsWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <Skills />
    </>
  );
}

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

  it('translates the heading and category labels after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <SkillsWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.textContent).toMatch(/Tools/);
    expect(heading.textContent).toMatch(/solve problems every day/);
    expect(screen.getByText('Testing & Quality')).toBeInTheDocument();
    expect(screen.getByText('Backend-adjacent')).toBeInTheDocument();
    expect(screen.getByText('Also worked with:')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
