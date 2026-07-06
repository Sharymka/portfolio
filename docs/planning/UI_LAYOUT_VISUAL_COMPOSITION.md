# UI Layout and Visual Composition

This document defines the visual composition direction for the full Portfolio MVP page.

It does not define implementation, React components, Tailwind classes, or final copy. It describes layout intent, visual hierarchy, section rhythm, and user perception.

## Task

TASK-007 - UI Layout & Visual Composition

Goal: combine product vision, experience architecture, design bible, theme tokens, and content strategy into a single visual composition system for the MVP page.

## Source Context

This composition is based on:

- Product Vision from `docs/planning/MCP.md`;
- Experience Architecture from `docs/planning/INFORMATION_ARCHITECTURE.md`;
- Design Bible and Theme Tokens from `docs/design/DESIGN_BIBLE.md`;
- Content Strategy from `docs/planning/CONTENT_STRATEGY.md`;
- Page structure from `docs/planning/WIREFRAMES.md`.

## Non-Goals

- Do not write code.
- Do not create React components.
- Do not use Tailwind implementation details.
- Do not add sections.
- Do not change the MVP order.
- Do not create a new visual identity outside Powder Precision Tech.

## MVP Structure

The section order is fixed:

1. Hero
2. What I Can Bring to a Team
3. Commercial Experience
4. How I Approach Development
5. Ask My AI

## Overall Composition

The site should feel like a premium digital product with a calm editorial rhythm:

- Hero: expressive first impression, strong asymmetry, photo, atmosphere, and generous space.
- Team Value: structured scanning, clear value rows, restrained visual system.
- Commercial Experience: credibility through precise evidence and timeline-like rhythm.
- Development Approach: editorial explanation of principles, less visual weight than experience.
- Ask My AI: product-like final interaction, the most functional section.

The page should not feel like stacked cards. It should feel like a sequence of composed bands with distinct roles. Structure should come from alignment, whitespace, typography, thin lines, and a small number of meaningful panels.

### Page-Level Visual Rhythm

The rhythm should move from emotional to practical:

1. Slow opening: Hero gives the viewer room to understand identity and quality.
2. Faster scan: Team value section lets recruiters collect signals quickly.
3. Credibility stop: Commercial experience asks for a slightly longer pause.
4. Reflective rhythm: Development approach slows down again to show judgment.
5. Product interaction: AI section creates a controlled final action.

### Global Layout Principles

- Use one consistent content axis across sections.
- Let the Hero be wider and more atmospheric than the rest of the page.
- Keep main text within comfortable readable width.
- Use wide composition only when it helps compare information.
- Use thin blue-mist lines instead of heavy boxes.
- Use panels only for meaningful grouping, especially the AI interaction.
- Keep dominant decorative treatment limited to the Hero background atmosphere.
- Avoid repeated card grids.
- Avoid centered text as the default pattern; use it only when it improves hierarchy.

### Visual Weight Distribution

- Strongest visual weight: Hero headline and photo.
- Second strongest: AI input panel in the final section.
- Medium weight: Commercial experience summary and evidence rows.
- Light weight: Team value rows and development principles.
- Quietest elements: labels, transition anchors, metadata, scroll indicator.

## Section 1: Hero

### Composition Goal

The Hero must immediately establish professional identity, product-minded frontend value, and premium visual quality. Its layout should make the portfolio feel designed, not assembled.

The composition should answer:

> Who is this developer, and why should I keep reading?

### First-Screen Perception

First 3 seconds:

- The user sees a clear Frontend Developer identity.
- The user sees the main positioning statement.
- The user sees a human photo.
- The user feels calm, premium, precise, and modern.

After 10 seconds:

- The user understands the developer focuses on product clarity, maintainable interfaces, and engineering judgment.
- The user notices the CTA to continue through the page.
- The user understands this is not a generic resume page.

After first scroll:

- The Hero has created enough trust and curiosity for the next section to explain practical team value.
- The user should not feel that the Hero tried to prove everything.

### Visual Hierarchy

1. Main hero statement.
2. Professional photo.
3. Role label and short supporting text.
4. Primary CTA: `See how I work`.
5. Secondary CTA or quiet link: `View experience`.
6. Scroll indicator.

The headline and photo should be visually close in importance. The headline explains value; the photo adds human trust.

### Composition

Text:

- Place the main text block in the strongest reading area.
- Keep the heading large, calm, and not overly dense.
- Supporting text should sit directly below the heading and remain short.
- The role label should be small, precise, and above the heading.

Photo:

