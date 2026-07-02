# Project Backlog

This backlog tracks major project work. Status values are limited to `Todo`, `In Progress`, `Review`, and `Done`.

## Status Definitions

- Todo: task is known but not started.
- In Progress: task is actively being worked on.
- Review: task is implemented and awaiting review or validation.
- Done: task is complete and accepted.

## Backlog

| ID | Task | Status | Notes |
| --- | --- | --- | --- |
| T-001 | Prepare engineering documentation | Done | Source-of-truth project documents are created and organized under `docs/`. |
| T-002 | Define project structure | Done | Documentation is organized under `docs/`, and application source is placed under `src/`. |
| T-003 | Configure Feature-Sliced Design conventions | Todo | Define layers, imports, and public APIs. |
| T-004 | Add Prettier configuration | Todo | Ensure consistent formatting. |
| T-005 | Connect shadcn/ui | Todo | Add UI component foundation when implementation starts. |
| T-006 | Connect class-variance-authority, clsx, and tailwind-merge | Todo | Required for reusable variant-based UI primitives. |
| T-007 | Connect Framer Motion | Todo | Required for controlled motion design. |
| T-008 | Build shared UI primitives | Todo | Buttons, typography, containers, section wrappers, and interactive states. |
| T-009 | Implement MVP section: Greeting | Todo | First impression and identity. |
| T-010 | Implement MVP section: What I Can Bring to a Team | Todo | Team value and practical strengths. |
| T-011 | Implement MVP section: Commercial Experience | Todo | Experience summary and credibility. |
| T-012 | Implement MVP section: How I Approach Development | Todo | Engineering principles and decision-making. |
| T-013 | Define AI section behavior | Todo | Scope, prompts, boundaries, fallback states. |
| T-014 | Implement MVP section: Ask My AI | Todo | AI-assisted interaction after requirements are documented. |
| T-015 | Add accessibility review | Todo | Keyboard, focus, contrast, semantics, reduced motion. |
| T-016 | Add responsive QA | Todo | Verify mobile, tablet, and desktop layouts. |
| T-017 | Add metadata and SEO basics | Todo | Title, description, Open Graph, and basic preview quality. |
| T-018 | Prepare Vercel deployment | Todo | Configure production deployment. |
| T-019 | Perform production build validation | Todo | Ensure build and lint pass. |
| T-020 | Final MVP review | Todo | Validate product, design, architecture, and documentation alignment. |

## Development Stages

### Stage 1: Documentation and Planning

Goal: establish a single source of truth for product and engineering decisions.

Tasks:

- T-001

### Stage 2: Project Foundation

Goal: prepare the repository for scalable development.

Tasks:

- T-002
- T-003
- T-004
- T-005
- T-006
- T-007

### Stage 3: UI Foundation

Goal: create reusable building blocks before building MVP sections.

Tasks:

- T-008

### Stage 4: MVP Sections

Goal: implement the fixed MVP structure.

Tasks:

- T-009
- T-010
- T-011
- T-012
- T-013
- T-014

### Stage 5: Quality and Release

Goal: prepare the MVP for production deployment and review.

Tasks:

- T-015
- T-016
- T-017
- T-018
- T-019
- T-020
