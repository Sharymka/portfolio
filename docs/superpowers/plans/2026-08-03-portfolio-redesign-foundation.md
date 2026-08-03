# Portfolio Redesign — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark-slate/teal-orange design tokens and fonts with the new warm cream/organic palette from `docs/superpowers/specs/2026-07-31-portfolio-redesign-design.md`, and stand up the site shell (nav + footer) so later plans (Hero, About/Value, Skills, Cases+carousel, Think, Ask My AI, Documents, Contact) build on a correct visual foundation instead of the superseded one.

**Architecture:** Single-theme redesign (the new design has no dark-mode variant, so `data-theme` light/dark branching is removed — one palette only). Tokens and fonts change in place in the existing `src/app/styles/` and `src/app/fonts.ts` files. `Button` loses the teal/orange gradient + shine-sweep effect entirely (that was specific to the now-superseded direction) and becomes a plain solid-accent button per the new design's `.btn-primary`. Two new widgets (`SiteNav`, `SiteFooter`) are added under a new `src/widgets/` FSD layer, per the trimmed-FSD architecture already established in `2026-07-17-portfolio-foundation.md`. CSS-only changes are tested via source-content assertions against `fs`-read files (the established pattern in this repo — jsdom doesn't compute real `color-mix()`/gradient/custom-property values); component behavior is tested with React Testing Library.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, SCSS Modules, `next/font/google` (Unbounded, Nunito), Vitest + React Testing Library, Node `fs`/`path`/`url` for source-content assertions.

## Global Constraints

- Fonts: **Unbounded** (headings, weights 400/500/700/800) + **Nunito** (body, weights 400/600/700/800) — both confirmed to support the `cyrillic`/`cyrillic-ext` Google Fonts subsets. Replaces Space Grotesk / Inter / JetBrains Mono entirely. Loaded via `next/font/google` with `subsets: ['latin', 'cyrillic']`.
- Colors — exact hex values from the Claude Design source (`styles.css` in the imported project), copied verbatim, not reinterpreted:
  - `--color-bg: #f5ead8`, `--color-surface: #ebddc5`, `--color-text: #201e1d`
  - `--color-accent: #c67139` (with ramp `--color-accent-100..900`: `#fff2eb #ffe1d0 #ffc6a5 #f6a06b #d67f48 #b2622d #8c491a #643312 #402310`)
  - `--color-accent-2: #7a8a5e` (with ramp `--color-accent-2-100..900`: `#f0fae1 #e1eecc #ccdbb2 #aebf92 #8fa073 #728157 #56633f #3d472b #272e1b`)
  - `--color-neutral-100..900`: `#f9f4ed #eee7db #dcd3c4 #c0b6a5 #a19786 #82796a #645c50 #474238 #2e2b25`
  - `--color-divider: color-mix(in srgb, #201e1d 16%, transparent)`
