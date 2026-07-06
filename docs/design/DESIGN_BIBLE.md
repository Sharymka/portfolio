# Design Bible

This document defines the visual and interaction standards for Portfolio. All UI decisions must align with this document unless a later documented decision updates it.

## Design Philosophy

The design should express professional clarity, technical confidence, and calm precision. It must help the viewer focus on the developer's value instead of the interface decoration.

The product should feel modern and carefully built, but not flashy. Every visual element must have a purpose.

## Approved Visual Concept

The approved design concept is **Powder Precision Tech**.

Formula:

> Powder-white premium interface + light lavender-pink atmospheric gradient + deep ink typography + restrained violet accent + soft glass surfaces + precise product motion.

This concept keeps the product light, calm, elegant, modern, and technological without relying on dark UI, neon, cyberpunk aesthetics, heavy glassmorphism, or generic developer-portfolio visuals.

The interface should feel like a premium digital product: precise, airy, composed, and technically credible.

## Mood

- Modern
- Calm
- Professional
- Technological
- Minimal
- Clean
- Confident
- Not overloaded
- Powder-light
- Elegant
- Precise

## Emotional Goals

The interface should create a quiet emotional pull. It must remain minimal, but it should not feel empty, generic, or emotionally flat.

After opening the site, the viewer should feel:

- calm;
- confident in the developer's quality;
- a sense of care and attention to detail;
- professional trust;
- subtle curiosity to continue reading;
- that the product was designed intentionally, not assembled from a template.

The interface must not feel:

- boring;
- faceless;
- corporate;
- template-like;
- cold;
- overloaded.

Minimalism should be used as a sign of control and confidence. Empty space must support rhythm, hierarchy, and attention rather than becoming unused blankness.

## Brand Personality

Portfolio should feel like a person with a clear professional character:

- calm;
- confident;
- modern;
- curious;
- engineering-minded;
- open;
- attentive to details;
- precise without being rigid;
- warm without being informal.

The product should avoid marketing cliches. It should communicate through clarity, restraint, and good judgment.

## First Impression

In the first 10 seconds, the site should feel:

- modern;
- unusual enough to be memorable;
- accurate;
- premium;
- technological;
- calm;
- easy to understand.

It should not look:

- ornate;
- overloaded;
- too experimental;
- visually loud;
- like a typical developer portfolio template.

## UX Principles

- Prioritize clarity over novelty.
- Make the first screen immediately explain the developer's identity and value.
- Support scanning for recruiters.
- Provide enough depth for technical reviewers.
- Keep interactions predictable.
- Use motion to guide attention, not to impress.
- Avoid unnecessary choices.

## Mobile First

The interface must be designed from mobile upward.

Rules:

- Core content must be readable on small screens.
- Important actions must be reachable without precision input.
- Layouts should progressively enhance for tablet and desktop.
- Mobile spacing must remain generous but efficient.
- No desktop-only content may be required to understand the product.

## Color System

The color system should use:

- powder-white and porcelain base colors;
- a very light lavender-pink atmospheric background gradient;
- a barely visible pearl-powder warmth in surfaces and highlights;
- deep ink text colors;
- one restrained violet primary accent;
- thin lavender-mist structural lines;
- restrained semantic colors only when needed;
- sufficient contrast for text and interactive states.

Rules:

- Avoid one-note palettes dominated by a single hue family.
- Avoid gray as the emotional foundation of the product.
- Avoid beige, cream, tan, or sandy palettes as the warmth mechanism.
- Add warmth through very low-chroma pearl, powder, and soft blush undertones.
- Use the background gradient as atmosphere, not decoration.
- Avoid heavy, saturated, or visually loud gradients.
- Do not use many accent colors.
- Use color to create hierarchy and meaning, not decoration.
- Do not use neon, acid colors, or cyberpunk color combinations.
- Do not use dark backgrounds as the primary visual identity.

The palette should feel less cold than a typical SaaS interface. The warmth must be subtle: it should make the interface feel more premium and human without changing the concept into beauty, fashion, beige editorial, or lifestyle branding.

### Theme Tokens v1

Approved core palette:

| Token | Value | Role |
| --- | --- | --- |
| `--background` | `#E5DFFB` | Main lavender-powder page background |
| `--foreground` | `#181D36` | Primary deep ink text |
| `--surface` | `rgba(255, 255, 255, 0.45)` | Frosted porcelain surface |
| `--surface-soft` | `#F4ECFC` | Soft lavender surface |
| `--surface-warm` | `#FBD2F7` | Pearl-pink highlight surface |
| `--muted` | `#F0E8FE` | Secondary quiet areas |
| `--muted-foreground` | `#3E3C59` | Secondary readable text |
| `--border` | `rgba(255, 255, 255, 0.6)` | Thin soft-glass lines |
| `--border-strong` | `#C8B6F0` | Active or emphasized borders |
| `--primary` | `#8B55DE` | Restrained violet primary accent |
| `--primary-foreground` | `#FFFFFF` | Text on primary surfaces |
| `--primary-soft` | `#E9E2FE` | Soft primary hover or accent surface |
| `--accent` | `#B65AD0` | Quiet purple-pink accent |
| `--accent-soft` | `#F8E8FC` | Pale pink-lavender accent background |
| `--ring` | `rgba(139, 85, 222, 0.25)` | Focus ring color |
| `--destructive` | `oklch(0.58 0.13 25)` | Muted dusty-rose destructive color |

