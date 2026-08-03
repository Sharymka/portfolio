import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const tokensPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'tokens.scss');
const tokensSource = readFileSync(tokensPath, 'utf-8');

describe('design tokens — warm organic palette', () => {
  it('defines the warm cream background and surface', () => {
    expect(tokensSource).toMatch(/--color-bg:\s*#f5ead8;/);
    expect(tokensSource).toMatch(/--color-surface:\s*#ebddc5;/);
    expect(tokensSource).toMatch(/--color-text:\s*#201e1d;/);
  });

  it('defines the accent and accent-2 base colors and full ramps', () => {
    expect(tokensSource).toMatch(/--color-accent:\s*#c67139;/);
    expect(tokensSource).toMatch(/--color-accent-2:\s*#7a8a5e;/);
    for (const step of ['100', '300', '500', '700', '900']) {
      expect(tokensSource).toMatch(new RegExp(`--color-accent-${step}:\\s*#[0-9a-f]{6};`));
      expect(tokensSource).toMatch(new RegExp(`--color-accent-2-${step}:\\s*#[0-9a-f]{6};`));
    }
  });

  it('defines the neutral ramp', () => {
    for (const step of ['100', '500', '900']) {
      expect(tokensSource).toMatch(new RegExp(`--color-neutral-${step}:\\s*#[0-9a-f]{6};`));
    }
  });

  it('defines all three radii including the new radius-lg', () => {
    expect(tokensSource).toMatch(/--radius-sm:\s*0\.5rem;/);
    expect(tokensSource).toMatch(/--radius-md:\s*1rem;/);
    expect(tokensSource).toMatch(/--radius-lg:\s*1\.75rem;/);
  });

  it('has no dark/light theme split', () => {
    expect(tokensSource).not.toMatch(/\[data-theme=['"]dark['"]\]/);
    expect(tokensSource).not.toMatch(/\[data-theme=['"]light['"]\]/);
  });

  it('no longer references the old slate/teal/orange palette', () => {
    expect(tokensSource).not.toMatch(/#0f172a/i);
    expect(tokensSource).not.toMatch(/#ffa53d/i);
    expect(tokensSource).not.toMatch(/#ff5a36/i);
    expect(tokensSource).not.toMatch(/#2dd4bf/i);
    expect(tokensSource).not.toMatch(/#22d3ee/i);
  });
});
