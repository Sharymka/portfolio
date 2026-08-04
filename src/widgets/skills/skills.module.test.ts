import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const source = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'skills.module.scss'),
  'utf-8',
);

describe('skills.module.scss — gradient heading text', () => {
  it('defines gradientShift locally in this module', () => {
    // See hero.module.scss for why: Lightning CSS scopes animation-name
    // references even without a matching local @keyframes, which silently
    // breaks the animation if the keyframes only exist in globals.scss.
    expect(source).toMatch(/@keyframes gradientShift\s*\{/);
  });

  it('animates the gradient text with the locally-scoped keyframes', () => {
    const block = source.slice(source.indexOf('.gradientText'));
    expect(block).toMatch(/animation:\s*gradientShift 6s ease infinite/);
  });
});
