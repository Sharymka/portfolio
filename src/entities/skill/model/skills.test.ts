import { describe, expect, it } from 'vitest';
import { SKILL_CATEGORIES } from './skills';

describe('SKILL_CATEGORIES', () => {
  it('has the same 4 category labels in ru and en, in the same order', () => {
    expect(SKILL_CATEGORIES.ru.map((c) => c.label)).toEqual([
      'Core',
      'State & Data',
      'Тесты и качество',
      'Backend-смежное',
    ]);
    expect(SKILL_CATEGORIES.en.map((c) => c.label)).toEqual([
      'Core',
      'State & Data',
      'Testing & Quality',
      'Backend-adjacent',
    ]);
  });

  it('lists React under Core and Docker under Backend for both languages', () => {
    for (const lang of ['ru', 'en'] as const) {
      const [core, , , backend] = SKILL_CATEGORIES[lang];
      expect(core.tags).toContain('React');
      expect(backend.tags).toContain('Docker');
    }
  });
});
