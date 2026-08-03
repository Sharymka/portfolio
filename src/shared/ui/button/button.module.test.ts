import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scssPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'button.module.scss');
const source = readFileSync(scssPath, 'utf-8');

describe('button.module.scss — solid accent, no gradient/shine', () => {
  it('has no shine keyframe or pseudo-element animation', () => {
    expect(source).not.toMatch(/@keyframes\s+btn-shine/);
    expect(source).not.toMatch(/::before/);
    expect(source).not.toMatch(/::after/);
  });

  it('primary uses a solid accent background, not a gradient', () => {
    expect(source).not.toMatch(/linear-gradient/);
    expect(source).toMatch(/\.primary\s*\{[^}]*background:\s*var\(--color-accent\)/);
  });
});
