# Contributing

Thanks for contributing to this project.

## Project Purpose

This repository contains the Media & Comms Corp Operations Dashboard MVP. The product is focused on operational analytics across subscriber, content, and revenue workflows.

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

```bash
npm ci
npm run dev
```

Open http://localhost:3000/dashboard.

## Branching and Commits

- Create focused branches from `main`.
- Keep commits small and task-oriented.
- Prefer commit messages that map to task IDs when applicable.

Example:

```text
T-180: Expand coverage for recommendations and reports
```

## Code Standards

- Use TypeScript and existing project patterns.
- Prefer reusable components and shared utilities over duplicated logic.
- Keep styles in Tailwind utility classes.
- Preserve accessibility semantics for all interactive UI.
- Do not introduce inline secrets or committed environment values.

## Quality Gates

Run these before opening a PR:

```bash
npm test -- --runInBand
npm run type-check
npm run build
```

Optional checks:

```bash
npm run lint
npm run test:coverage
```

## Testing Guidance

- Add unit tests for component logic and state transitions.
- Add integration tests for route-level behavior where practical.
- Reuse fixtures in `src/test/fixtures` when possible.
- Prefer deterministic test data and avoid time-sensitive assertions.

## Pull Request Checklist

- Scope is clear and linked to one or more tasks.
- Tests are added/updated for behavior changes.
- README/BRIEF/docs are updated when scope changes.
- Build and type-check pass locally.
- No unrelated refactors included.

## Architecture References

See the planning docs for context and constraints:

- `memory-bank/prd.md`
- `memory-bank/design.md`
- `memory-bank/systemPatterns.md`
- `memory-bank/tasks.md`
- `memory-bank/activeContext.md`
- `memory-bank/progress.md`