- Radii: `--radius-sm: 0.5rem` (8px), `--radius-md: 1rem` (16px), `--radius-lg: 1.75rem` (28px) — `--radius-lg` is new, doesn't exist in current tokens.
- Spacing scale (`--space-1` through `--space-12`) is **not** touched — the design source has odd non-round pixel values (`4.4px`, `13.2px`, ...) that are a scaling artifact of the design tool, not a meaningful design decision. Keep the existing rem-based scale.
- No dark mode: `data-theme="dark"`/`"light"` branching is removed from `tokens.scss` and `layout.tsx`. One palette, no `data-theme` attribute.
- `Button`'s gradient background + `::before`/`::after` shine-sweep animation (added in the superseded `2026-07-24-warm-accent-palette.md` plan) is removed. New `.primary` is solid `var(--color-accent)` background, matching the design's plain `.btn-primary`.
- Package manager: npm. Test runner: Vitest (`npm test`). Typecheck: `npm run typecheck`. Lint: `npm run lint`.
- FSD layer for this plan: introduces `src/widgets/` (doesn't exist yet). No `src/entities/` or `src/features/` needed for nav/footer.

---

### Task 1: Replace design tokens — palette, radii, remove dark/light split

**Files:**
- Modify: `src/app/styles/tokens.scss`
- Modify: `src/app/styles/tokens.test.ts` (already exists from the warm-accent-palette plan — repurpose it for the new palette; if it doesn't exist, create it)

**Interfaces:**
- Produces: `--color-bg`, `--color-surface`, `--color-text`, `--color-accent`, `--color-accent-2`, `--color-accent-{100..900}`, `--color-accent-2-{100..900}`, `--color-neutral-{100..900}`, `--color-divider`, `--radius-sm`, `--radius-md`, `--radius-lg` as global custom properties on `:root` (no `data-theme` selector). `--space-*` and `--font-*` variable *names* are unchanged (fonts get new values in Task 2).

- [ ] **Step 1: Write the failing test**

Replace the full contents of `src/app/styles/tokens.test.ts` with:

```typescript
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/styles/tokens.test.ts`
Expected: FAIL — current `tokens.scss` has the old slate/teal palette and `[data-theme]` blocks, none of the new colors exist yet.

- [ ] **Step 3: Rewrite `tokens.scss`**

Replace the full contents of `src/app/styles/tokens.scss` with:

```scss
:root {
  --color-bg: #f5ead8;
  --color-surface: #ebddc5;
  --color-text: #201e1d;
  --color-text-muted: color-mix(in srgb, #201e1d 55%, transparent);
  --color-divider: color-mix(in srgb, #201e1d 16%, transparent);

  --color-neutral-100: #f9f4ed;
  --color-neutral-200: #eee7db;
  --color-neutral-300: #dcd3c4;
  --color-neutral-400: #c0b6a5;
  --color-neutral-500: #a19786;
  --color-neutral-600: #82796a;
  --color-neutral-700: #645c50;
  --color-neutral-800: #474238;
  --color-neutral-900: #2e2b25;

  --color-accent: #c67139;
  --color-accent-100: #fff2eb;
  --color-accent-200: #ffe1d0;
  --color-accent-300: #ffc6a5;
  --color-accent-400: #f6a06b;
  --color-accent-500: #d67f48;
  --color-accent-600: #b2622d;
  --color-accent-700: #8c491a;
  --color-accent-800: #643312;
  --color-accent-900: #402310;

  --color-accent-2: #7a8a5e;
  --color-accent-2-100: #f0fae1;
  --color-accent-2-200: #e1eecc;
  --color-accent-2-300: #ccdbb2;
  --color-accent-2-400: #aebf92;
  --color-accent-2-500: #8fa073;
  --color-accent-2-600: #728157;
  --color-accent-2-700: #56633f;
  --color-accent-2-800: #3d472b;
  --color-accent-2-900: #272e1b;

  --font-heading: var(--font-unbounded), sans-serif;
  --font-body: var(--font-nunito), sans-serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.75rem;

  --shadow-sm: 0 1px 2px color-mix(in srgb, #2e2b25 14%, transparent);
  --shadow-md: 0 3px 10px color-mix(in srgb, #2e2b25 16%, transparent);
  --shadow-lg: 0 12px 32px color-mix(in srgb, #2e2b25 22%, transparent);

  color-scheme: light;
}
```

Note: `--color-bg-elevated` (used nowhere yet outside tokens) is dropped in favor of `--color-surface`, matching the design's own naming. If a later task's grep finds a stray reference, rename it to `--color-surface` there.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/app/styles/tokens.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add src/app/styles/tokens.scss src/app/styles/tokens.test.ts
git commit -m "feat: replace design tokens with warm organic palette"
```

---

### Task 2: Swap fonts — Unbounded + Nunito, drop the old three

**Files:**
- Modify: `src/app/fonts.ts`
- Modify: `src/app/layout.tsx`
- Test: `src/app/fonts.test.ts` (create)

**Interfaces:**
- Consumes: nothing from Task 1 directly (fonts and tokens are independent files), but `--font-heading`/`--font-body` in `tokens.scss` (Task 1) already reference `--font-unbounded`/`--font-nunito` — this task must produce CSS variables with exactly those names.
- Produces: `unbounded` and `nunito` exports from `src/app/fonts.ts`, each a `next/font/google` result object with `.variable` set to `--font-unbounded` / `--font-nunito` respectively. `RootLayout` applies both `.variable` classes to `<html>` and no longer sets `data-theme`.

- [ ] **Step 1: Write the failing test**

Create `src/app/fonts.test.ts`:

```typescript
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/fonts.test.ts`
Expected: FAIL — `fonts.ts` still imports Space_Grotesk/Inter/JetBrains_Mono.

- [ ] **Step 3: Rewrite `src/app/fonts.ts`**

```typescript
import { Unbounded, Nunito } from 'next/font/google';

export const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-unbounded',
  display: 'swap',
});

