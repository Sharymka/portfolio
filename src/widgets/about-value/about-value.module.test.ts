import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const source = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'about-value.module.scss'),
  'utf-8',
);

describe('about-value.module.scss — gradient heading words', () => {
  it('defines gradientShift locally in this module', () => {
    // See hero.module.scss for why: Lightning CSS scopes animation-name
    // references even without a matching local @keyframes.
    expect(source).toMatch(/@keyframes gradientShift\s*\{/);
  });

  it('animates both accent gradient spans', () => {
    expect(source).toMatch(/\.gradientAccent\s*\{[^}]*animation:\s*gradientShift 6s ease infinite/);
    expect(source).toMatch(
      /\.gradientAccent2\s*\{[^}]*animation:\s*gradientShift 6s ease infinite/,
    );
  });
});
