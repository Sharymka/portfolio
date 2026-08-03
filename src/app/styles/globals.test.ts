import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const globalsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'globals.scss');
const source = readFileSync(globalsPath, 'utf-8');

describe('globals.scss — shared keyframes', () => {
  it('defines all four shared keyframes by exact name', () => {
    for (const name of ['floatBlob', 'gradientShift', 'bgBreathe', 'glowPulse']) {
      expect(source).toMatch(new RegExp(`@keyframes ${name}\\s*\\{`));
    }
  });

  it('still pauses all animation under prefers-reduced-motion', () => {
    expect(source).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(source).toMatch(/animation-duration:\s*0\.01ms\s*!important/);
  });

  it('sets base body color/font from tokens', () => {
    expect(source).toMatch(/color:\s*var\(--color-text\)/);
    expect(source).toMatch(/font-family:\s*var\(--font-body\)/);
  });

  it('applies the animated gradient background to body', () => {
    expect(source).toMatch(
      /background:\s*linear-gradient\(\s*90deg,\s*var\(--color-neutral-100\),\s*var\(--color-accent-100\),\s*var\(--color-neutral-100\),\s*var\(--color-neutral-100\),\s*var\(--color-accent-2-200\)\s*\)/,
    );
    expect(source).toMatch(/background-size:\s*140% 140%/);
    expect(source).toMatch(/animation:\s*bgBreathe 16s ease-in-out infinite/);
  });
});
