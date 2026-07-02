# Portfolio

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Status](https://img.shields.io/badge/Status-MVP_in_Progress-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Portfolio is a modern interactive one-page application for a Frontend Developer.

It is not an online resume. The goal is to demonstrate engineering thinking, frontend architecture, production-ready practices, and clear professional value for recruiters, team leads, engineering managers, CTOs, and senior frontend developers.

## Goals

- Present the developer clearly and professionally.
- Show commercial experience and team value.
- Demonstrate architecture and frontend quality through the product itself.
- Communicate how engineering decisions are made.
- Use AI-assisted development as a visible but controlled part of the process.
- Create enough confidence for an interview invitation.

## MVP Features

The MVP structure is fixed:

1. Greeting
2. What I Can Bring to a Team
3. Commercial Experience
4. How I Approach Development
5. Ask My AI

No additional website sections should be added before the MVP is complete.

## Tech Stack

Core:

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

## Development Principles

- Mobile First
- MVP First
- Architecture First
- Production Ready
- Accessibility First
- KISS
- DRY
- SOLID
- YAGNI

## Project Structure

The project is expected to follow Feature-Sliced Design as it grows:

```txt
portfolio/
├── docs/
│   ├── architecture/
│   │   └── TDL.md
│   ├── design/
│   │   ├── DESIGN_BIBLE.md
│   │   └── PROJECT_IDENTITY.md
│   ├── planning/
│   │   ├── MCP.md
│   │   ├── TASKS.md
│   │   └── SPRINT.md
│   └── ai/
│       └── AGENTS.md
├── src/
├── public/
├── README.md
├── package.json
└── ...
```

Layer responsibilities:

- `src/app`: Next.js App Router entry points, layouts, metadata, and providers.
- `widgets`: large independent page sections.
- `features`: user-facing interactions and business actions.
- `entities`: stable domain concepts when they appear.
- `shared`: reusable UI, utilities, configuration, and low-level libraries.

## Workflow

Before implementation tasks:

1. Analyze the task.
2. Prepare an implementation plan.
3. List files expected to change.
4. Wait for confirmation.

After implementation tasks:

- report changed files;
- explain architectural decisions;
- list new dependencies, if any;
- suggest the next task.

## Documentation

Project documentation is the source of truth for development:

- `docs/ai/AGENTS.md`: rules for AI agents, architecture, workflow, and engineering standards.
- `docs/planning/MCP.md`: Master Construction Plan with product vision, MVP, metrics, and roadmap.
- `docs/architecture/TDL.md`: Technical Decision Log using ADR-style decisions.
- `docs/design/DESIGN_BIBLE.md`: design philosophy, visual system, motion, and accessibility rules.
- `docs/design/PROJECT_IDENTITY.md`: intended product feeling and professional identity.
- `docs/planning/TASKS.md`: project backlog and development stages.
- `docs/planning/SPRINT.md`: Sprint 1 scope and Definition of Done.

## AI Assisted Development

This project intentionally uses AI as an engineering assistant.

AI may help with:

- planning;
- documentation;
- implementation drafts;
- refactoring suggestions;
- review support;
- quality checks.

AI does not replace engineering ownership. Architecture, dependency choices, product direction, code quality, accessibility, and deployment readiness remain the developer's responsibility.

Before using new libraries or APIs, current documentation should be checked through Context7 when available.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the local application:

```txt
http://localhost:3000
```

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## Deployment

The project is intended to be deployed on Vercel.

Deployment requirements:

- production build passes;
- required environment variables are configured;
- AI-related secrets are stored only on the server side;
- documentation and implementation remain aligned.

## Status

Current status: **MVP in Progress**

The current priority is preparing the project foundation and documentation before implementing the MVP interface.
