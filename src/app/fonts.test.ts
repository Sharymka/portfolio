import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const fontsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fonts.ts');
const source = readFileSync(fontsPath, 'utf-8');

describe('fonts.ts — Unbounded + Nunito', () => {
  it('imports Unbounded and Nunito from next/font/google', () => {
    expect(source).toMatch(/import\s*\{[^}]*Unbounded[^}]*\}\s*from\s*['"]next\/font\/google['"]/);
    expect(source).toMatch(/import\s*\{[^}]*Nunito[^}]*\}\s*from\s*['"]next\/font\/google['"]/);
  });

  it('requests the cyrillic subset for both fonts', () => {
    const matches = source.match(/subsets:\s*\[[^\]]*\]/g) ?? [];
    expect(matches.length).toBeGreaterThanOrEqual(2);
    for (const m of matches) {
      expect(m).toMatch(/cyrillic/);
    }
  });

  it('sets the exact CSS variable names tokens.scss depends on', () => {
    expect(source).toMatch(/variable:\s*['"]--font-unbounded['"]/);
    expect(source).toMatch(/variable:\s*['"]--font-nunito['"]/);
  });

  it('no longer references the old fonts', () => {
    expect(source).not.toMatch(/Space_Grotesk/);
    expect(source).not.toMatch(/\bInter\b/);
    expect(source).not.toMatch(/JetBrains_Mono/);
  });
});
