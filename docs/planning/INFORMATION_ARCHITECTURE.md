# Information Architecture

This document defines the MVP page structure, user journey, and storytelling logic for Portfolio.

The page must feel like a gradual professional introduction, not a resume, a landing page, or a list of skills. Each section should answer one user question and lead naturally to the next section.

## Core Principle

The site should reveal information progressively:

1. Who is this developer and why should I pay attention?
2. What value can she bring to a team?
3. Is there real commercial experience behind that value?
4. How does she think and make engineering decisions?
5. How can I quickly learn more about the details that matter to me?

The primary users are recruiters, HR specialists, Team Leads, and Engineering Managers. They are expected to spend roughly 2-4 minutes on the site.

## MVP Page Structure

The MVP section order is fixed:

1. Hero
2. What I Can Bring to a Team
3. Commercial Experience
4. How I Approach Development
5. Ask My AI

The order must not be changed before MVP completion.

## Section Architecture

### 1. Hero

Goal: create a strong first impression and explain who the developer is within the first 5 seconds.

Primary user question:

> Who is this, and why should I keep reading?

The user should immediately see:

- the developer's name or clear professional identity;
- the Frontend Developer role;
- a concise positioning statement;
- a clear value signal focused on product quality, architecture, and maintainable frontend work;
- one primary action.

What the user should understand in the first 5 seconds:

- this is a Frontend Developer;
- the focus is broader than UI assembly;
- the developer values product clarity, architecture, and quality;
- the site is intentional and not template-based.

Desired emotion:

- calm interest;
- confidence;
- a sense of quality;
- curiosity to continue.

Composition direction:

- generous whitespace;
- strong but calm typography;
- minimal visual elements;
- the atmospheric Powder Precision Tech background may be most expressive here;
- no long biography, dense stack list, or overloaded proof.

Primary CTA:

- `Ask my AI`

Optional secondary CTA:

- `View experience`
- `See how I work`

Transition to next section:

The Hero creates interest but does not need to prove everything. The next section should answer what practical value the developer brings to a team.

### 2. What I Can Bring to a Team

Goal: translate the first impression into practical team value.

Primary user question:

> What will this person improve for our team?

Content direction:

- 3-5 value-oriented points;
- focus on outcomes rather than a raw technology list;
- explain how the developer contributes to product clarity, maintainable frontend, collaboration, accessibility, and AI-assisted development with engineering ownership.

Possible internal blocks:

- Product-minded frontend work;
- Maintainable UI architecture;
- Clear communication and collaboration;
- Quality, accessibility, and polish;
- Responsible AI-assisted workflow.

Desired emotion:

- clarity;
- trust;
- a sense of professional maturity.

CTA:

- Usually no strong CTA is needed.
- A quiet anchor-style transition may point to `Commercial Experience`.

Transition to next section:

After the value promise, the user naturally needs proof. Commercial experience should provide that evidence.

### 3. Commercial Experience

Goal: show that the promised value is grounded in real work.

Primary user question:

> Does this developer have practical commercial experience?

Content direction:

- concise experience summary;
- role or work context;
- types of tasks handled;
- collaboration and production signals;
- technologies only where they support credibility.

Possible internal blocks:

- Experience summary;
- Responsibilities;
- Evidence rows;
- Technical context.

Desired emotion:

- reliability;
- professional confidence;
- readiness to forward the candidate to a technical reviewer.

CTA:

- No heavy CTA required.
- A quiet transition may point to `How I Approach Development`.

Transition to next section:

Once experience is established, the next question is how the developer thinks and makes decisions.

### 4. How I Approach Development

Goal: reveal engineering thinking and decision-making style.

Primary user question:

> How does this developer work, and will they be reliable in a team?

Content direction:

- principles rather than slogans;
- practical decision-making;
- architecture and maintainability;
- accessibility and UI quality;
- MVP-first thinking;
- AI as support, not autopilot.

Possible internal blocks:

- Understand before building;
- Design for maintainability;
- Ship small, polished increments;
- Use AI as support, not autopilot;
- Care about accessibility and details.

Desired emotion:

- respect;
- confidence;
- interest from technical reviewers;
- a sense that the developer can be trusted with product work.

CTA:

- `Ask my AI about my experience`
- `Explore more through AI`

Transition to next section:

The user may want details without reading a long page. The AI section becomes a focused way to ask for more.

### 5. Ask My AI

Goal: provide a useful interactive way to learn more without turning the page into a long resume.

Primary user question:

> Can I quickly clarify what matters to me?

Content direction:

- short explanation of what the AI can answer;
- suggested questions;
- input or interaction area when implemented;
- clear limits and fallback states when the feature enters implementation.

Possible suggested questions:

- What frontend strengths does she bring?
- How does she approach architecture?
- What commercial experience does she have?
- Why invite her to an interview?

Desired emotion:

- modernity;
- usefulness;
- trust;
- a sense that the AI feature has product purpose.

Primary CTA:

- `Ask a question`

Transition after section:

This is the final MVP section. It should leave the user with enough confidence to continue to contact, interview invitation, or deeper review when those flows are added.

## Full User Journey

The user opens the site and sees a calm, premium, technological Hero. Within a few seconds, they understand the role, the professional positioning, and the reason to continue.

They scroll because the Hero creates curiosity without overload. The next section answers what the developer can bring to a team in practical terms.

After seeing the value proposition, the user looks for evidence. Commercial Experience confirms that the claims are grounded in real work, collaboration, and production context.

Then the user wants to understand the developer's thinking. How I Approach Development explains decision-making, architecture, quality, accessibility, and AI-assisted workflow.

Finally, Ask My AI gives the user a way to continue the conversation based on their own questions. This keeps the page concise while adding depth.

## Storytelling

The page should tell this story:

> I am a Frontend Developer who builds clear, maintainable, product-minded interfaces. Here is the value I bring to a team. Here is the commercial context behind that value. Here is how I think and make decisions. If you want to know more, ask my AI.

The story should be calm and sequential. It must not feel like self-promotion, a technology checklist, or a generic landing page.

## Why This Order Works

The section order follows the user's decision process:

1. Hero earns attention.
2. What I Can Bring to a Team explains value.
3. Commercial Experience proves credibility.
4. How I Approach Development reveals engineering maturity.
5. Ask My AI provides personalized depth without bloating the page.

This order allows the user to move from impression to trust to interaction.

## Composition Rules

- Each section should answer one primary question.
- Information should be revealed gradually.
- Avoid dense lists and overloaded proof blocks.
- Do not turn the MVP into a project gallery, resume export, or case-study page.
- Keep the experience scannable for recruiters and credible for technical reviewers.
- Hero may be the most emotional section; all following sections should be calmer.
