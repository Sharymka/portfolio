import { describe, expect, it } from 'vitest';
import { THINK_PRINCIPLES } from './think-principles';

describe('THINK_PRINCIPLES', () => {
  it('has 3 principles in both languages', () => {
    expect(THINK_PRINCIPLES.ru).toHaveLength(3);
    expect(THINK_PRINCIPLES.en).toHaveLength(3);
  });

  it('has the expected RU titles in order', () => {
    expect(THINK_PRINCIPLES.ru.map((p) => p.title)).toEqual([
      'Сначала понимаю ограничения',
      'Простота — по умолчанию',
      'Думаю о развитии проекта',
    ]);
  });
});