Approved background gradient:

```css
linear-gradient(
  135deg,
  #E5DFFB 0%,
  #E9E2FE 25%,
  #F0E8FE 55%,
  #FBD2F7 100%
)
```

Hero gradient accent for the words `clear`, `usable`, and `maintainable`:

```css
linear-gradient(
  90deg,
  #7252D8 0%,
  #8C55DC 38%,
  #B65AD0 72%,
  #D36AC8 100%
)
```

The gradient must remain light, warm, and atmospheric. Do not add decorative blobs, gradient orbs, or bokeh-style elements.

## Typography

Typography should feel precise, readable, and contemporary.

Rules:

- Use a clear hierarchy for headings, body text, labels, and metadata.
- Avoid oversized typography inside compact UI surfaces.
- Do not use negative letter spacing.
- Do not scale font size directly with viewport width.
- Keep line length comfortable on desktop.
- Preserve readability on mobile.
- Avoid heavy weights above `600` unless a specific accessibility or hierarchy reason requires it.
- Use mono typography only for technical labels, metadata, code-like values, and the AI section when it improves clarity.

### Font Pair Review

All considered font pairs must be free, web-ready, available through Google Fonts, and support both Cyrillic and Latin.

| Pair | Emotion | Fit |
| --- | --- | --- |
| `Manrope` + `IBM Plex Mono` | Soft, premium, contemporary, calm | Best balance for Powder Precision Tech: Manrope brings elegance and warmth, while IBM Plex Mono keeps the technical signal precise. |
| `Onest` + `JetBrains Mono` | Modern, friendly, product-like | Strong for a clean digital product, but slightly more casual and less premium than Manrope. |
| `Commissioner` + `Roboto Mono` | Structured, rational, confident | Good engineering clarity, but can feel more institutional and less emotionally distinctive. |
| `Golos Text` + `IBM Plex Mono` | Clear, trustworthy, Cyrillic-native | Very readable and practical, but less memorable for a premium portfolio identity. |

Approved direction: **Manrope + IBM Plex Mono**.

Manrope should be used for headings, body copy, buttons, and general UI. It gives the interface a softer premium digital feeling while staying precise and readable. IBM Plex Mono should be used sparingly for technical labels, metadata, stack details, and the AI section when a stronger engineering signal is useful.

### Typography Tokens v1

Approved font direction:

| Token | Font |
| --- | --- |
| `--font-sans` | `Manrope` |
| `--font-heading` | `Manrope` |
| `--font-mono` | `IBM Plex Mono` |

Approved type scale:

| Token | Size / Line-height / Weight | Use |
| --- | --- | --- |
| `display` | `56px / 1.05 / 500` | Desktop hero headline |
| `display-mobile` | `40px / 1.08 / 500` | Mobile hero headline |
| `h1` | `48px / 1.1 / 500` | Large page-level heading |
| `h2` | `32px / 1.18 / 500` | MVP section headings |
| `h3` | `22px / 1.3 / 500` | Block headings |
| `body-lg` | `18px / 1.7 / 400` | Lead text |
| `body` | `16px / 1.7 / 400` | Primary body text |
| `body-sm` | `14px / 1.6 / 400` | Secondary text |
| `label` | `13px / 1.3 / 500` | Buttons, labels, compact UI |
| `meta` | `12px / 1.4 / 500` | Technical metadata and mono labels |

## Grid

The layout should use a simple responsive grid.

Rules:

- Use a constrained content width for readability.
- Use full-width sections only when they support hierarchy.
- Keep alignment consistent across sections.
- Avoid complex grid behavior before the MVP requires it.

### Layout Tokens v1

| Token | Value |
| --- | --- |
| `container-narrow` | `720px` |
| `container-default` | `1120px` |
| `container-wide` | `1280px` |
| `content-readable` | `680px` |

Main body copy should stay within a comfortable readable width. Wider containers may be used for section composition, structured rows, and the AI interface.

## Spacing

Spacing should create calm and focus.

Rules:

- Use generous whitespace around major sections.
- Keep internal component spacing consistent.
- Avoid cramped content blocks.
- Avoid decorative empty space that weakens scanning.

### Spacing Tokens v1

| Token | Value |
| --- | --- |
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `20px` |
| `space-6` | `24px` |
| `space-8` | `32px` |
| `space-10` | `40px` |
| `space-12` | `48px` |
| `space-16` | `64px` |
| `space-20` | `80px` |
| `space-24` | `96px` |
| `space-32` | `128px` |

