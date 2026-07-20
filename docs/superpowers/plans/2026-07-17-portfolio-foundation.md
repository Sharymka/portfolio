# Portfolio Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a working, deployed Next.js 16 skeleton for the portfolio — correct project scaffold, trimmed FSD foundations, design tokens, two base UI primitives with tests and Storybook stories, and a green CI pipeline — so later plans (content layer, pages, contact form, animations, AI chat) build on solid ground instead of re-deciding infrastructure.

**Architecture:** Next.js 16 App Router + TypeScript, styled with SCSS Modules and CSS custom properties (no Tailwind, no CSS-in-JS), tested with Vitest + React Testing Library, documented in Storybook 9, linted with ESLint (`eslint-config-next` flat config + `eslint-plugin-jsx-a11y`) and Prettier, checked in GitHub Actions, deployed to the existing Vercel project "Portfolio".

**Tech Stack:** Next.js 16.2.x, React 19.2.x, TypeScript (strict), SCSS (`sass`), Vitest, @testing-library/react, Storybook 9, ESLint 9 flat config, Prettier, GitHub Actions, Vercel.

**Out of scope for this plan (deferred to follow-up plans):** i18n (next-intl), content layer (Velite/MDX/Zod case schema), case study pages, contact form (RHF/Zod/Server Action/Resend), Motion animations, AI chat ("Ask My AI"), RU content. This plan only builds the foundation those features will sit on. The AI chat's LLM provider is explicitly undecided — do not add any AI-related dependency, route, or env var in this plan.

## Global Constraints

- Next.js 16.2.x, App Router, React 19.2.x, TypeScript strict, Node.js ≥ 20.9.0 (Next.js 16 hard requirement).
- No Redux Toolkit / RTK Query anywhere in the codebase.
- Styling is SCSS Modules + CSS custom properties only — no Tailwind, no styled-components/emotion.
- Architecture is trimmed Feature-Sliced Design: `app` (Next.js routing + global init) / `widgets` / `entities` / `features` (only where real interaction logic exists) / `shared`. No `processes` layer. No separate FSD `pages` layer (Next.js `app/` routing fills that role).
- Dark theme (default) tokens: background `#0F172A`, elevated background `#11172A`, text `#DFE5EC`, accent gradient `#2DD4BF → #22D3EE`. Light theme tokens: background `#F4F4F4`, text `#1B1B1B`. Both themes toggle via `data-theme` on `<html>`.
- Fonts via `next/font/google`: Space Grotesk (headings), Inter (body), JetBrains Mono (accent/mono), loaded with CSS variables, no layout shift.
- Lint/format: ESLint (`eslint-config-next` native flat config, `core-web-vitals` + `typescript` + `eslint-plugin-jsx-a11y` recommended rules) and Prettier — not Biome.
- Package manager: npm.
- Tests: Vitest + React Testing Library + `@testing-library/jest-dom`.
- Storybook: scoped only to `shared/ui` for this plan.
- CI: GitHub Actions running typecheck → lint → format check → test → build on every PR and on push to `main`.
- Deploy target: the existing Vercel project named "Portfolio" (already connected, currently empty after the repo was wiped).

---

### Task 1: Scaffold the Next.js 16 project

