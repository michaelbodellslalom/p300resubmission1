# Copilot Rules & Constraints

## Project Scope
**In Scope:**
- Real-time operational dashboard for content strategists and audience insights managers
- Subscriber health, content performance, revenue tracking, correlation analysis
- Real-time polling, mobile-full functionality, export to CSV/PDF
- Mock/dummy data for MVP (no real API integration)

**Out of Scope (MVP):**
- ❌ User authentication or role-based access control
- ❌ Anomaly detection or alerting
- ❌ Predictive modeling or forecasting
- ❌ Custom dashboard builder
- ❌ Third-party analytics integration
- ❌ A/B testing platform integration

## Code Style & Patterns

**Language:** TypeScript (strict mode)  
**Framework:** Next.js 14 with React 18  
**Component Style:** Functional components + React hooks  
**State Management:** Zustand for global state, React Query for async data  
**Styling:** Tailwind CSS + MUI components  
**Naming:**
- Components: PascalCase (e.g., `KPICard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useFetchSubscriberData.ts`)
- Types: PascalCase with suffix (e.g., `SubscriberData`, `ContentMetric`)
- Store functions: camelCase (e.g., `setActiveTab()`)

## Design System

**Colors (Dark Theme):**
- Primary: `#0891B2` (Cyan-600)
- Success: `#10B981` (Emerald-500)
- Warning: `#F59E0B` (Amber-500)
- Background: `#0F172A` (Slate-950)
- Text: `#F1F5F9` (Slate-100)

**Typography:**
- Headers: Inter Bold 24-32px
- Body: Inter Regular 14px
- Mono: Fira Code 12px

**Spacing:** Use Tailwind's 4px base unit (p-4 = 16px)

## Performance Constraints
- Page load: <2 seconds
- Export generation: <5 seconds
- Chart render: <1 second
- API response: <500ms (mock)
- Lighthouse score: >90
- Bundle size: <250KB gzipped

## Accessibility Requirements
- ✅ WCAG 2.1 Level AA compliance
- ✅ Full keyboard navigation (Tab, Arrow, Enter)
- ✅ ARIA labels on all interactive elements
- ✅ Color contrast min 4.5:1 for text
- ✅ Color-blind safe palette (no red-only indicators)

## Mobile Requirements
- **Full functionality** on 375px (mobile), 768px (tablet), 1920px (desktop)
- **Touch-friendly** controls (min 44px tap targets)
- **Responsive tables** with horizontal scroll on small screens
- **Mobile nav** with hamburger menu on <768px

## Testing Standards
- Unit test coverage: >85%
- All components have snapshot tests
- Integration tests for full user flows
- E2E tests for critical paths
- Test command: `npm test`
- Coverage report: `npm test -- --coverage`

## Commit Message Format
```
T-XXX: Brief description of what was implemented

- Bullet points of changes (optional)
- Reference related tasks/issues (optional)
```

Example:
```
T-042: Implement KPI Card component with trend indicators

- Created reusable KPICard component
- Added loading skeleton state
- Added error state with retry
- Wired to Zustand store for reactive updates
- Related: T-024, T-025 (Subscriber/Revenue KPI cards)
```

## Documentation Standards
- **README.md** at root level with setup, usage, features
- **BRIEF.md** describing what was built and why
- **LICENSE** (MIT) at root
- Inline code comments for complex logic only (code should be self-documenting)
- JSDoc comments for exported functions/components

## Security & Privacy
- ⚠️ Never commit `.env.local` (add to `.gitignore`)
- ⚠️ Mock data only — no real user/sensitive data
- ⚠️ Public access — no authentication needed for MVP
- ⚠️ No third-party API keys in code

## Deployment
- **Host:** Vercel (auto-deploy on push to main)
- **Build:** `next build`
- **Start:** `next start`
- **Env vars:** Set on Vercel dashboard (not in code)
- **Preview:** Auto-generated on pull requests

## Common Gotchas
⚠️ **Don't:**
- Use client-side only logic in server components (mark with `'use client'`)
- Import large libraries without code splitting
- Make API calls without React Query caching
- Forget to handle loading/error states
- Use inline styles (use Tailwind instead)
- Commit node_modules or .env.local

✅ **Do:**
- Use `use client` directive at top of interactive components
- Lazy load heavy libraries (D3, PDF renderer)
- Implement error boundaries
- Add loading skeletons for slow requests
- Use Tailwind for all styling
- Reference task IDs in commits
