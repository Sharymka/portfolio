import { describe, expect, it } from 'vitest';
import { PROFILE } from '@/entities/profile';
import { buildSystemPrompt } from './system-prompt';

describe('buildSystemPrompt', () => {
  it('includes profile facts', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Upper-Intermediate');
    expect(prompt).toContain('Тбилиси');
  });

  it('includes every boundary verbatim', () => {
    const prompt = buildSystemPrompt('ru');
    for (const boundary of PROFILE.boundaries) {
      expect(prompt).toContain(boundary);
    }
  });

  it('includes case titles from the case entity', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Экосистема Альфа — маркетплейс объявлений и аукционов');
  });

  it('includes skill tags', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Redux Toolkit');
  });

  it('includes approach principles', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Сначала понимаю ограничения');
  });

  it('instructs the model to answer in Russian for lang "ru"', () => {
    expect(buildSystemPrompt('ru')).toMatch(/русском/);
  });

  it('instructs the model to answer in English for lang "en"', () => {
    expect(buildSystemPrompt('en')).toMatch(/английском/);
  });
});