- The photo should be a major visual element, not a thumbnail.
- It should sit opposite or near the text in a way that creates tension and balance.
- The crop should feel professional, calm, and human.
- Avoid circular avatar treatment if it makes the product feel like a profile template.
- Use the photo as a trust object, not as decoration.

CTA:

- The primary CTA should sit after the supporting text.
- It should be visually available but not louder than the headline.
- The Hero must not use `Ask my AI` as the primary CTA.

Scroll Indicator:

- Place it low enough to act as a continuation cue.
- It should be subtle, precise, and calm.
- It should not compete with the CTA.

Free Space:

- Hero should have the largest amount of whitespace on the page.
- Empty space should frame the headline and photo, not separate them too far.
- The first viewport should feel open but not unfinished.

Decorative Elements:

- Use the approved atmospheric powder-blue gradient as the main background treatment.
- Use thin lines, small labels, or barely visible structural accents only if they support alignment.
- Do not use blobs, orbs, neon effects, or heavy glassmorphism.

Composition Center:

- The composition center is the relationship between the headline and the photo.
- The CTA is secondary to this center.
- The scroll indicator is tertiary.

### Element Sizes

Dominant:

- Hero headline.
- Photo.
- Atmospheric first-screen background.

Secondary:

- Supporting text.
- CTA row.

Supporting:

- Role label.
- Secondary CTA.
- Scroll indicator.
- Minimal header identity.

### Desktop Layout

Desktop should use an editorial split:

- Header sits quietly above the main Hero composition.
- Text occupies the left or slightly left-center area.
- Photo occupies the right area, large enough to be meaningful.
- The text block should not span the full width.
- CTA row sits under the supporting text.
- Scroll indicator sits near the lower portion of the first screen.

The split should not feel like a generic SaaS hero. It should be slightly editorial: spacious, asymmetric, and calm.

### Tablet Layout

Tablet may keep a two-column layout only if the photo remains large enough and the text remains readable.

Preferred tablet behavior:

- Identity/header at top.
- Text first.
- Photo below or beside the text depending on available width.
- CTA below supporting text.
- Scroll indicator below the Hero content.

The tablet composition should preserve the same reading order as mobile while allowing a more spacious photo treatment.

### Mobile Layout

Mobile is the primary design baseline.

Mobile order:

1. Identity.
2. Role label.
3. Hero statement.
4. Supporting text.
5. Photo.
6. CTA.
7. Secondary link.
8. Scroll indicator.

Mobile rules:

- The headline must be readable without awkward line breaks.
- The photo should be large enough to create trust but not push the CTA too far away.
- The CTA must remain reachable without precision input.
- Avoid a cramped first viewport; use vertical rhythm instead of squeezing everything above the fold.
- If the full photo cannot fit comfortably, prioritize a clean crop and readable text.

### Scroll Rhythm

The Hero is a slow-read section. The user should pause here.

The first scroll should reveal the next section without a harsh visual break. The transition should feel like moving from atmosphere into structure.

## Section 2: What I Can Bring to a Team

### Composition Goal

This section must convert the Hero's promise into practical team value. The layout should support fast scanning and avoid feeling like a skill checklist.

The composition should answer:

> What will this person improve for our team?

### Visual Hierarchy

1. Section title.
2. Short intro.
3. Value labels.
4. Value explanations.
5. Quiet transition to experience.

### Composition

Use structured value rows rather than a decorative card grid.

Headers:

- Section label should be quiet and precise.
- Title should be clear and slightly less emotional than the Hero.
- Intro should explain the section in one readable paragraph.

Value content:

- Each value should have a short title and a concise explanation.
- Rows may use numbering or thin separators to create rhythm.
- Avoid equal-height decorative cards unless they solve scanning.
- The section should feel organized, not boxed in.

Free Space:

- Keep generous vertical spacing between title area and value rows.
- Use enough spacing between rows to make each value distinct.
- Do not isolate every point in a large card.

Decorative Elements:

- Use thin lines, small numeric markers, or subtle accent labels.
- No illustrations are required.
- No icons unless they clarify category meaning.

### Element Sizes

Dominant:

- Section title.
- First one or two value labels during scan.

Secondary:

- Intro text.
- Value explanations.

Supporting:

- Section label.
- Numeric markers.
- Quiet transition link.

### Desktop Layout

Desktop should feel like a refined structured list:

- Title and intro sit in a readable width.
- Value rows span wider than the intro to create a product-like table rhythm.
- Each row may align value title on one side and explanation on the other.
- Thin separators provide structure.

The user should be able to scan all values quickly without reading every sentence.

### Tablet Layout

