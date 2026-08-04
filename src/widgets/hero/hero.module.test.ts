import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const source = readFileSync(
  path.join(path.dirname(fileURLToPath(import.meta.url)), 'hero.module.scss'),
  'utf-8',
);

describe('hero.module.scss — background circles and CTA shine', () => {
  it('defines three background circles (two static, one floating)', () => {
    expect(source).toMatch(/\.circleTopLeft/);
    expect(source).toMatch(/\.circleBottomLeft/);
    expect(source).toMatch(/\.circleFloating/);
    expect(source).toMatch(/animation:\s*floatBlob/);
  });

  it('gives the CTA an animated multi-stop gradient and glow', () => {
    const cta = source.slice(source.indexOf('.cta'));
    expect(cta).toMatch(/linear-gradient\(\s*120deg/);
    expect(cta).toMatch(/background-size:\s*300% 300%/);
    expect(cta).toMatch(/gradientShift 8s ease infinite/);
    expect(cta).toMatch(/glowPulse 3\.5s ease infinite/);
  });

  it('does not let the text column grow to push the photo away', () => {
    const content = source.slice(source.indexOf('.content'), source.indexOf('.tag'));
    expect(content).toMatch(/flex:\s*0 1/);
  });

  it('defines floatBlob, gradientShift, and glowPulse locally in this module', () => {
    // Lightning CSS (Turbopack's CSS Modules processor) scopes an
    // animation-name reference even when no matching local @keyframes
    // exists, silently breaking the animation — so the keyframes referenced
    // here must be defined in this same file, not only in globals.scss.
    expect(source).toMatch(/@keyframes floatBlob\s*\{/);
    expect(source).toMatch(/@keyframes gradientShift\s*\{/);
    expect(source).toMatch(/@keyframes glowPulse\s*\{/);
  });
});
