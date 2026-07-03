# Wireframes and Page Composition

This document defines the MVP page composition at wireframe level. It is not a visual design, component specification, or implementation plan.

Do not use this document to infer final colors, exact spacing, animations, or pixel-perfect layout. It defines structure, hierarchy, reading order, and responsive composition.

## Confirmed Composition Decisions

- The MVP uses the fixed section order from `docs/planning/INFORMATION_ARCHITECTURE.md`.
- Hero must include a photo.
- `Ask my AI` is the primary CTA only in the final Ask My AI section.
- The Hero may be the most emotional section.
- All following sections should be calmer and more structured.
- The AI section may accept arbitrary user questions in the future. The answer source, storage model, and retrieval strategy must be designed in a later AI-specific task.

## Full Page Structure

1. Hero
2. What I Can Bring to a Team
3. Commercial Experience
4. How I Approach Development
5. Ask My AI

The page should feel like a gradual introduction:

1. First impression.
2. Team value.
3. Proof through experience.
4. Engineering thinking.
5. Interactive continuation.

## Desktop Page Skeleton

```text
────────────────────────────────────────────────────────────
[ Header / identity ]                              [ links ]

[ HERO text left ]                           [ photo right ]
[ Primary CTA: See how I work ] [ Secondary CTA ]
[ Scroll to know me better ↓ ]
────────────────────────────────────────────────────────────

[ WHAT I CAN BRING TO A TEAM ]
[ intro ]
[ value rows ]
────────────────────────────────────────────────────────────

[ COMMERCIAL EXPERIENCE ]
[ summary ]
[ timeline / context ]                       [ evidence ]
────────────────────────────────────────────────────────────

[ HOW I APPROACH DEVELOPMENT ]
[ principle statement ]
[ principle rows ]
[ bridge to AI ]
────────────────────────────────────────────────────────────

[ ASK MY AI ]
[ suggested prompts / context ]              [ AI panel ]
────────────────────────────────────────────────────────────
```

## Mobile Page Skeleton

```text
────────────────────────
[ identity ]

[ Hero label ]
[ Hero title ]
[ supporting text ]
[ photo ]
[ CTA: See how I work ]
[ secondary CTA ]
[ scroll cue ↓ ]
────────────────────────

[ What I can bring ]
[ intro ]
[ value 01 ]
[ value 02 ]
[ value 03 ]
[ value 04 ]
────────────────────────

[ Commercial experience ]
[ summary ]
[ role / context ]
[ evidence rows ]
────────────────────────

[ How I approach ]
[ statement ]
[ principle 01 ]
[ principle 02 ]
[ principle 03 ]
[ principle 04 ]
────────────────────────

[ Ask my AI ]
[ explanation ]
[ input ]
[ response area ]
[ limits / note ]
────────────────────────
```

## 1. Hero

Purpose: create a strong first impression and explain who the developer is within the first 5 seconds.

Primary user question:

> Who is this, and why should I keep reading?

### Desktop Wireframe

```text
────────────────────────────────────────────────────────────
[ minimal header / identity ]                    [ nav links ]
────────────────────────────────────────────────────────────


        [ professional label ]

        [ LARGE HERO STATEMENT                  ]   [ PHOTO ]
        [ Frontend Developer focused on         ]   [       ]
        [ product clarity, architecture, quality]   [       ]

        [ supporting text ]

        [ See how I work ] [ View experience ]


        [ Scroll to know me better ↓ ]

────────────────────────────────────────────────────────────
```

### Composition

- Top: minimal identity/header.
- Left: label, headline, supporting text, CTA row.
- Right: required photo.
- Bottom: scroll cue.
- Free space: high. Hero should breathe more than any other section.

### Visual Hierarchy

1. Hero statement.
2. Photo.
3. Supporting text.
4. Primary CTA.
5. Scroll cue.

### Block Sizes

- Large: hero statement.
- Medium: photo and supporting text.
- Secondary: label, secondary CTA, scroll cue.

### User Flow

```text
identity → label → headline → photo → supporting text → page CTA → scroll cue
```

### Scroll Flow

The Hero should create interest without proving everything. The user scrolls to understand what practical value the developer brings to a team.

### Tablet

