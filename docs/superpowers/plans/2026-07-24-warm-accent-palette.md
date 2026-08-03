# Warm Accent Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved design in `docs/superpowers/specs/2026-07-24-warm-accent-palette-design.md` — swap the teal accent design tokens for a warm orange gradient, and add a subtle animated "shine" sweep to the primary `Button` variant, inspired by nupix.ai's CTA button.

**Architecture:** Two isolated, independently-testable changes: (1) a design-token value swap in `tokens.scss`, and (2) a CSS-only pseudo-element animation added to the existing `Button` primitive's `.primary` variant. Both are regression-guarded by tests that assert against the raw SCSS source text via Node's `fs`, not `getComputedStyle` — jsdom does not compute pseudo-element styles or resolve `linear-gradient()`/custom-property values the way a real browser does, so source-content assertions are the honest, reliable way to test these files in this stack.

**Tech Stack:** SCSS Modules, CSS custom properties, Vitest (`environment: 'jsdom'`, `css: true`), Node `fs`/`path`/`url` for source-content assertions, React Testing Library for the existing component-behavior tests (unchanged).

## Global Constraints

- Only `--color-accent-start` and `--color-accent-end` change in `src/app/styles/tokens.scss` (the `:root, [data-theme='dark']` block) — new values `#ffa53d` and `#ff5a36`. No other token (`--color-bg`, `--color-text`, `--color-border`, spacing, radius, fonts, light-theme overrides) is touched.
- The shine-sweep effect (`::before` oversized gradient layer + `::after` blurred `btn-shine`-animated streak) is added **only** to `.primary` in `src/shared/ui/button/button.module.scss`. `.secondary` is not touched.
- The `::after` streak animation must pause under `@media (prefers-reduced-motion: reduce)` via `animation-play-state: paused`.
- `@keyframes btn-shine` sweep is exactly `translateX(-50%) rotate(25deg)` → `translateX(5000%) rotate(25deg)`, `3s ease infinite`.
- No new npm dependencies. No changes to the `Button` component's TypeScript API (`button.tsx` is not modified — this is a pure SCSS change).
- Styling stays SCSS Modules + CSS custom properties only (established project-wide constraint).
- Docs (`visual-style-research.md`, the homepage spec, and this feature's own design spec) are already amended and committed in a prior step — this plan implements code only, no doc changes.

---

### Task 1: Swap the accent design tokens from teal to warm orange

**Files:**
- Modify: `src/app/styles/tokens.scss:7-8`
- Test: `src/app/styles/tokens.test.ts` (create)

**Interfaces:**
- Produces: `--color-accent-start: #ffa53d` and `--color-accent-end: #ff5a36` (same custom-property names as before — `--color-accent` still aliases `--color-accent-start` unchanged) — consumed by `button.module.scss` via `var(--color-accent-start)` / `var(--color-accent-end)` (already wired, not modified in this task).

- [ ] **Step 1: Write the failing test**

Create `src/app/styles/tokens.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const tokensPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'tokens.scss');
const tokensSource = readFileSync(tokensPath, 'utf-8');

describe('design tokens', () => {
  it('defines the warm accent gradient', () => {
    expect(tokensSource).toMatch(/--color-accent-start:\s*#ffa53d;/);
    expect(tokensSource).toMatch(/--color-accent-end:\s*#ff5a36;/);
  });

  it('no longer references the old teal accent', () => {
    expect(tokensSource).not.toMatch(/#2dd4bf/i);
    expect(tokensSource).not.toMatch(/#22d3ee/i);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/styles/tokens.test.ts`
Expected: FAIL — `tokensSource` still contains `#2dd4bf` / `#22d3ee`, not `#ffa53d` / `#ff5a36`.

- [ ] **Step 3: Update the tokens**

In `src/app/styles/tokens.scss`, replace lines 7-8:

```scss
  --color-accent-start: #2dd4bf;
  --color-accent-end: #22d3ee;
```

with:

```scss
  --color-accent-start: #ffa53d;
  --color-accent-end: #ff5a36;
```

Leave line 9 (`--color-accent: var(--color-accent-start);`) and everything else in the file unchanged.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/app/styles/tokens.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/app/styles/tokens.scss src/app/styles/tokens.test.ts
git commit -m "feat: swap accent design tokens from teal to warm orange"
```

---

### Task 2: Add the "shine" sweep animation to the primary Button

**Files:**
- Modify: `src/shared/ui/button/button.module.scss:29-36`
- Test: `src/shared/ui/button/button.module.test.ts` (create)

**Interfaces:**
- Consumes: `--color-accent-start` / `--color-accent-end` tokens from Task 1 (must already be the warm-orange values for this task's visual result to be correct, though the SCSS itself only references the variable names, which are unchanged).
- Produces: `@keyframes btn-shine` (top-level, in `button.module.scss`) and `.primary::before` / `.primary::after` rules. Nothing later in this plan depends on these names, but future Hero/AI-chat implementation work referenced in the design spec §5 may reuse the same token cascade — no action needed here.

- [ ] **Step 1: Write the failing test**

Create `src/shared/ui/button/button.module.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scssPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'button.module.scss'
);
const source = readFileSync(scssPath, 'utf-8');

function extractBlock(text: string, selector: string): string {
  const start = text.indexOf(selector);
  if (start === -1) throw new Error(`selector "${selector}" not found`);
  const braceStart = text.indexOf('{', start);
  let depth = 0;
  for (let i = braceStart; i < text.length; i++) {
    if (text[i] === '{') depth++;
    if (text[i] === '}') {
      depth--;
      if (depth === 0) return text.slice(braceStart, i + 1);
    }
  }
  throw new Error(`unbalanced braces for selector "${selector}"`);
}

