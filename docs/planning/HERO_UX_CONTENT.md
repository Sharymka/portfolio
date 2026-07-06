# Hero UX and Content

This document defines the meaning, content, and UX intent of the first screen of the Portfolio MVP.

It does not define implementation, React components, layout code, Tailwind classes, or animations.

## Task

TASK-008 - Hero UX & Content

Goal: design the Hero as the first semantic screen of the Portfolio. The Hero must explain who the developer is, what she does, what value she can bring to a team, and why the viewer should continue.

## Source Context

This Hero direction is based on:

- `docs/ai/AGENTS.md`;
- `docs/planning/MCP.md`;
- `docs/design/DESIGN_BIBLE.md`;
- `docs/design/PROJECT_IDENTITY.md`;
- `docs/planning/UI_LAYOUT_VISUAL_COMPOSITION.md`.

## Hero Role in the Page

The Hero is not a resume header and not a marketing billboard. It is the first trust moment.

It must make the user understand:

- this is a Frontend Developer;
- the developer thinks beyond isolated UI tasks;
- the main value is product clarity, maintainable frontend, and careful execution;
- the site is intentional, calm, modern, and worth continuing.

The Hero should not try to prove everything. Its job is to create enough clarity and interest for the next section, `What I Can Bring to a Team`.

## Required Hero Elements

1. Main headline.
2. Subtitle.
3. Short description.
4. Role text.
5. One-line stack.
6. CTA buttons.
7. Scroll indicator.
8. Photo placement.
9. First 3-second meaning.
10. Reason to continue scrolling.

## Shared Hero UX Structure

Role text:

- `Frontend Developer`

One-line stack:

- `React · TypeScript · Next.js · Tailwind CSS · FSD · AI-assisted workflow`

Primary CTA:

- `See how I work`

Secondary CTA:

- `View experience`

Scroll indicator:

- `Scroll to see how I work`

Photo placement:

- The photo is a major trust element, placed near the main text and visually close in importance to the headline.
- Desktop: photo sits opposite the text in an editorial split.
- Tablet: photo may sit beside or below the text depending on available width.
- Mobile: photo appears after the main text and before the CTA, so the user first understands the role and then sees the person.

What the user should understand in the first 3 seconds:

- She is a Frontend Developer.
- Her value is product-minded frontend work, not just layout implementation.
- The interface feels calm, premium, and intentional.

Why the user should scroll:

- The Hero creates a clear promise but leaves the practical evidence for the next section.
- The primary CTA and scroll indicator both point to the same next user need: understanding what she can bring to a team.

## Hero Variant 1: Professional

### Main Headline

Frontend developer focused on clear, maintainable product interfaces.

### Subtitle

I build frontend with structure, accessibility, and production quality in mind.

### Short Description

My work connects interface implementation with product clarity: readable UI, stable component structure, responsive behavior, and decisions a team can maintain.

### Role Text

Frontend Developer

### One-Line Stack

React · TypeScript · Next.js · Tailwind CSS · FSD · AI-assisted workflow

### CTA

- Primary: `See how I work`
- Secondary: `View experience`

### Emotion

Trust, precision, professional confidence.

### Pros

- Immediately credible for recruiters and technical reviewers.
- Clearly communicates frontend maturity.
- Low risk of sounding inflated or generic.
- Matches the restrained Powder Precision Tech tone.

### Cons

- Less emotionally distinctive than the storytelling option.
- May feel slightly formal if the photo and supporting text do not add warmth.

### Fit Score

9/10

## Hero Variant 2: Product-Focused

### Main Headline

I build frontend that makes product ideas clear, usable, and maintainable.

### Subtitle

A product-minded Frontend Developer focused on interfaces that are easy to understand, use, and evolve.

### Short Description

I care about the connection between user perception and implementation quality: clear flows, thoughtful UI structure, accessible details, and code that supports future changes.

### Role Text

Product-minded Frontend Developer

### One-Line Stack

React · TypeScript · Next.js · Tailwind CSS · FSD · AI-assisted workflow

### CTA

- Primary: `See how I work`
- Secondary: `View experience`

### Emotion

Relevance, clarity, calm confidence.

### Pros

- Strongest match for HH and recruiters because it translates frontend work into team and product value.
- Explains why the candidate matters before listing technologies.
- Feels less like a standard developer portfolio.
- Leads naturally into `What I Can Bring to a Team`.

### Cons

- Needs the next sections to provide proof, otherwise it may sound broad.
- Slightly less technical at first glance than the professional option.

### Fit Score

10/10

## Hero Variant 3: Emotional / Storytelling

### Main Headline

I turn unclear interface problems into calm, structured frontend work.

### Subtitle

Frontend development with attention to product intent, maintainable structure, and the small details users feel.

### Short Description

I like the part of frontend where uncertainty becomes a clear interface: first understanding the goal, then shaping components, states, accessibility, and responsive behavior into something the team can trust.

### Role Text

Frontend Developer

### One-Line Stack

React · TypeScript · Next.js · Tailwind CSS · FSD · AI-assisted workflow

### CTA

- Primary: `See how I work`
- Secondary: `View experience`

### Emotion

