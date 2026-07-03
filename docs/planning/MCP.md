# Master Construction Plan

## Product Vision

Portfolio is a modern interactive one-page application that presents a Frontend Developer through product thinking, engineering discipline, and high-quality frontend execution.

The product should not feel like a static CV. It should feel like a carefully designed professional interface that helps recruiters and engineering leaders quickly understand the developer's value, experience, and decision-making style.

## Product Goals

- Present the developer clearly and confidently.
- Demonstrate frontend engineering quality through the product itself.
- Show architectural discipline and production-ready thinking.
- Communicate commercial experience in a concise and credible way.
- Create a memorable interaction through a focused AI-assisted section.
- Encourage the viewer to invite the developer to an interview.

## Target Audience

- HR specialists who need quick clarity.
- Recruiters who scan many candidates and need strong signals.
- Team Leads who evaluate practical engineering maturity.
- Engineering Managers who look for reliability and communication.
- CTOs who value product thinking and technical judgment.
- Senior Frontend Developers who can assess implementation quality.

## User Journey

1. The user opens the site and immediately understands who the developer is.
2. The user sees what value the developer can bring to a team.
3. The user reviews commercial experience and professional context.
4. The user understands the developer's approach to engineering decisions.
5. The user interacts with or reviews the AI-assisted section.
6. The user has enough confidence to proceed with contact or interview invitation.

Detailed page composition, section goals, transitions, and storytelling logic are defined in `docs/planning/INFORMATION_ARCHITECTURE.md`.

Section-level content strategy, Hero concepts, AI question strategy, and content self-review are defined in `docs/planning/CONTENT_STRATEGY.md`.

Wireframe-level page composition is defined in `docs/planning/WIREFRAMES.md`.

## MVP

The MVP structure is fixed and must not be changed until MVP completion.

1. Greeting
2. What I Can Bring to a Team
3. Commercial Experience
4. How I Approach Development
5. Ask My AI

### MVP Scope

The MVP must include only the sections listed above. No blog, case studies, project gallery, testimonials, dashboard, theme switcher, or extra pages should be added before the MVP is complete.

### MVP Quality Bar

- Mobile-first responsive layout.
- Clear content hierarchy.
- Accessible semantic markup.
- Consistent visual language.
- Smooth but restrained motion.
- Production-ready project structure.
- Deployment-ready build.

## Success Metrics

Primary metrics:

- A recruiter can understand the developer's value within 60 seconds.
- A technical reviewer can identify architectural discipline from the repository.
- The project can be deployed without manual fixes.
- The MVP communicates a clear reason to schedule an interview.

Engineering metrics:

- No avoidable TypeScript errors.
- No avoidable lint errors.
- Clear component boundaries.
- No unnecessary dependencies.
- Documentation and implementation remain aligned.

Qualitative metrics:

- The interface feels modern, calm, and professional.
- The site avoids visual noise.
- Motion supports comprehension instead of distracting from content.
- The AI-assisted section feels useful, not decorative.

## Roadmap

### Phase 1: Foundation

- Prepare engineering documentation.
- Define project structure.
- Configure Feature-Sliced Design conventions.
- Add UI foundation.
- Prepare deployment pipeline.

### Phase 2: MVP Interface

- Build the fixed MVP section structure.
- Implement responsive layout.
- Add reusable UI primitives.
- Add controlled motion.
- Add accessibility states.

### Phase 3: AI Section

- Define the purpose and limits of the AI interaction.
- Integrate Vercel AI SDK and OpenAI API when required.
- Add safe fallback states.
- Add loading and error handling.

### Phase 4: Production Polish

- Improve performance.
- Validate accessibility.
- Improve metadata and SEO basics.
- Verify deployment on Vercel.
- Review documentation consistency.

### Phase 5: Post-MVP Opportunities

Post-MVP work may include richer project proof, analytics, additional contact flows, or advanced AI behavior. These must not be started until the MVP is complete and reviewed.
