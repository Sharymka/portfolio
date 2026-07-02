# Design Bible

This document defines the visual and interaction standards for Portfolio. All UI decisions must align with this document unless a later documented decision updates it.

## Design Philosophy

The design should express professional clarity, technical confidence, and calm precision. It must help the viewer focus on the developer's value instead of the interface decoration.

The product should feel modern and carefully built, but not flashy. Every visual element must have a purpose.

## Mood

- Modern
- Calm
- Professional
- Technological
- Minimal
- Clean
- Confident
- Not overloaded

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

- neutral base colors;
- one primary accent color;
- restrained semantic colors only when needed;
- sufficient contrast for text and interactive states.

Rules:

- Avoid one-note palettes dominated by a single hue family.
- Avoid heavy gradients as the main visual identity.
- Do not use many accent colors.
- Use color to create hierarchy and meaning, not decoration.

## Typography

Typography should feel precise, readable, and contemporary.

Rules:

- Use a clear hierarchy for headings, body text, labels, and metadata.
- Avoid oversized typography inside compact UI surfaces.
- Do not use negative letter spacing.
- Do not scale font size directly with viewport width.
- Keep line length comfortable on desktop.
- Preserve readability on mobile.

## Grid

The layout should use a simple responsive grid.

Rules:

- Use a constrained content width for readability.
- Use full-width sections only when they support hierarchy.
- Keep alignment consistent across sections.
- Avoid complex grid behavior before the MVP requires it.

## Spacing

Spacing should create calm and focus.

Rules:

- Use generous whitespace around major sections.
- Keep internal component spacing consistent.
- Avoid cramped content blocks.
- Avoid decorative empty space that weakens scanning.

## Border Radius

Border radius should be subtle.

Rules:

- Use small to medium radius for cards, panels, inputs, and buttons.
- Avoid overly rounded card-heavy visuals.
- Keep radius consistent across reusable UI primitives.

## Components

Components should be clean, reusable, and easy to inspect.

Rules:

- Use cards only for repeated items, modals, or clearly framed tools.
- Do not nest cards inside cards.
- Buttons must have clear interaction states.
- Forms and inputs must include labels or accessible names.
- Important UI elements should expose stable `data-testid` attributes.
- Components should support responsive behavior without layout shifts.

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
