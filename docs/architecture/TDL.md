# Technical Decision Log

This document records technical decisions using an ADR-style format. Each decision should remain concise, traceable, and useful for future contributors and AI agents.

## ADR-001: Use Next.js

Status: Accepted

Context: The project needs a production-ready React framework with routing, metadata support, deployment compatibility, and a strong ecosystem.

Decision: Use Next.js with the App Router.

Consequences:

- The project gets a modern application structure and deployment path.
- Metadata, layouts, and routing are handled by the framework.
- Contributors must follow current App Router conventions and verify APIs through Context7 or official documentation.

## ADR-002: Use TypeScript

Status: Accepted

Context: The project should demonstrate engineering quality and reduce avoidable runtime errors.

Decision: Use TypeScript with strict typing expectations.

Consequences:

- Component contracts are explicit.
- Refactoring is safer.
- AI-generated code must respect types instead of relying on implicit behavior.

## ADR-003: Use Tailwind CSS

Status: Accepted

Context: The project needs a fast, consistent styling system with strong support for responsive design.

Decision: Use Tailwind CSS for styling UI components and layout primitives.

Consequences:

- Styling stays close to UI implementation.
- Design tokens should remain consistent and controlled.
- Tailwind classes should not become a substitute for clear component boundaries.

## ADR-004: Use Feature-Sliced Design

Status: Accepted

Context: The project must show architectural discipline even as a one-page MVP.

Decision: Use Feature-Sliced Design as the organizing architecture.

Consequences:

- Code is organized by responsibility and layer.
- The project can grow without becoming a flat component folder.
- Slices must be introduced pragmatically and not prematurely.

## ADR-005: Use shadcn/ui

Status: Accepted

Context: The project needs accessible, customizable UI primitives without adopting a heavy component framework.

Decision: Use shadcn/ui as the basis for reusable UI components.

Consequences:

- Components remain owned by the project.
- Styling can align with the design bible.
- Installation and usage must follow current shadcn/ui documentation.

## ADR-006: Use Framer Motion

Status: Accepted

Context: The product needs subtle, polished motion that supports perception and interaction.

Decision: Use Framer Motion for animation where CSS alone is insufficient.

Consequences:

- Motion can be declarative and composable.
- Animations must remain calm, purposeful, and accessible.
- Reduced motion preferences must be respected.

## ADR-007: Use Vercel

Status: Accepted

Context: The project needs a reliable deployment target optimized for Next.js.

Decision: Deploy the application on Vercel.

Consequences:

- Deployment is aligned with the framework.
- Preview deployments can support review workflows.
- Environment variables for future AI features must be managed through Vercel.

## ADR-008: Plan Vercel AI SDK

Status: Planned

Context: The MVP includes an "Ask My AI" section that may require streaming AI responses and API integration.

Decision: Plan to use Vercel AI SDK when the AI section enters implementation.

Consequences:

- AI integration should follow the Next.js and Vercel ecosystem.
- The dependency must not be installed until the related task starts.
- Prompt boundaries, error states, and safety constraints must be documented before implementation.

## ADR-009: Plan OpenAI API

Status: Planned

Context: The AI section needs a model provider for candidate-related answers.

Decision: Plan to use OpenAI API for AI-powered responses.

Consequences:

- API keys must never be exposed to the client.
- Server-side integration is required.
- The feature must include fallback behavior if the API is unavailable.

## ADR-010: Do Not Use Redux for MVP

Status: Accepted

Context: The MVP has no complex global client state requirement.

Decision: Do not use Redux.

Consequences:

- The project avoids unnecessary boilerplate.
- State remains local or server-driven until a real global state need appears.

## ADR-011: Do Not Use RTK Query for MVP

Status: Accepted

Context: The MVP does not require a structured client-side data fetching cache for multiple API resources.

Decision: Do not use RTK Query.

Consequences:

- The project avoids coupling to Redux infrastructure.
- Future data needs should be evaluated when they become concrete.

## ADR-012: Do Not Use React Query for MVP

Status: Accepted

Context: The MVP does not require complex client-side server-state synchronization.

Decision: Do not use React Query at this stage.

Consequences:

- The data layer remains simpler.
- If future API interactions become complex, this decision can be revisited.

## ADR-013: Do Not Use Zustand for MVP

Status: Accepted

Context: The MVP does not need a dedicated global state store.

Decision: Do not use Zustand.

Consequences:

- State management remains local and explicit.
- Zustand may be reconsidered only if shared client state becomes meaningful and repeated.

## ADR-014: Use Documented Design Tokens for the Visual System

Status: Accepted

Context: The approved design direction is Powder Precision Tech. The project needs a consistent visual system that can be implemented in Tailwind CSS and shared UI primitives without scattering arbitrary color, spacing, typography, and motion values across components.

Decision: Use the approved Theme & Design Tokens v1 from `docs/design/DESIGN_BIBLE.md` as the source of truth for future visual implementation. Tokens should be implemented with CSS custom properties, OKLCH color values, and Tailwind-compatible mappings when the implementation task begins. The approved font direction is Manrope for primary typography and IBM Plex Mono for technical metadata.

Consequences:

- UI implementation must use documented tokens instead of ad hoc visual values.
- The design can stay consistent across MVP sections and shared components.
- The light powder-blue visual identity can be changed centrally if the system evolves.
- Font loading, CSS variable mapping, and Tailwind integration must be handled in a future implementation task, not during documentation-only work.