```text
────────────────────────────────
[ identity / header ]

[ label ]
[ HERO STATEMENT ]
[ supporting text ]

[ PHOTO ]

[ See how I work ] [ View experience ]

[ Scroll ↓ ]
────────────────────────────────
```

The photo may move below the text or remain in a compact two-column layout if the viewport allows it.

### Mobile

```text
────────────────────────
[ identity ]

[ label ]
[ HERO STATEMENT ]
[ supporting text ]

[ PHOTO ]

[ See how I work ]
[ secondary CTA ]

[ Scroll ↓ ]
────────────────────────
```

Mobile order prioritizes comprehension: identity, message, support, photo, action.

## 2. What I Can Bring to a Team

Purpose: translate the first impression into team value.

Primary user question:

> What will this person improve for our team?

### Desktop Wireframe

```text
────────────────────────────────────────────────────────────
[ section label ]

[ Section title: What I can bring to a team ]
[ short intro text ]

────────────────────────────────────────────────────────────
[ Value 01 ]        [ short explanation ]
────────────────────────────────────────────────────────────
[ Value 02 ]        [ short explanation ]
────────────────────────────────────────────────────────────
[ Value 03 ]        [ short explanation ]
────────────────────────────────────────────────────────────
[ Value 04 ]        [ short explanation ]
────────────────────────────────────────────────────────────

                                      [ quiet next anchor ↓ ]
────────────────────────────────────────────────────────────
```

### Composition

- Top: label, title, intro.
- Center: structured value rows.
- Bottom: quiet transition to experience.

### Visual Hierarchy

1. Section title.
2. Value labels.
3. Explanations.
4. Next anchor.

### Block Sizes

- Large: section title.
- Medium: value rows.
- Secondary: label and transition link.

### User Flow

```text
label → title → intro → value rows → next anchor
```

### Scroll Flow

After reading the value promise, the user wants proof through commercial experience.

### Tablet

```text
[ label ]
[ title ]
[ intro ]

[ Value 01 ]
[ explanation ]

[ Value 02 ]
[ explanation ]

[ Value 03 ]
[ explanation ]

[ Value 04 ]
[ explanation ]
```

### Mobile

```text
[ label ]
[ title ]
[ intro ]

[ 01 ]
[ value title ]
[ explanation ]

[ 02 ]
[ value title ]
[ explanation ]

[ 03 ]
[ value title ]
[ explanation ]

[ 04 ]
[ value title ]
[ explanation ]
```

## 3. Commercial Experience

Purpose: show that the promised value is grounded in real work.

Primary user question:

> Does this developer have practical commercial experience?

### Desktop Wireframe

```text
────────────────────────────────────────────────────────────
[ section label ]

[ Commercial Experience title ]
[ concise experience summary ]

────────────────────────────────────────────────────────────
[ timeline / period ]       [ experience details ]
[ role / context   ]        [ responsibilities   ]
                            [ production signals ]
                            [ collaboration      ]
────────────────────────────────────────────────────────────
[ evidence row 01 ]
[ evidence row 02 ]
[ evidence row 03 ]
────────────────────────────────────────────────────────────
```

### Composition

- Top: title and concise summary.
- Middle: period/role on the left, details on the right.
- Bottom: evidence rows.

### Visual Hierarchy

1. Experience title.
2. Summary.
3. Role/context.
4. Responsibilities.
5. Evidence rows.

### Block Sizes

- Large: summary.
- Medium: role/context and details.
- Secondary: technical context.

### User Flow

```text
title → summary → role/context → responsibilities → evidence
```

### Scroll Flow

Commercial experience creates credibility. The next section explains how the developer thinks and works.

### Tablet

```text
[ label ]
[ title ]
[ summary ]

[ period / role ]
[ context ]
[ responsibilities ]

[ evidence row ]
[ evidence row ]
[ evidence row ]
```

### Mobile

```text
[ label ]
[ title ]
[ summary ]

[ period ]
[ role ]
[ context ]

[ responsibility 01 ]
[ responsibility 02 ]

[ evidence 01 ]
[ evidence 02 ]
[ evidence 03 ]
```

Avoid complex mobile timelines. Use a simple vertical reading flow.

## 4. How I Approach Development

Purpose: reveal engineering thinking and decision-making style.

Primary user question:

> How does this developer work, and will they be reliable in a team?

### Desktop Wireframe

