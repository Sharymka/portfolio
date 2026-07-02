# AGENTS.md

This is the main operating document for AI agents working on Portfolio. It is the source of truth for product intent, engineering rules, architecture constraints, and collaboration workflow.

## Project Overview

Project name: **Portfolio**

Portfolio is a modern interactive one-page application for a Frontend Developer.

This project is not an online resume. Its main goal is to demonstrate engineering thinking, architectural quality, modern frontend practices, and enough product clarity to make a recruiter or engineering leader interested in scheduling an interview.

The project is simultaneously:

- a personal professional card;
- a demonstration of code quality;
- a demonstration of modern frontend architecture;
- an example of a production-ready application;
- a demonstration of effective collaboration between a developer and AI.

## Target Audience

- HR
- Recruiters
- Team Leads
- Engineering Managers
- CTO
- Senior Frontend Developers

## Main Objectives

After viewing the site, the user should understand:

- who the developer is;
- what commercial experience the developer has;
- how the developer makes engineering decisions;
- why the developer is worth inviting to an interview.

## Tech Stack

Core stack:

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Feature-Sliced Design
- shadcn/ui
- Framer Motion
- class-variance-authority
- clsx
- tailwind-merge
- ESLint
- Prettier
- Vercel

Planned:

- Vercel AI SDK
- OpenAI API

The repository may not have every planned dependency installed yet. Documentation defines the target engineering direction; dependency installation must happen only when a task explicitly requires it.

## Architecture

The project must use Feature-Sliced Design as the main frontend architecture.

Expected layers:

- `src/app`: Next.js App Router entry points, layouts, pages, metadata, and global providers.
- `src/processes`: optional long-running cross-page flows if they appear later.
- `src/pages`: page-level composition when the project structure grows beyond the App Router files.
- `src/widgets`: large independent page blocks, such as hero, experience, approach, and AI question sections.
- `src/features`: user-facing interactions and business actions.
- `src/entities`: domain models and domain-specific UI when stable domain concepts appear.
- `src/shared`: reusable UI primitives, utilities, configuration, styles, and low-level libraries.

Rules:

- Lower layers must not import from higher layers.
- Shared code must not know about business-specific sections.
- Widgets may compose features, entities, and shared components.
- Features must contain behavior, not generic layout primitives.
- UI primitives belong in `shared/ui`.
- Cross-cutting utilities belong in `shared/lib`.
- Public APIs should be exposed through explicit `index.ts` files when a slice becomes reusable.
- Avoid premature slicing. Create a slice only when it has a clear responsibility.

## Engineering Principles

- Mobile First: design and implementation start from small screens.
- MVP First: the first goal is a complete, polished MVP, not an expanded feature set.
- Architecture First: decisions must preserve clear boundaries and maintainability.
- Production Ready: code should be deployable, readable, tested where valuable, and maintainable.
- Accessibility First: semantic markup, keyboard access, focus states, contrast, and screen-reader support are required.
- KISS: prefer simple, direct solutions.
- DRY: avoid meaningful duplication, but do not abstract too early.
- SOLID: apply component and module boundaries thoughtfully.
- YAGNI: do not build functionality that is not required for the MVP or current task.

## Code Rules

- Use TypeScript strict mode.
- Use only functional React components.
- Use modern React capabilities and current Next.js App Router conventions.
- Use semantic HTML markup.
- Implement accessibility from the beginning.
- Add `data-testid` attributes for key elements and stable user flows.
- Use Tailwind CSS only inside UI components and presentation-level modules.
- Keep components reusable and focused.
- Do not create large components. Split by responsibility when a component becomes difficult to scan.
- Prefer composition over configuration-heavy components.
- Keep business copy and UI structure easy to review.
- Avoid hidden side effects in components.
- Do not introduce global state unless the product requirement clearly needs it.

## Context7

Before using new libraries, APIs, or framework features, consult Context7 and rely on current documentation.

Use Context7 for:

- Next.js App Router APIs and conventions;
- React APIs and recommended patterns;
- Tailwind CSS syntax and configuration;
- shadcn/ui installation and component usage;
- Framer Motion APIs;
- Vercel AI SDK and OpenAI API integration;
- any dependency that is new to the project.

If Context7 is unavailable in the environment, state that clearly before proceeding and use the best available official local or vendor documentation.

## Dependencies

Any new dependency must be justified before installation.

Before adding a dependency, document:

- the problem it solves;
- why existing project tools are insufficient;
- expected impact on bundle size and maintenance;
- whether it is required for the MVP;
- alternatives considered.

Do not add dependencies for convenience only.

## Workflow

Before every implementation task:

1. Analyze the task.
2. Provide an implementation plan.
3. List files expected to be changed.
4. Wait for confirmation before editing files.

After every completed task, report:

- list of changed files;
- description of architectural decisions;
- list of new dependencies, if any;
- suggested next task.

## Project Constraints

- Do not expand the MVP structure before the MVP is complete.
- Do not add new website sections outside the approved MVP.
- Do not change architecture casually.
- Do not introduce functionality without a documented requirement.
- Documentation is the source of truth for AI-assisted development.