export const nunito = Nunito({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/app/fonts.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Update `layout.tsx`**

Replace the full contents of `src/app/layout.tsx` with:

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './styles/globals.scss';
import { unbounded, nunito } from './fonts';

export const metadata: Metadata = {
  title: 'Светлана Хайрудинова — Frontend-разработчик',
  description: 'Портфолио frontend-разработчика (React / Next.js)',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: exits 0. (`lang="ru"` and the metadata title/description are content decisions from the design spec §3/§6, not placeholders.)

- [ ] **Step 7: Commit**

```bash
git add src/app/fonts.ts src/app/fonts.test.ts src/app/layout.tsx
git commit -m "feat: swap fonts to Unbounded + Nunito for Cyrillic support"
```

---

### Task 3: Global styles — reset, base typography, shared keyframes

**Files:**
- Modify: `src/app/styles/globals.scss`
- Test: `src/app/styles/globals.test.ts` (create)

**Interfaces:**
- Consumes: `--color-bg`, `--color-text`, `--font-body` from Task 1's `tokens.scss`.
- Produces: four global `@keyframes` (`floatBlob`, `gradientShift`, `bgBreathe`, `glowPulse`) available to any component's SCSS Module via plain reference (Sass keyframes are global, not scoped) — later Hero/section plans depend on these exact names. Also produces base heading sizing (`h1`-`h6`) matching the design's scale, since no component has defined its own yet.

- [ ] **Step 1: Write the failing test**

Create `src/app/styles/globals.test.ts`:

```typescript
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

  it('sets base body background/color/font from tokens', () => {
    expect(source).toMatch(/background:\s*var\(--color-bg\)/);
    expect(source).toMatch(/color:\s*var\(--color-text\)/);
    expect(source).toMatch(/font-family:\s*var\(--font-body\)/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/styles/globals.test.ts`
Expected: FAIL — none of the four keyframes exist yet in `globals.scss`.

- [ ] **Step 3: Rewrite `globals.scss`**

Replace the full contents of `src/app/styles/globals.scss` with:

```scss
@use './tokens.scss';

* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
  line-height: 1.12;
  letter-spacing: -0.015em;
  margin: 0 0 var(--space-2);
}

h1 {
  font-size: clamp(28px, 4.4vw, 56px);
  font-weight: 800;
}
h2 {
  font-size: 32px;
  font-weight: 700;
}
h3 {
  font-size: 25px;
  font-weight: 700;
}
h6 {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

p {
  margin: 0 0 var(--space-3);
}

a {
  color: var(--color-accent);
}

@keyframes floatBlob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-10px, 14px) scale(1.04);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes bgBreathe {
  0%,
  100% {
    background-position: 20% 50%;
  }
  50% {
    background-position: 40% 50%;
  }
}

@keyframes glowPulse {
  0%,
  100% {
    box-shadow: 0 4px 18px color-mix(in srgb, var(--color-accent) 45%, transparent);
  }
  50% {
    box-shadow: 0 8px 34px color-mix(in srgb, var(--color-accent) 65%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/app/styles/globals.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add src/app/styles/globals.scss src/app/styles/globals.test.ts
git commit -m "feat: add shared keyframes and base typography to globals"
```

---

### Task 4: Simplify `Button` — drop the gradient/shine effect, solid accent only

**Files:**
- Modify: `src/shared/ui/button/button.module.scss`
- Modify: `src/shared/ui/button/button.module.test.ts` (exists from the superseded warm-accent-palette plan — rewrite it; delete if replacing wholesale is cleaner)
- Do not modify: `src/shared/ui/button/button.tsx`, `button.test.tsx` (component API/behavior is unchanged — this is a pure SCSS task)

**Interfaces:**
- Consumes: `--color-accent`, `--color-bg`, `--color-text`, `--color-divider`, `--radius-md` from Task 1.
- Produces: `.primary`/`.secondary` classes with no pseudo-elements and no `@keyframes` reference — later Hero-plan work must not assume a shine effect exists on `Button`.

- [ ] **Step 1: Write the failing test**

Replace `src/shared/ui/button/button.module.test.ts` with:

```typescript
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
    expect(source).toMatch(/\.primary\s*\{[^}]*background:\s*var\(--color-accent\)/s);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/shared/ui/button/button.module.test.ts`
Expected: FAIL — current file still has `linear-gradient`, `::before`, `::after`, `@keyframes btn-shine`.

- [ ] **Step 3: Rewrite `button.module.scss`**

```scss
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.1s ease;

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }
}

.primary {
  background: var(--color-accent);
  color: var(--color-bg);

  &:hover {
    filter: brightness(1.05);
  }
}

.secondary {
  background: transparent;
  border-color: var(--color-divider);
  color: var(--color-text);

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}
```

- [ ] **Step 4: Run the new test, then the whole Button suite**

Run: `npx vitest run src/shared/ui/button/`
Expected: PASS — both `button.test.tsx` (unchanged component behavior) and `button.module.test.ts` (new) pass.

- [ ] **Step 5: Commit**

```bash
git add src/shared/ui/button/button.module.scss src/shared/ui/button/button.module.test.ts
git commit -m "refactor: simplify Button to solid accent, drop gradient/shine"
```

---

### Task 5: `widgets/site-nav` — sticky nav with anchors, RU/EN toggle, CTA

**Files:**
- Create: `src/widgets/site-nav/site-nav.tsx`
- Create: `src/widgets/site-nav/site-nav.module.scss`
- Create: `src/widgets/site-nav/index.ts`
- Test: `src/widgets/site-nav/site-nav.test.tsx`

**Interfaces:**
- Consumes: `Button` from `@/shared/ui/button` (the "Связаться" CTA).
- Produces: `SiteNav` component, `import { SiteNav } from '@/widgets/site-nav'`, no props (static content — brand name and nav links are fixed copy from the design spec, not configurable). Renders a `<nav>` with anchor links `#skills`, `#cases`, `#think`, `#ai`, `#documents`, `#contact`, and an RU/EN toggle button that is presentational-only (per spec §11 — no real translation, `lang` state stays local to this component).

- [ ] **Step 1: Write the failing test**

Create `src/widgets/site-nav/site-nav.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteNav } from './site-nav';

describe('SiteNav', () => {
  it('renders the brand name', () => {
    render(<SiteNav />);
    expect(screen.getByText('Светлана Хайрудинова')).toBeInTheDocument();
  });

  it('renders all six anchor links with the correct hrefs', () => {
    render(<SiteNav />);
    const expected: Record<string, string> = {
      Навыки: '#skills',
      Кейсы: '#cases',
      Подход: '#think',
      'Спросить ИИ': '#ai',
      Документы: '#documents',
      Связаться: '#contact',
    };
    for (const [label, href] of Object.entries(expected)) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('toggles the active RU/EN pill on click without changing any other text', () => {
    render(<SiteNav />);
    const ruButton = screen.getByRole('button', { name: 'RU' });
    const enButton = screen.getByRole('button', { name: 'EN' });

    expect(ruButton).toHaveAttribute('aria-pressed', 'true');
    expect(enButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches aria-pressed to EN after a click', async () => {
    const user = userEvent.setup();
    render(<SiteNav />);
    await user.click(screen.getByRole('button', { name: 'EN' }));

    expect(screen.getByRole('button', { name: 'EN' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'RU' })).toHaveAttribute('aria-pressed', 'false');
  });
});
```

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/widgets/site-nav/site-nav.test.tsx`
Expected: FAIL — `Cannot find module './site-nav'`.

- [ ] **Step 3: Implement the component**

`src/widgets/site-nav/site-nav.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import styles from './site-nav.module.scss';

const LINKS: Array<{ label: string; href: string }> = [
  { label: 'Навыки', href: '#skills' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Подход', href: '#think' },
  { label: 'Спросить ИИ', href: '#ai' },
  { label: 'Документы', href: '#documents' },
];

export function SiteNav() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>Светлана Хайрудинова</div>
      {LINKS.map((link) => (
        <a key={link.href} href={link.href} className={styles.link}>
          {link.label}
        </a>
      ))}
      <div className={styles.langToggle} role="group" aria-label="Язык">
        <button
          type="button"
          className={styles.langPill}
          aria-pressed={lang === 'ru'}
          data-active={lang === 'ru'}
          onClick={() => setLang('ru')}
        >
          RU
        </button>
        <button
          type="button"
          className={styles.langPill}
          aria-pressed={lang === 'en'}
          data-active={lang === 'en'}
          onClick={() => setLang('en')}
        >
          EN
        </button>
      </div>
      <Button as="a" href="#contact" variant="primary" className={styles.cta}>
        Связаться
      </Button>
    </nav>
  );
}
```

This assumes `Button` accepts a polymorphic `as` prop (`as="a"` rendering an anchor with `href`). Check `src/shared/ui/button/button.tsx`:
- If `Button` is not yet polymorphic, add a minimal `as` prop to it in this step: `as?: ElementType` defaulting to `'button'`, spreading `props` onto the resolved `Component`, keeping the existing `ButtonProps` behavior for the default case. Re-run `npx vitest run src/shared/ui/button/button.test.tsx` afterward to confirm the existing 3 tests still pass unmodified.

`src/widgets/site-nav/site-nav.module.scss`:

```scss
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: clamp(10px, 3vw, 17.6px);
  flex-wrap: wrap;
  padding: var(--space-3) clamp(16px, 5vw, 64px);
  background: color-mix(in srgb, var(--color-neutral-100) 88%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-divider);
}

.brand {
  font-family: var(--font-heading);
  font-size: 19px;
  margin-right: auto;
}

.link {
  color: inherit;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: var(--color-accent);
  }
}