Approved section rhythm:

| Token | Value |
| --- | --- |
| `section-y-mobile` | `64px` |
| `section-y-tablet` | `80px` |
| `section-y-desktop` | `112px` |
| `hero-y-mobile` | `96px` |
| `hero-y-desktop` | `144px` |

## Border Radius

Border radius should be subtle.

Rules:

- Use small to medium radius for cards, panels, inputs, and buttons.
- Avoid overly rounded card-heavy visuals.
- Keep radius consistent across reusable UI primitives.
- Avoid excessive pill-shaped UI unless the component role clearly calls for it.

### Radius Tokens v1

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | `6px` | Badges and small controls |
| `radius-md` | `10px` | Buttons and inputs |
| `radius-lg` | `14px` | Panels |
| `radius-xl` | `18px` | Large surfaces, used sparingly |

## Borders and Shadows

Depth should primarily come from spacing, color surfaces, and thin borders rather than heavy shadows.

Approved tokens:

| Token | Value |
| --- | --- |
| `border-subtle` | `1px solid var(--border)` |
| `border-strong` | `1px solid var(--border-strong)` |
| `shadow-soft` | `0 18px 60px oklch(0.52 0.095 220 / 0.08)` |
| `shadow-focus` | `0 0 0 3px oklch(0.68 0.08 220 / 0.22)` |

Rules:

- Use shadows rarely.
- Do not create a card-heavy landing page look.
- Prefer soft lavender-mist or frosted-white borders for structure.

## Components

Components should be clean, reusable, and easy to inspect.

Rules:

- Use cards only for repeated items, modals, or clearly framed tools.
- Do not nest cards inside cards.
- Buttons must have clear interaction states.
- Forms and inputs must include labels or accessible names.
- Important UI elements should expose stable `data-testid` attributes.
- Components should support responsive behavior without layout shifts.

### Component Direction v1

Buttons:

- Primary buttons use the restrained violet primary accent.
- Secondary buttons use porcelain surfaces with lavender-mist or frosted-white borders.
- Ghost buttons stay quiet and use `--primary-soft` or `--accent-soft` on hover.
- Focus states must be visible and aligned with `--ring`.

Panels:

- Use `--surface`, subtle borders, and `radius-lg`.
- Avoid heavy shadows.
- Use panels for meaningful grouping, not decoration.

Badges:

- Use pale accent surfaces.
- Keep labels compact and precise.
- Mono typography may be used for technical badges.

Inputs:

- Use porcelain surfaces and subtle borders.
- Use `--ring` for focus states.
- Placeholder text should use muted foreground color.

## Icons

Icons should clarify actions or categories.

Rules:

- Prefer lucide-style icons when an icon system is added.
- Do not use icons as decoration without meaning.
- Pair unfamiliar icons with accessible labels or tooltips.
- Keep icon weight and size consistent.

## Motion Design

Motion should be calm, smooth, and purposeful.

Rules:

- Use subtle entrances, transitions, and feedback.
- Avoid aggressive parallax, complex scroll hijacking, or distracting loops.
- Respect reduced motion preferences.
- Do not use motion to hide weak layout or unclear content.
- Framer Motion should be used only where it adds meaningful control.

### Motion Tokens v1

| Token | Value |
| --- | --- |
| `duration-fast` | `140ms` |
| `duration-base` | `220ms` |
| `duration-slow` | `420ms` |
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `ease-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `stagger-sm` | `60ms` |

Rules:

- Hover and focus transitions should feel quick and precise.
- Section reveals should use soft fade and slight movement only.
- The AI section may use slightly more product-like state transitions.
- Avoid parallax, scroll hijacking, bouncing, and decorative looping motion.

## Accessibility

Accessibility is a baseline requirement.

Rules:

- Use semantic HTML.
- Maintain keyboard navigation.
- Provide visible focus states.
- Ensure sufficient contrast.
- Respect reduced motion settings.
- Avoid content that depends only on color.
- Keep interactive targets usable on touch devices.

## UI Principles

- Modern minimalism.
- One accent color.
- Large amount of free space.
- No visual noise.
- No heavy shadows.
- No 3D in the MVP.
- No unnecessary decorative elements.
- No generic landing-page fluff.
- No sections outside the approved MVP.
- The interface should look engineered, not generated.

## MVP Section Treatment

Hero is the only place where the interface may be slightly more emotional. It should create a strong first impression through composition, spacing, typography, and the atmospheric gradient. All following sections must be visually calmer so the page has a clear hierarchy and does not become uniformly expressive.

| Section | Visual Treatment |
| --- | --- |
| Greeting | Most spacious section, atmospheric gradient, strong but calm typography |
| What I Can Bring to a Team | Structured rows or compact panels, not a card grid |
| Commercial Experience | Timeline or evidence rows with thin lavender-mist lines |
| How I Approach Development | Editorial rhythm with clear principles |
| Ask My AI | Most product-like block, light panel, precise states, restrained technology signal |