Tablet should simplify row alignment:

- Title and intro stay stacked.
- Values may remain rows if there is enough width.
- If width is tight, each value becomes a compact vertical unit.
- Preserve separator rhythm.

### Mobile Layout

Mobile should use a simple vertical sequence:

- Section label.
- Title.
- Intro.
- Value 01 title and explanation.
- Value 02 title and explanation.
- Value 03 title and explanation.
- Value 04 title and explanation.

Mobile rules:

- Avoid two-column value rows.
- Keep explanations short.
- Use numbering or small labels to make scanning easier.
- Maintain enough vertical spacing so the section does not become a text wall.

### Scroll Rhythm

This is a quick-scan section. The user should move faster than in Hero.

The section should create confidence through clarity and then point naturally toward proof in commercial experience.

## Section 3: Commercial Experience

### Composition Goal

This section must make the value claims credible. The layout should feel precise, factual, and professional without becoming a full resume.

The composition should answer:

> Is there real commercial experience behind these claims?

### Visual Hierarchy

1. Commercial experience title.
2. Concise experience summary.
3. Role, period, or context metadata.
4. Responsibilities and production signals.
5. Evidence rows.

### Composition

Use a credibility-focused composition:

- Title and summary at the top.
- Experience context presented as structured metadata.
- Responsibilities grouped by meaning.
- Evidence rows or proof statements below.

The section may use a timeline-like rhythm, but it should not become a complex timeline. Thin vertical or horizontal lines can suggest continuity and structure.

Headers:

- Title should be direct and credible.
- Summary should be more prominent than raw dates or technology labels.

Evidence:

- Evidence rows should show practical signals: production work, collaboration, UI implementation, responsive quality, accessibility attention.
- Technologies may appear as quiet metadata, not as the main story.

Free Space:

- This section can be denser than Hero but still needs breathing room.
- Use spacing to separate summary, context, and evidence.

Decorative Elements:

- Thin blue-mist lines can support timeline or evidence structure.
- Use subtle metadata badges if needed.
- Avoid heavy cards and resume-style boxes.

### Element Sizes

Dominant:

- Experience summary.
- Main role/context area.

Secondary:

- Responsibilities.
- Evidence rows.

Supporting:

- Period metadata.
- Technology context.
- Section label.

### Desktop Layout

Desktop should use a split credibility layout:

- Left side: period, role, or context metadata.
- Right side: summary, responsibilities, and production signals.
- Evidence rows sit below and may span the container.

The layout should feel like an editorial case note, not a CV table.

### Tablet Layout

Tablet should stack metadata above details:

- Section title.
- Summary.
- Period/role context.
- Responsibilities.
- Evidence rows.

Use separators to preserve structure when the layout stacks.

### Mobile Layout

Mobile should avoid complex timelines:

- Section label.
- Title.
- Summary.
- Role and period metadata.
- Responsibility groups.
- Evidence rows.

Mobile rules:

- Dates and metadata should not dominate.
- Keep responsibilities grouped into short readable chunks.
- Evidence rows should be tappable-looking only if they are actually interactive later.
- Avoid tiny columns.

### Scroll Rhythm

This is the first major trust stop after Hero. The user should slow down here.

Recruiters should get credibility quickly; technical reviewers should see enough structure to continue into the development approach.

## Section 4: How I Approach Development

### Composition Goal

This section must reveal engineering judgment and working style. It should feel thoughtful, not promotional.

The composition should answer:

> How does this developer work, and can the team trust her decisions?

### Visual Hierarchy

1. Section title.
2. Principle statement.
3. Principle titles.
4. Principle explanations.
5. Quiet bridge to AI.

### Composition

Use an editorial principle rhythm:

- A focused title and short statement introduce the approach.
- Principles follow as structured rows or compact editorial blocks.
- Each principle should pair a decision habit with a practical outcome.
- The section should feel lighter than Commercial Experience.

Headers:

- Title should be calm and confident.
- Statement should explain that good frontend starts with understanding before implementation.

Principles:

- Avoid identical visual treatment to Team Value.
- Team Value answers "what improves"; this section answers "how decisions are made".
- Use smaller headings or left-edge markers to create a reflective reading pace.

Free Space:

- Give each principle enough space to feel deliberate.
- Do not over-compress the section into a list of slogans.

Decorative Elements:

- Subtle lines or small numeric markers are enough.
- No large illustration is required.
- No strong CTA before the final AI section.

### Element Sizes

Dominant:

- Section title.
- Principle statement.

Secondary:

- Principle titles.

Supporting:

- Principle explanations.
- Bridge copy to AI.