Curiosity, warmth, thoughtful confidence.

### Pros

- Most memorable and human.
- Makes the Hero feel less conventional.
- Creates a stronger narrative bridge into the development approach.

### Cons

- Recruiters may need one extra second to extract the role and value.
- Slightly more abstract than the product-focused version.
- Requires careful visual hierarchy so it does not feel poetic instead of professional.

### Fit Score

8/10

## Variant Comparison

| Variant | Best For | Main Strength | Main Risk | Fit |
| --- | --- | --- | --- | --- |
| Professional | Technical trust | Clear credibility and engineering maturity | Can feel formal | 9/10 |
| Product-Focused | HH, recruiters, hiring managers | Connects frontend to team and product value | Needs proof below | 10/10 |
| Emotional / Storytelling | Memorability and warmth | More distinctive and human | Slightly abstract | 8/10 |

## Final Recommendation

Use Variant 2: Product-Focused.

### Why It Fits HH and Recruiters

Recruiters need quick role clarity and a reason to keep the candidate in the hiring flow. This version immediately says:

- what role she fits;
- what kind of frontend work she does;
- why that work matters to a team;
- what to look for next.

It avoids a technology-first opening and speaks in outcomes: clarity, usability, maintainability.

### Why It Matches the Project Design

Powder Precision Tech is calm, light, precise, and premium. The product-focused Hero supports this because it is:

- clear without being loud;
- confident without being exaggerated;
- modern without relying on AI hype;
- elegant without becoming vague.

The text gives the visual system room to feel premium. It does not need aggressive typography or decorative effects to carry the first screen.

### Why It Does Not Sound Like a Standard Portfolio

Most portfolio Heroes lead with a name, a role, a stack, or a broad claim. This Hero leads with the value of frontend work inside a product team.

It positions the developer as someone who understands the relationship between:

- user perception;
- interface quality;
- code maintainability;
- team workflow.

That makes the page feel like a professional product presentation rather than a static CV.

### How It Leads to the Next Section

The Hero says the developer builds clear, usable, maintainable product interfaces.

The next section answers the natural follow-up:

> What does that actually give a team?

This creates a clean transition from positioning to practical value.

## Final Hero Text

### Role Text

Product-minded Frontend Developer

### Main Headline

I build frontend that makes product ideas clear, usable, and maintainable.

### Subtitle

A Frontend Developer focused on thoughtful interfaces, reliable UI structure, and implementation decisions a team can keep evolving.

### Short Description

I connect user perception with engineering quality: clear flows, accessible details, responsive behavior, and frontend architecture that supports real product work.

### One-Line Stack

React · TypeScript · Next.js · Tailwind CSS · Feature-Sliced Design · AI-assisted workflow

### CTA Buttons

- Primary: `See how I work`
- Secondary: `View experience`

### Scroll Indicator

`Scroll to see how I work`

### Photo Placement

The photo should sit as a major Hero element, not as a small avatar.

Desktop:

- Place photo opposite the text in an editorial split.
- Keep it visually close in weight to the headline.
- Use a calm professional crop with enough negative space.

Tablet:

- Keep the text first.
- Place the photo beside the text only if it remains large and readable.
- Otherwise place it below the text and above the CTA.

Mobile:

- Use order: role, headline, subtitle, short description, photo, CTA, secondary CTA, scroll indicator.
- Keep the photo large enough to create trust.
- Do not let the photo push the CTA so far down that the first screen feels unresolved.

## First-Screen UX

### First 3 Seconds

The viewer should understand:

- she is a Frontend Developer;
- her work is product-minded;
- she cares about clarity, usability, and maintainability;
- the site feels calm, premium, precise, and intentional.

### First 10 Seconds

The viewer should understand:

- the portfolio is not a standard resume export;
- the developer is presenting professional judgment, not only tools;
- the stack is modern but not the main story;
- the CTA leads into how she works and what she can bring to a team.

### After First Scroll

The viewer should expect:

- practical team value;
- evidence behind the Hero promise;
- a calm continuation rather than a sudden change in tone.

## Content Rules for Implementation

- Do not use `Ask my AI` in the Hero CTA.
- Do not overload the Hero with all skills or all proof.
- Do not add marketing claims such as "passionate", "pixel-perfect", "turn ideas into reality", or "clean code lover".
- Keep the stack as a supporting line, not a dominant visual object.
- Keep the photo human and professional, not decorative.
- Keep the Hero concise enough for mobile.
- If copy must be shortened during UI implementation, preserve role clarity and product-minded value first.

## What To Implement Next

After approval, the next implementation task should define or build:

1. Final Hero content constants or section copy source.
2. Hero responsive layout based on `docs/planning/UI_LAYOUT_VISUAL_COMPOSITION.md`.
3. Photo asset choice, crop, and accessibility alt text.
4. CTA link targets:
   - `See how I work` should move to `What I Can Bring to a Team`;
   - `View experience` should move to `Commercial Experience`.
5. Scroll indicator behavior and accessible label.
6. Mobile-first QA for text wrapping, photo scale, CTA reachability, and first-screen balance.

Do not start implementation until this Hero direction is approved.
