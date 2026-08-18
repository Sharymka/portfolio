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
});