describe('button.module.scss — primary shine effect', () => {
  it('defines the btn-shine keyframes with the documented sweep', () => {
    const keyframes = extractBlock(source, '@keyframes btn-shine');
    expect(keyframes).toMatch(/translateX\(-50%\)\s*rotate\(25deg\)/);
    expect(keyframes).toMatch(/translateX\(5000%\)\s*rotate\(25deg\)/);
  });

  it('applies the shine animation only inside .primary, not .secondary', () => {
    const primaryBlock = extractBlock(source, '.primary');
    const secondaryBlock = extractBlock(source, '.secondary');
    expect(primaryBlock).toMatch(/animation:\s*btn-shine/);
    expect(secondaryBlock).not.toMatch(/btn-shine/);
  });

  it('pauses the shine animation under prefers-reduced-motion', () => {
    const primaryBlock = extractBlock(source, '.primary');
    expect(primaryBlock).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(primaryBlock).toMatch(/animation-play-state:\s*paused/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/shared/ui/button/button.module.test.ts`
Expected: FAIL — none of `btn-shine`, `prefers-reduced-motion`, `animation-play-state` exist yet in `button.module.scss`.

- [ ] **Step 3: Implement the shine effect**

In `src/shared/ui/button/button.module.scss`, replace the `.primary` block (lines 29-36):

```scss
.primary {
  background: linear-gradient(135deg, var(--color-accent-start), var(--color-accent-end));
  color: var(--color-bg);

  &:hover {
    filter: brightness(1.05);
  }
}
```

with:

```scss
.primary {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-accent-start), var(--color-accent-end));
  color: var(--color-bg);

  &:hover {
    filter: brightness(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 200%;
    background: linear-gradient(135deg, var(--color-accent-start), var(--color-accent-end));
    transform: translateX(0);
    transition: transform 0.4s;
  }

  &:hover::before {
    transform: translateX(-15%);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: 0;
    width: 1.25rem;
    height: 200%;
    background-color: rgba(255, 255, 255, 0.7);
    filter: blur(20px);
    transform-origin: 0 0;
    animation: btn-shine 3s ease infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation-play-state: paused;
    }
  }
}
```

Then append this new top-level rule at the end of the file (after the `.secondary` block):

```scss

@keyframes btn-shine {
  from {
    transform: translateX(-50%) rotate(25deg);
  }
  to {
    transform: translateX(5000%) rotate(25deg);
  }
}
```

- [ ] **Step 4: Run the new test to verify it passes**

Run: `npx vitest run src/shared/ui/button/button.module.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Run the full test suite to confirm no regressions**

Run: `npm test`
Expected: All tests pass, including the existing `src/shared/ui/button/button.test.tsx` (React rendering/behavior tests, unaffected by this CSS-only change) and `src/shared/ui/container/container.test.tsx`.

- [ ] **Step 6: Commit**

```bash
git add src/shared/ui/button/button.module.scss src/shared/ui/button/button.module.test.ts
git commit -m "feat: add animated shine sweep to primary Button"
```

---

### Task 3: Manual visual verification in a real browser

**Files:**
- Temporarily modify (then revert, not committed): `src/app/page.tsx`

**Interfaces:**
- Consumes: `Button` component with the `.primary`/`.secondary` variants updated in Tasks 1-2.
- Produces: nothing persisted — this task is a manual QA gate only, per the project rule that UI changes must be checked in a real browser before being called done.

- [ ] **Step 1: Temporarily render both Button variants**

Replace the contents of `src/app/page.tsx` (currently a placeholder) with:

```tsx
import { Button } from '@/shared/ui/button';

export default function Home() {
  return (
    <main style={{ display: 'flex', gap: '1rem', padding: '4rem' }}>
      <Button variant="primary">Смотреть проекты</Button>
      <Button variant="secondary">Написать мне</Button>
    </main>
  );
}
```

- [ ] **Step 2: Start the dev server**

Run: `npm run dev` (leave running)
Expected: server starts on `http://localhost:3000`

- [ ] **Step 3: Open the page and inspect it**

Navigate to `http://localhost:3000` in a browser (or via the Playwright MCP `browser_navigate` + `browser_take_screenshot` tools) and confirm:
- The primary button's gradient is warm orange/coral, not teal/cyan.
- A soft, blurred light streak sweeps diagonally across the primary button on a continuous loop (~3s).
- The secondary button is unchanged — outline style, no animation.
- In OS/browser settings, enabling "reduce motion" and reloading freezes the streak in place instead of animating.

If any of these don't hold, stop and fix `button.module.scss` before proceeding — do not move on with a visibly broken effect.

- [ ] **Step 4: Stop the dev server**

Run: Ctrl+C in the terminal running `npm run dev` (or kill the background process).

- [ ] **Step 5: Revert the temporary page change**

Restore `src/app/page.tsx` to its original placeholder content (homepage content is a separate, not-yet-scheduled plan — this task must not leak into it):

```tsx
export default function Home() {
  return (
    <main>
      <div>Hello world!</div>
    </main>
  );
}
```

- [ ] **Step 6: Confirm the revert is clean**

Run: `git status --porcelain src/app/page.tsx`
Expected: no output — `page.tsx` matches `HEAD`, nothing to commit for this task.
