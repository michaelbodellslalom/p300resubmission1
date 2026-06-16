# Memory Bank Instructions

## What This Is
A collection of planning documents and context files that GitHub Copilot reads at the start of every coding session. This ensures Copilot always knows your product, design decisions, tech stack, and what to build next.

## Files in This Directory

### Core Planning Documents
- **prd.md** — Product requirements, user stories, features, success metrics
- **design.md** — Visual direction, colors, typography, component specs, UX flows, tech stack decisions
- **tasks.md** — 200+ granular build tasks organized into 15 phases with dependencies

### Context Files (Updated Each Session)
- **projectbrief.md** — What we're building (1 page summary)
- **productContext.md** — Why it exists, UX goals, key design decisions, non-goals
- **systemPatterns.md** — Architecture patterns, data flow, state management, component hierarchy
- **techContext.md** — Full tech stack, colors, env vars, folder structure, dependencies
- **activeContext.md** — Current phase, next task, what's done, blockers
- **progress.md** — Phase-by-phase completion status, risks, commits made

## How to Use

### Before Starting a Coding Session
1. Open `activeContext.md` to see: current phase, next task, blockers
2. Skim `progress.md` to see what phases are complete
3. Reference `tasks.md` for the specific task details (T-xxx)
4. Check `systemPatterns.md` for architecture guidance
5. Use `techContext.md` for tech stack details

### After Completing a Phase
1. Update `activeContext.md`:
   - Change "Next Task" to the first task of next phase
   - Move any completed work items to "What's Done"
   - Note any blockers or issues discovered

2. Update `progress.md`:
   - Mark completed phases as ✅ Done
   - Update task counts
   - Add notes about implementation decisions
   - Log commit messages for each phase

### When Things Change
- **Design decision discovered:** Update `productContext.md`
- **Architecture change:** Update `systemPatterns.md`
- **New dependencies:** Update `techContext.md`
- **Risk discovered:** Add to `progress.md` under "Risks & Notes"
- **New feature:** Add to `tasks.md` and map to user stories/features

## Guidelines

✅ **DO:**
- Keep files concise — they load every session
- Use templates when adding tasks
- Link tasks to user stories and features (e.g., T-023 → US-001, FR-001)
- Commit with task IDs: "T-042: Implement timer pause/resume"
- Update context files after each 2-3 hour coding block

❌ **DON'T:**
- Add marketing copy or verbose explanations
- Duplicate information across files (link instead)
- Leave `activeContext.md` stale (update after each phase)
- Commit without a task ID in the message

## Command Reference (For GitHub Copilot)

```
/start feature phase-0-init
/implement T-001
/implement T-002
/review complete T-001
/update memory bank
```

Copilot will read these context files automatically when you run `/implement`.

## Questions?
If Copilot seems confused about the project:
1. Check that `activeContext.md` and `progress.md` are up to date
2. Reference the specific PRD section or task (e.g., "See T-042 in tasks.md")
3. Link directly to relevant context files in your question