.langToggle {
  margin-left: var(--space-2);
  border: 1px solid var(--color-divider);
  border-radius: 999px;
  padding: 6px 4px;
  display: flex;
  gap: 2px;
}

.langPill {
  padding: 4px 10px;
  border-radius: 999px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  font-family: var(--font-body);
  color: inherit;

  &[data-active='true'] {
    background: var(--color-accent-500);
    font-weight: 700;
    color: var(--color-bg);
  }
}

.cta {
  margin-left: var(--space-2);
  white-space: nowrap;
  text-decoration: none;
}
```

`src/widgets/site-nav/index.ts`:

```typescript
export { SiteNav } from './site-nav';
```

- [ ] **Step 4: Run and verify it passes**

Run: `npx vitest run src/widgets/site-nav/site-nav.test.tsx`
Expected: PASS, 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/widgets/site-nav src/shared/ui/button/button.tsx
git commit -m "feat: add SiteNav widget"
```

---

### Task 6: `widgets/site-footer` — copyright line

**Files:**
- Create: `src/widgets/site-footer/site-footer.tsx`
- Create: `src/widgets/site-footer/site-footer.module.scss`
- Create: `src/widgets/site-footer/index.ts`
- Test: `src/widgets/site-footer/site-footer.test.tsx`

**Interfaces:**
- Produces: `SiteFooter` component, `import { SiteFooter } from '@/widgets/site-footer'`, no props.

