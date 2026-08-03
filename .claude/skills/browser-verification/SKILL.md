---
name: browser-verification
description: "Decide whether a task needs browser verification, and if so, which tool to use — Puppeteer for cheap visual screenshots, Playwright MCP for interactive scenarios. Use before claiming any UI-affecting change is done."
---

# Browser Verification

This project's own skill for deciding **if** a change needs a real-browser check, and **which** tool to use. It does not replace `npm run dev`/`npm test`/`npm run build` — those must pass first regardless.

## Current tooling state in this project (verified, not assumed)

- **Puppeteer** — installed as a devDependency, with a helper script at `scripts/screenshot.mjs` (`npm run screenshot [-- /route]`). It only takes screenshots — desktop/tablet/mobile PNGs into `temporary-screenshots/` — it does not compare, judge, or start the dev server itself.
- **Playwright MCP** — connected and available in this session (`mcp__playwright__*` tools); `browser_take_screenshot` permission is already granted in `.claude/settings.local.json`.
- Dev server: `npm run dev` (Next.js, `http://localhost:3000`). Don't start a second instance if one is already running.

Before using either tool, confirm this section still matches reality (`cat package.json`, `ls` for scripts) — this file can go stale as the project changes.

## When browser verification is needed

Run it when the task visibly changes the rendered UI:

- layout, element sizing/positioning, spacing
- typography, color
- responsive behavior across viewports
- animation
- hover / focus / active states
- visual form state
- a new screen, section, or component
- matching a reference design or mockup
- any interface behavior that can't be reliably confirmed by reading code alone

## When to skip it

Don't launch Puppeteer or Playwright MCP for changes limited to:

- TypeScript types
- API/data-transformation layer
- server-side or business logic with no UI change
- refactors that don't change behavior or appearance
- tests, docs, config, lint/format-only changes
- renaming, internal module restructuring

## Choosing the tool

**Puppeteer — cheap visual checks, no interaction needed:**
- desktop + mobile screenshots
- spacing/typography/color/composition checks
- comparing the result against a visual reference
- checking several viewports without clicking through anything

**Playwright MCP — anything that requires interaction or is checked live in this session:**
- navigation, clicks, a user flow
- forms
- menus, modals
- keyboard navigation, focus management
- state changes after interaction
- accessibility checks that need a live DOM
- end-to-end behavior

Don't reach for Playwright MCP for a plain screenshot if a local Puppeteer script would answer the same question with far less output in context.

## Visual Review

Once a screenshot exists, decide what to do with it:

1. **Did the UI actually change?**
   - No → nothing further — don't manufacture findings from an unrelated screenshot.
   - Yes → continue.
2. **Is there a reference to match?** The reference images live in `docs/design-reference/` — captured 2026-08-03 from the live Claude Design mockup (Present mode, no editor chrome), all three breakpoints, same six sections each:
   - `desktop-*.png` (1440×900): `hero-about`, `skills`, `cases`, `think-ai`, `ai-documents`, `documents-contact-footer`
   - `tablet-*.png` (1024×768): `hero`, `skills`, `cases`, `think-ai`, `documents-contact-footer`
   - `mobile-*.png` (390×844): `hero`, `skills`, `cases`, `think`, `ai`, `documents-contact-footer`

   This is a snapshot of the *original design decision*, not always the final content (e.g. the case cards there show design-tool placeholder images, not the real screenshots from the spec) — use it for layout/spacing/typography/color, not literal pixel content.
   - The section you're checking has a matching file in that folder → **Compare** directly against it (see the reference-matching cap below).
   - It doesn't (new work beyond the original mockup, e.g. the screenshot carousel or the documents nav link) → **Evaluate** the screenshot against `docs/engineering-principles.md` (Design section) and `docs/design-principles.md` instead of against nothing.

## If the tooling isn't there when you need it

If a task needs a Puppeteer screenshot script and none exists:
- don't silently create one and start using it as if it always existed
- state plainly what's available right now (per the "Current tooling state" section above)
- propose the minimal script needed for the specific check, and confirm before adding it
- never claim a visual check happened if no tool was actually run

## Economical workflow for a visual task

1. Implement the change fully first.
2. Self-review against the code (tokens used, structure, expected classes).
3. Run one browser check.
4. Fix what it surfaces.
5. Re-check only if the fix was substantial, or the task is a reference-match (see cap below).
6. Never loop screenshots indefinitely.

For reference-matching work specifically: **at most two comparison rounds** by default. If it's not close after two rounds, stop and report the mismatch instead of continuing to iterate alone.

This skill should not fire after every small edit — before running it, decide whether the rendered UI actually changed enough to need a look.
