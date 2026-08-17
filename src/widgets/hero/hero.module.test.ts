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

  it('centers the hero in a fixed-width container like the other sections', () => {
    const hero = source.slice(0, source.indexOf('.circleTopLeft'));
    expect(hero).toMatch(/max-width:\s*\d+px/);
    expect(hero).toMatch(/margin:\s*0 auto/);
  });

  it('pushes the text and photo to opposite edges of the container', () => {
    const hero = source.slice(0, source.indexOf('.circleTopLeft'));
    expect(hero).toMatch(/justify-content:\s*space-between/);
  });

  it('keeps the top-left circle fully inside the section (not cropped)', () => {
    const circle = source.slice(
      source.indexOf('.circleTopLeft'),
      source.indexOf('.circleBottomLeft'),
    );
    expect(circle).not.toMatch(/top:\s*-/);
    expect(circle).not.toMatch(/left:\s*-/);
  });

  it('adds the small overlapping circle from the mockup near the top-left one', () => {
    expect(source).toMatch(/\.circleSmall/);
    const circle = source.slice(source.indexOf('.circleSmall'));
    expect(circle).toMatch(/background:\s*var\(--color-accent-300\)/);
    expect(circle).toMatch(/animation:\s*floatBlob 7s ease-in-out infinite reverse/);
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