- [ ] **Step 1: Write the failing test**

Create `src/widgets/site-footer/site-footer.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('renders the copyright line', () => {
    render(<SiteFooter />);
    expect(screen.getByText('© 2026 Светлана Хайрудинова')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/widgets/site-footer/site-footer.test.tsx`
Expected: FAIL — `Cannot find module './site-footer'`.

- [ ] **Step 3: Implement**

`src/widgets/site-footer/site-footer.tsx`:

```tsx
import styles from './site-footer.module.scss';

export function SiteFooter() {
  return <footer className={styles.footer}>© 2026 Светлана Хайрудинова</footer>;
}
```

`src/widgets/site-footer/site-footer.module.scss`:

```scss
.footer {
  padding: var(--space-4) clamp(20px, 5vw, 64px);
  text-align: center;
  font-size: 12px;
  color: var(--color-text-muted);
}
```

`src/widgets/site-footer/index.ts`:

```typescript
export { SiteFooter } from './site-footer';
```

- [ ] **Step 4: Run and verify it passes**

Run: `npx vitest run src/widgets/site-footer/site-footer.test.tsx`
Expected: PASS, 1 test.

- [ ] **Step 5: Commit**

```bash
git add src/widgets/site-footer
git commit -m "feat: add SiteFooter widget"
```