### Desktop Layout

Desktop should use an editorial rhythm:

- Title and statement may sit in a narrow readable column.
- Principles can span wider in rows, with titles aligned separately from explanations.
- The bottom bridge should be quiet and point to the final section.

This section should not look like the Team Value section. It can use a slower, more text-led rhythm.

### Tablet Layout

Tablet should stack cleanly:

- Title.
- Statement.
- Principles as vertical units.
- Bridge copy.

Maintain generous spacing and avoid forcing side-by-side alignment.

### Mobile Layout

Mobile should be highly readable:

- Section label.
- Title.
- Statement.
- Principle 01 title and explanation.
- Principle 02 title and explanation.
- Principle 03 title and explanation.
- Principle 04 title and explanation.
- Bridge copy.

Mobile rules:

- Use short paragraphs.
- Keep principle headings visible during scroll.
- Avoid small text-heavy blocks.
- Let the user read at a reflective pace.

### Scroll Rhythm

This is a medium-slow section. The user should pause on the principle statement and then scan principles.

The section should create readiness for the AI interaction: "I understand how she thinks; now I can ask specific questions."

## Section 5: Ask My AI

### Composition Goal

This section must feel like a useful product feature and the final primary action of the MVP. It should be interactive in perception, precise, and trustworthy.

The composition should answer:

> Can I quickly clarify what matters to me?

### Visual Hierarchy

1. Ask My AI title.
2. AI input panel.
3. Suggested questions.
4. Response area.
5. Limits or grounding note.

The input panel should become the strongest visual element after the Hero.

### Composition

Use a product-like composition:

- Title and explanation establish purpose.
- Suggested questions help users start.
- Input panel provides the primary interaction.
- Response area sits near the input so the cause and result are clear.
- Limits note stays visible but quiet.

Panel:

- This is the best place for a meaningful panel.
- Use a light porcelain surface, subtle border, and precise internal spacing.
- The panel should feel functional, not decorative.

Suggested Questions:

- Show a small curated set.
- They should feel like recruiter-useful prompts, not marketing chips.
- Do not overcrowd the area with too many prompts.

CTA:

- Submit CTA is `Ask my AI`.
- It is the only place where `Ask my AI` acts as the primary CTA.

Free Space:

- Use enough whitespace around the panel to make it feel important.
- The section should feel like a final destination, not another text block.

Decorative Elements:

- Slightly stronger technical signal is allowed through mono labels, input states, and response structure.
- Avoid chatbot gimmicks, avatars, or animated decoration.

### Element Sizes

Dominant:

- AI input panel.
- Section title.

Secondary:

- Suggested questions.
- Response area.

Supporting:

- Explanation.
- Limits note.
- Fallback state.

### Desktop Layout

Desktop should use a balanced product layout:

- Left side: title, explanation, guidance, suggested questions.
- Right side: AI panel with input, submit CTA, and response state.
- The panel may be visually larger than the guidance block.

The section should feel like a composed tool at the end of the page.

### Tablet Layout

Tablet should stack the experience while preserving product hierarchy:

- Title and explanation.
- Suggested questions.
- AI panel.
- Response state.
- Limits note.

The panel should remain visually distinct and easy to use.

### Mobile Layout

Mobile should prioritize interaction:

- Section label.
- Title.
- Explanation.
- 2-4 suggested questions.
- Input.
- Submit CTA.
- Response area.
- Limits note.

Mobile rules:

- Input and CTA must be easy to tap.
- Suggested questions should not push the input too far down.
- The response area should not create layout confusion if empty.
- The limits note should be readable but secondary.

### Scroll Rhythm

This is the final destination section. The user should slow down, interact, or leave with a clear impression.

The section should close the page with usefulness, not with a marketing flourish.

## Desktop Layout Summary

Desktop composition should feel spacious and editorial:

1. Hero: asymmetric split with large text and meaningful photo.
2. Team Value: structured wide rows for fast scanning.
3. Commercial Experience: credibility split with metadata and evidence.
4. Development Approach: editorial principle rhythm.
5. Ask My AI: product-like two-part composition with a strong interaction panel.

Desktop should use wide containers only where they support comparison or product interaction. Text-heavy content should stay readable and not stretch across the page.

## Tablet Layout Summary

Tablet composition should prioritize clean stacking and selective two-column behavior:

1. Hero: text first, photo near it; two-column only when comfortable.
2. Team Value: rows may remain if readable, otherwise stack.
3. Commercial Experience: context metadata above detail.
4. Development Approach: stacked principle units.
5. Ask My AI: guidance followed by panel.

