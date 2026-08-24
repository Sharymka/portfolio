import { describe, expect, it } from 'vitest';
import { PROFILE } from './profile';

describe('PROFILE', () => {
  it('has non-empty text for every narrative field', () => {
    const narrativeFields = [
      PROFILE.career,
      PROFILE.experience,
      PROFILE.status,
      PROFILE.workFormat,
      PROFILE.preferences,
      PROFILE.strengths,
      PROFILE.currentlyLearning,
      PROFILE.english,
      PROFILE.teamwork,
      PROFILE.agile,
      PROFILE.documents,
      PROFILE.personal,
    ];
    for (const field of narrativeFields) {
      expect(field.length).toBeGreaterThan(0);
    }
  });

  it('has all 10 boundaries', () => {
    expect(PROFILE.boundaries).toHaveLength(10);
  });

  it('states the English level honestly as Upper-Intermediate', () => {
    expect(PROFILE.english).toContain('Upper-Intermediate');
  });

  it('speaks in first person, not third person', () => {
    expect(PROFILE.status).toContain('ищу работу');
    expect(PROFILE.status).not.toContain('ищет работу');
    expect(PROFILE.experience).toContain('Работаю в команде');
    expect(PROFILE.experience).not.toContain('Работает в команде');
    expect(PROFILE.agile).toContain('Отношусь к формату');
    expect(PROFILE.agile).not.toContain('Относится к формату');
  });
});