---

### Task 7: Wire the shell into `page.tsx` and verify in a real browser

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `SiteNav` (Task 5), `SiteFooter` (Task 6).
- Produces: the new homepage shell other plans (Hero, About/Value, ...) will insert `<section>`s into, between nav and footer.

- [ ] **Step 1: Replace `page.tsx`**

```tsx
import { SiteNav } from '@/widgets/site-nav';
import { SiteFooter } from '@/widgets/site-footer';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>{/* Sections land here in later plans: Hero, About/Value, Skills, Cases, Think, Ask AI, Documents, Contact */}</main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: all test files pass (smoke, tokens, fonts, globals, Button ×2, Container, SiteNav, SiteFooter).

- [ ] **Step 3: Typecheck, lint, build**

```bash
npm run typecheck
npm run lint
npm run build
```

Expected: all exit 0.

- [ ] **Step 4: Manual visual check in a real browser**

Run: `npm run dev` (leave running), then navigate to `http://localhost:3000` (via the Playwright MCP `browser_navigate` + `browser_take_screenshot` tools, or a regular browser).

Confirm:
- Background is warm cream (`#f5ead8`), not dark slate.
- Nav is sticky, shows brand name in Unbounded, links in Nunito, RU pill highlighted by default.
- Clicking EN switches which pill is highlighted (no text changes elsewhere — that's expected per spec §11).
- Footer shows the copyright line.
- No console errors related to missing fonts or broken `var(--color-*)` references (open DevTools console).

If anything doesn't match, stop and fix before moving to the next plan.

- [ ] **Step 5: Stop the dev server, commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire SiteNav and SiteFooter into the homepage shell"
```

---

## What's next

This plan only covers tokens, fonts, global styles, `Button`, `SiteNav`, `SiteFooter`. Each remaining section from `2026-07-31-portfolio-redesign-design.md` (Hero, About/Value's 7 cards, Skills, Cases + screenshot carousel, Think, Ask My AI chat, Documents, Contact form) needs its own follow-up plan, written the same way once you're ready for it — each is independently testable and depends only on the tokens/fonts/keyframes this plan establishes. Media assets (hero photo, case screenshots, the 3 documents) get placed into `public/` as part of whichever plan first needs them, not here.