```text
────────────────────────────────────────────────────────────
[ section label ]

[ How I approach development ]
[ short principle statement ]

────────────────────────────────────────────────────────────
[ Principle 01 ]       [ explanation ]
[ Principle 02 ]       [ explanation ]
[ Principle 03 ]       [ explanation ]
[ Principle 04 ]       [ explanation ]
────────────────────────────────────────────────────────────

[ bridge to AI ]
────────────────────────────────────────────────────────────
```

### Composition

- Top: title and principle statement.
- Center: principle rows.
- Bottom: bridge to AI.

### Visual Hierarchy

1. Section title.
2. Principle statement.
3. Principle titles.
4. Bridge copy.

### Block Sizes

- Large: section title.
- Medium: principle rows.
- Secondary: bridge copy.

### User Flow

```text
title → statement → principle rows → bridge
```

### Scroll Flow

The user understands the developer's thinking and can continue to AI for specific questions.

### Tablet

```text
[ label ]
[ title ]
[ statement ]

[ Principle 01 ]
[ explanation ]

[ Principle 02 ]
[ explanation ]

[ Principle 03 ]
[ explanation ]

[ Principle 04 ]
[ explanation ]

[ bridge copy ]
```

### Mobile

```text
[ label ]
[ title ]
[ statement ]

[ 01 / principle ]
[ explanation ]

[ 02 / principle ]
[ explanation ]

[ 03 / principle ]
[ explanation ]

[ 04 / principle ]
[ explanation ]

[ bridge copy ]
```

## 5. Ask My AI

Purpose: provide an interactive continuation without turning the page into a long resume.

Primary user question:

> Can I quickly clarify what matters to me?

### Desktop Wireframe

```text
────────────────────────────────────────────────────────────
[ section label ]

[ Ask My AI title ]
[ short explanation: what it can answer ]

────────────────────────────────────────────────────────────
[ guidance / examples ]            [ AI input panel ]
[ optional prompt hints ]           [ input / textarea ]
[ limits note ]                     [ submit CTA: Ask my AI ]
                                    [ response area ]
────────────────────────────────────────────────────────────
```

### Composition

- Top: title and explanation.
- Left: guidance, optional prompt hints, limits.
- Right: AI panel.
- Bottom: calm final state.

### Visual Hierarchy

1. Ask My AI title.
2. AI input panel.
3. Guidance/examples.
4. Limits note.

### Block Sizes

- Large: AI panel.
- Medium: guidance/examples.
- Secondary: limits and fallback note.

### User Flow

```text
title → explanation → guidance → input → submit → response area
```

### Scroll Flow

This is the final MVP section. It should give completion and the ability to continue the conversation.

### Tablet

```text
[ label ]
[ title ]
[ explanation ]

[ guidance / examples ]

[ AI input panel ]
[ response area ]
[ limits note ]
```

### Mobile

```text
[ label ]
[ title ]
[ explanation ]

[ guidance ]
[ optional examples ]

[ input ]
[ submit CTA ]

[ response area ]
[ limits note ]
```

The AI feature may accept arbitrary questions. Exact answer storage, grounding content, and retrieval strategy are out of scope for wireframes.

## Composition Rationale

The section patterns are intentionally different:

- Hero: editorial split with required photo.
- What I Can Bring: structured value rows.
- Commercial Experience: timeline/context with evidence rows.
- How I Approach Development: principle rhythm.
- Ask My AI: product-like interaction.

This prevents the page from becoming a repeated card grid while keeping the story easy to follow.

## Self-Review

The story develops logically:

1. attention;
2. value;
3. proof;
4. thinking;
5. interaction.

Potential overload risks:

- Commercial Experience should not become a full resume.
- Ask My AI should not include too many helper elements before the input.
- What I Can Bring and How I Approach Development should not use identical list patterns.

Whitespace:

- Hero should have the most open space.
- Other sections should stay airy but more structured.

Contrast between blocks:

- Each section uses a distinct composition pattern.
- Repetition is controlled by shared rhythm, not identical layouts.

## Before UI Implementation

Open decisions for later tasks:

- exact Hero copy;
- exact photo asset and crop;
- final value points;
- final development principles;
- AI grounding strategy and answer source;
- contact or interview CTA after the AI section, if approved for MVP.
