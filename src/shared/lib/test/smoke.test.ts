import { describe, expect, it } from 'vitest';

describe('vitest wiring', () => {
  it('runs and resolves the @ alias-based setup file', () => {
    expect(1 + 1).toBe(2);
  });
});