**Files:**
- Create: everything `create-next-app` generates (`package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, `.gitignore`, `next-env.d.ts`, etc.)
- Modify: `package.json` (add `engines` field)

**Interfaces:**
- Produces: a buildable Next.js 16 App Router project rooted at the repo root, with `src/` directory and `@/*` import alias, that all later tasks build inside.

- [ ] **Step 1: Run create-next-app into the current (non-empty but allow-listed) directory**

```bash
npx create-next-app@latest . --typescript --eslint --app --src-dir --import-alias "@/*" --no-tailwind --empty --use-npm
```

`docs/` and `.git/` are on create-next-app's allow-list for non-empty directories, so this will not be blocked or prompt about existing files. All other choices are pinned by flags, so no interactive prompts should appear; if one does anyway, accept the shown default.

- [ ] **Step 2: Verify the scaffold**

Run: `ls src/app && cat package.json`
Expected: `src/app` contains `layout.tsx` and `page.tsx`; `package.json` has `"next"` on the `16.x` line and `"react"`/`"react-dom"` on the `19.x` line.

- [ ] **Step 3: Pin the Node engine**

Edit `package.json`, add at the top level (sibling of `"scripts"`):

```json
"engines": {
  "node": ">=20.9.0"
}
```

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: exits 0, output ends with a route summary table and no red error lines.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 16 project"
```

---

### Task 2: Add jsx-a11y lint rules and Prettier

**Files:**
- Modify: `eslint.config.mjs`
- Create: `.prettierrc.json`
- Create: `.prettierignore`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: `eslint.config.mjs` as generated by Task 1 (native flat config exporting `nextVitals`/`nextTs` arrays via `eslint-config-next`).
- Produces: `npm run lint`, `npm run format`, `npm run format:check` scripts that later CI (Task 8) depends on by exact name.

- [ ] **Step 1: Confirm the jsx-a11y plugin's flat-config export shape**

```bash
npm install -D eslint-plugin-jsx-a11y prettier eslint-config-prettier
node -e "console.log(Object.keys(require('eslint-plugin-jsx-a11y')))"
```

Expected: the printed keys include `flatConfigs`. If they don't (a version mismatch), open `node_modules/eslint-plugin-jsx-a11y/package.json` `"exports"`/`"main"` field to find the correct flat-config export name and use that in Step 2 instead of `jsxA11y.flatConfigs.recommended.rules`.

- [ ] **Step 2: Wire jsx-a11y and Prettier into `eslint.config.mjs`**

Replace the file's contents with:

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  eslintConfigPrettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
  ]),
]);

export default eslintConfig;
```

- [ ] **Step 3: Add Prettier config**

Create `.prettierrc.json`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

Create `.prettierignore`:

```
.next
node_modules
coverage
storybook-static
package-lock.json
```

- [ ] **Step 4: Add scripts to `package.json`**

```json
"lint": "eslint .",
"format": "prettier --write .",
"format:check": "prettier --check ."
```

- [ ] **Step 5: Run and verify**

```bash
npm run lint
npm run format
npm run format:check
```

Expected: `lint` exits 0 with no errors (warnings acceptable); `format` rewrites files if needed; `format:check` then exits 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add jsx-a11y lint rules and Prettier"
```

---

### Task 3: Set up Vitest + React Testing Library

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/shared/lib/test/smoke.test.ts`
- Modify: `package.json` (scripts, devDependencies)

**Interfaces:**
- Produces: `npm test` script (later tasks and CI depend on this exact name), `vitest.setup.ts` loaded automatically by `vitest.config.ts` for every test file, `@` path alias resolvable inside tests.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/coverage-v8
```

- [ ] **Step 2: Write `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
});
```

- [ ] **Step 3: Write `vitest.setup.ts`**

```typescript
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Write the failing smoke test**

Create `src/shared/lib/test/smoke.test.ts`:

```typescript
import { describe, expect, it } from "vitest";

describe("vitest wiring", () => {
  it("runs and resolves the @ alias-based setup file", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Add the test script and run**

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Run: `npm test`
Expected: 1 test file, 1 test passed.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: wire up Vitest and React Testing Library"
```

---

### Task 4: Design tokens (SCSS) and font loading

**Files:**
- Create: `src/app/styles/tokens.scss`
- Create: `src/app/styles/globals.scss`
- Create: `src/app/fonts.ts`
- Modify: `src/app/layout.tsx`
- Delete: any `src/app/globals.css` generated by Task 1 (if present)

**Interfaces:**
- Produces: CSS custom properties (`--color-bg`, `--color-text`, `--color-accent-start`, `--color-accent-end`, `--font-heading`, `--font-body`, `--font-mono`, `--space-*`, `--radius-*`) available globally to every SCSS Module written in later tasks. `data-theme="dark" | "light"` attribute on `<html>` selects the palette.

- [ ] **Step 1: Install Sass**

```bash
npm install -D sass
```

- [ ] **Step 2: Remove the generated global stylesheet if present**

```bash
rm -f src/app/globals.css
```

- [ ] **Step 3: Write `src/app/styles/tokens.scss`**

```scss
:root,
[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-bg-elevated: #11172a;
  --color-text: #dfe5ec;
  --color-text-muted: #94a3b8;
  --color-accent-start: #2dd4bf;
  --color-accent-end: #22d3ee;
  --color-accent: var(--color-accent-start);
  --color-border: rgb(148 163 184 / 20%);

  --font-heading: var(--font-space-grotesk), sans-serif;
  --font-body: var(--font-inter), sans-serif;
  --font-mono: var(--font-jetbrains-mono), monospace;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;

  color-scheme: dark;
}

[data-theme="light"] {
  --color-bg: #f4f4f4;
  --color-bg-elevated: #ffffff;
  --color-text: #1b1b1b;
  --color-text-muted: #52525b;
  --color-border: rgb(27 27 27 / 12%);

  color-scheme: light;
}
```

- [ ] **Step 4: Write `src/app/styles/globals.scss`**

```scss
@use "./tokens.scss";

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
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
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

- [ ] **Step 5: Write `src/app/fonts.ts`**

```typescript
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
```

- [ ] **Step 6: Wire it into `src/app/layout.tsx`**

Replace the file's contents with:

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles/globals.scss";
import { spaceGrotesk, inter, jetbrainsMono } from "./fonts";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Frontend developer portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Verify it builds and renders**

```bash
npm run build
```

Expected: exits 0. (A visual check of fonts/colors happens once `shared/ui` primitives exist in Task 5-6.)

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add SCSS design tokens and next/font setup"
```

---

### Task 5: `shared/ui/button` primitive

**Files:**
- Create: `src/shared/ui/button/button.tsx`
- Create: `src/shared/ui/button/button.module.scss`
- Create: `src/shared/ui/button/index.ts`
- Test: `src/shared/ui/button/button.test.tsx`

**Interfaces:**
- Produces: `Button` component, `import { Button } from "@/shared/ui/button"`, props `{ variant?: "primary" | "secondary"; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders its children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies the secondary variant class when requested", () => {
    render(<Button variant="secondary">Cancel</Button>);
    expect(screen.getByRole("button", { name: "Cancel" }).className).toMatch(/secondary/);
  });
});
```

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/shared/ui/button/button.test.tsx`
Expected: FAIL — `Cannot find module './button'` (file doesn't exist yet).

- [ ] **Step 3: Implement the component**

`src/shared/ui/button/button.tsx`:

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.scss";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;

  return (
    <button
      className={[styles.button, variantClass, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
```

`src/shared/ui/button/button.module.scss`:

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
  background: linear-gradient(135deg, var(--color-accent-start), var(--color-accent-end));
  color: var(--color-bg);

  &:hover {
    filter: brightness(1.05);
  }
}

.secondary {
  background: transparent;
  border-color: var(--color-border);
  color: var(--color-text);

  &:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
}
```

`src/shared/ui/button/index.ts`:

```typescript
export { Button } from "./button";
```

- [ ] **Step 4: Run and verify it passes**

Run: `npx vitest run src/shared/ui/button/button.test.tsx`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add shared/ui Button primitive"
```

---

### Task 6: `shared/ui/container` primitive

**Files:**
- Create: `src/shared/ui/container/container.tsx`
- Create: `src/shared/ui/container/container.module.scss`
- Create: `src/shared/ui/container/index.ts`
- Test: `src/shared/ui/container/container.test.tsx`

**Interfaces:**
- Produces: `Container` component, `import { Container } from "@/shared/ui/container"`, props `{ as?: ElementType; children: ReactNode } & HTMLAttributes<HTMLElement>`.

- [ ] **Step 1: Write the failing test**

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Container } from "./container";

describe("Container", () => {
  it("renders children inside a div by default", () => {
    render(<Container>content</Container>);
    const el = screen.getByText("content");
    expect(el.tagName).toBe("DIV");
  });

  it("renders as a custom element via the `as` prop", () => {
    render(<Container as="section">content</Container>);
    const el = screen.getByText("content");
    expect(el.tagName).toBe("SECTION");
  });
});
```

- [ ] **Step 2: Run and verify it fails**

Run: `npx vitest run src/shared/ui/container/container.test.tsx`
Expected: FAIL — `Cannot find module './container'`.

- [ ] **Step 3: Implement the component**

`src/shared/ui/container/container.tsx`:

```tsx
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import styles from "./container.module.scss";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({ as: Component = "div", className, children, ...props }: ContainerProps) {
  return (
    <Component className={[styles.container, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </Component>
  );
}
```

`src/shared/ui/container/container.module.scss`:

```scss
.container {
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: var(--space-4);

  @media (min-width: 768px) {
    padding-inline: var(--space-8);
  }
}
```

`src/shared/ui/container/index.ts`:

```typescript
export { Container } from "./container";
```

- [ ] **Step 4: Run and verify it passes**

Run: `npx vitest run src/shared/ui/container/container.test.tsx`
Expected: PASS, 2 tests.

- [ ] **Step 5: Run the full test suite**

Run: `npm test`
Expected: all test files pass (smoke test + Button + Container).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add shared/ui Container primitive"
```

---

### Task 7: Storybook 9 for `shared/ui`

**Files:**
- Create: `.storybook/main.ts`, `.storybook/preview.ts` (generated by `storybook init`)
- Create: `src/shared/ui/button/button.stories.tsx`
- Modify: `package.json` (scripts, devDependencies — added by `storybook init`)

**Interfaces:**
- Consumes: `Button` from Task 5.
- Produces: `npm run storybook` (dev) and `npm run build-storybook` (static build) scripts.

- [ ] **Step 1: Run the Storybook init wizard**

```bash
npx storybook@latest init --yes
```

Expected: detects Next.js, installs `@storybook/nextjs` and supporting packages, creates `.storybook/main.ts` and `.storybook/preview.ts`, adds `storybook`/`build-storybook` scripts to `package.json`. If it offers to wire up the Vitest addon for component testing, accept — if that prompt doesn't appear under `--yes`, leave it for a follow-up plan; it is not required for this task's deliverable.

- [ ] **Step 2: Remove the example stories/components it scaffolds**

```bash
rm -rf src/stories
```

(Path may differ slightly by Storybook version — remove whatever example `Button`/`Header`/`Page` story folder the init wizard created outside `src/shared`.)

- [ ] **Step 3: Write a story for the real Button**

`src/shared/ui/button/button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "shared/ui/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Primary action", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Secondary action", variant: "secondary" },
};
```

- [ ] **Step 4: Verify Storybook builds**

```bash
npm run build-storybook
```

Expected: exits 0, output ends with "Storybook \<version\> build completed" (or equivalent success message) and a `storybook-static/` directory is created.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add Storybook 9 with Button story"
```

---

### Task 8: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`
- Modify: `package.json` (add `typecheck` script)

**Interfaces:**
- Consumes: `lint`, `format:check`, `test`, `build` scripts from Tasks 2/3/1, plus a new `typecheck` script defined in this task.

- [ ] **Step 1: Add the typecheck script**

Add to `package.json` scripts:

```json
"typecheck": "tsc --noEmit"
```

- [ ] **Step 2: Verify every script passes locally before wiring CI**

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
```

Expected: every command exits 0.

- [ ] **Step 3: Write the workflow**

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20.9.0
          cache: npm
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run format:check
      - run: npm test
      - run: npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "ci: add GitHub Actions quality workflow"
```

---

### Task 9: Push and verify the Vercel deploy (requires your go-ahead)

**⚠ STOP before this task.** Every prior task is local and reversible. This task pushes to a remote repository and triggers a real deploy on the existing Vercel project "Portfolio" — visible outside your machine. Whoever executes this plan (you, or an agent under subagent-driven-development) should confirm with you before running Step 1, not push automatically.

**Files:** none (infra verification only).

- [ ] **Step 1: Confirm the remote is set**

```bash
git remote -v
```

If empty, you'll need to add the GitHub remote tied to the Vercel "Portfolio" project (`git remote add origin <url>`) before continuing — get the exact URL from the Vercel project's Git settings.

- [ ] **Step 2: Push**

```bash
git push -u origin main
```

- [ ] **Step 3: Verify GitHub Actions is green**

Check the "Actions" tab of the GitHub repo for the `CI` workflow run triggered by the push. Expected: all steps (typecheck/lint/format:check/test/build) pass.

- [ ] **Step 4: Verify the Vercel deploy**

Check the Vercel dashboard for the "Portfolio" project. Expected: a new deployment triggered by the push, status "Ready", and the deployed URL renders the (currently empty/placeholder) homepage from Task 4's layout without errors.

- [ ] **Step 5: Report back**

Confirm to your collaborator that CI is green and the deploy is live — this closes out the Foundation plan. Next plans (content layer + case pages, contact form, animations, i18n, AI chat) start from here.