Tablet should avoid awkward compressed columns. It should feel like a generous mobile-expanded layout rather than a reduced desktop layout.

## Mobile Layout Summary

Mobile is the baseline composition.

Global mobile order:

1. Identity and Hero positioning.
2. Photo as trust signal.
3. Page CTA.
4. Team value scan.
5. Commercial proof.
6. Development principles.
7. AI interaction.

Mobile rules:

- Use a single-column reading flow.
- Keep headings strong but not oversized.
- Preserve generous section spacing.
- Use separators instead of large cards.
- Keep interactive targets large enough for touch.
- Avoid hiding essential information behind desktop-only layouts.
- Do not make the Hero feel like a squeezed desktop split.

## Scroll Rhythm

The full page should have this rhythm:

1. Hero: pause and feel.
2. Team Value: scan and understand.
3. Commercial Experience: stop and trust.
4. Development Approach: read and evaluate.
5. Ask My AI: interact or clarify.

Transitions:

- Hero to Team Value: atmosphere to structure.
- Team Value to Commercial Experience: promise to proof.
- Commercial Experience to Development Approach: proof to judgment.
- Development Approach to Ask My AI: judgment to personalized exploration.

The site should create a clear desire to continue scrolling because each section leaves one natural question open for the next section.

## Decision Rationale

Hero as the most expressive section:

- The first screen must create emotional interest and professional trust.
- A strong photo/headline relationship makes the site more memorable than a text-only portfolio.

Structured rows instead of card grids:

- Rows feel more precise, less template-like, and easier to scan.
- The project explicitly avoids card-heavy landing-page structure.

Commercial Experience as the credibility stop:

- Recruiters need evidence after the value promise.
- Technical reviewers need professional context before evaluating approach.

Development Approach as editorial rhythm:

- Engineering maturity is better shown through decisions and principles than through decorative blocks.
- A quieter layout supports thoughtful reading.

AI as the final product-like section:

- It gives the portfolio a memorable interactive moment.
- Placing it last prevents the AI feature from overshadowing frontend credibility.

Mobile-first stacking:

- The core story must work without desktop composition.
- Mobile users should get the same progression: identity, value, proof, judgment, interaction.

## Visual Risks and Controls

Risk: The page becomes too minimal and feels empty.

Control:

- Use strong hierarchy, meaningful photo scale, precise separators, and varied section rhythms.

Risk: The page becomes a generic SaaS landing page.

Control:

- Avoid oversized marketing hero cliches, repeated cards, icon grids, and vague claims.

Risk: Sections repeat the same row pattern.

Control:

- Team Value uses fast structured rows.
- Commercial Experience uses evidence and metadata rhythm.
- Development Approach uses editorial principles.
- AI uses a functional panel.

Risk: The AI section feels like a gimmick.

Control:

- Keep it grounded, useful, and final.
- Use recruiter-relevant prompts and visible boundaries.

Risk: Mobile becomes too long.

Control:

- Keep copy concise.
- Use clear headings, separators, and short blocks.
- Limit suggested AI prompts.

## Final Self-Review

Is the first screen expressive enough?

- Yes. The Hero relies on the relationship between a strong value statement, a meaningful photo, atmosphere, and whitespace. It should feel premium without becoming loud.

Is there a unified visual rhythm?

- Yes. The page moves from atmospheric to structured to credible to reflective to interactive.

Are composition techniques repeated too much?

- No. Rows, evidence structure, editorial principles, and product panel each serve different content roles. Thin lines and spacing unify them without making sections identical.

Is there enough air?

- Yes. Hero gets the most whitespace, and all later sections preserve generous spacing while becoming more structured.

Does the composition match the Design Bible?

- Yes. It follows Powder Precision Tech, mobile-first layout, restrained motion, thin blue-mist structure, minimal decoration, and no card-heavy landing-page behavior.

Does the site create a desire to continue viewing?

- Yes. Each section answers one question and opens the next: identity leads to value, value leads to proof, proof leads to judgment, judgment leads to AI clarification.

## Recommendations Before UI Implementation

Before implementing UI, confirm:

- final Hero concept and exact Hero text direction;
- approved photo asset and crop direction;
- final value points for the Team Value section;
- confirmed commercial experience facts and public-safe wording;
- final development principles;
- AI panel states: empty, loading, answered, error, unavailable;
- exact mobile section spacing and heading scale during design QA;
- whether the existing wireframes should be updated to reflect this visual composition document.

After confirmation, implementation should proceed section by section, starting from mobile composition and then enhancing tablet and desktop layouts.
