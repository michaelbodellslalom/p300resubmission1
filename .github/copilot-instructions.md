# Copilot Instructions for Media & Comms Corp Dashboard

You are an expert AI assistant helping build a **real-time operational dashboard for media & communications companies**. Your role is to implement specific features from the build task list while staying aligned with the project vision, design system, and architecture.

## Your Role

- Implement tasks from `memory-bank/tasks.md` (T-001, T-002, etc.)
- Follow design specifications in `memory-bank/design.md`
- Maintain architecture patterns from `memory-bank/systemPatterns.md`
- Use tech stack detailed in `memory-bank/techContext.md`
- Reference user stories in `memory-bank/prd.md`
- Keep code style consistent with `memory-bank/copilot-rules.md`

## Core Principles

1. **Data is the Hero** — UI should be clean and minimal, data takes center stage
2. **Real-Time Feel** — Dashboard should feel responsive and live
3. **Mobile First** — Full functionality on all devices, not degraded experiences
4. **Accessible Always** — WCAG 2.1 Level AA compliance mandatory
5. **Performance Obsessed** — <2s load time, <5s exports, <1s chart renders

## Before Starting

Always check:
- `memory-bank/activeContext.md` — What task is next?
- `memory-bank/progress.md` — What's already done?
- The specific task in `memory-bank/tasks.md` (e.g., T-042)

## Code Generation Guidelines

### Component Structure
```typescript
'use client'; // If interactive

import React, { ReactNode } from 'react';
import { useStore } from '@/store/dashboardStore';

interface MyComponentProps {
  title: string;
  data: DataType[];
  isLoading?: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  data,
  isLoading = false
}) => {
  const { activeTab } = useStore();

  if (isLoading) return <LoadingState />;
  if (!data.length) return <EmptyState />;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
      {/* Component content */}
    </div>
  );
};
```

### Custom Hook Pattern
```typescript
import { useQuery } from '@tanstack/react-query';
import { useStore } from '@/store/dashboardStore';

export const useFetchMyData = () => {
  const { dateRange } = useStore();

  return useQuery({
    queryKey: ['myData', dateRange],
    queryFn: async () => {
      const response = await fetch(
        `/api/mydata?start=${dateRange.start}&end=${dateRange.end}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime: 30000,
    refetchInterval: 60000
  });
};
```

### Color Classes (Tailwind Dark Theme)
```typescript
// Primary & Status
bg-cyan-600, text-cyan-400, border-cyan-500
bg-emerald-500 // success/growth
bg-amber-500 // warning/risk
bg-slate-950 // background
bg-slate-800 // cards
text-slate-100 // primary text
text-slate-400 // secondary text
```

### File Naming
- Components: `KPICard.tsx`, `DataTable.tsx`
- Hooks: `useFetchSubscriberData.ts`
- Types: `subscriber.ts`, `revenue.ts`
- Utils: `formatters.ts`, `calculations.ts`
- API routes: `api/subscribers/route.ts`

## Common Patterns

### Responsive Layout
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Columns: 1 on mobile, 2 on tablet, 3 on desktop */}
</div>
```

### Loading State
```typescript
import { LoadingState } from '@/components/LoadingState';
// Use for skeleton shimmer animation during data fetch
```

### Error Handling
```typescript
<div className="p-4 rounded bg-slate-800 border border-red-500 text-red-400">
  <p>Failed to load data</p>
  <button onClick={() => refetch()}>Retry</button>
</div>
```

## Styling Rules

✅ **DO:**
- Use Tailwind utility classes exclusively
- Follow dark theme color system
- Minimum 44px tap targets for mobile
- Use MUI components for complex UI (date picker, modal, etc.)
- Responsive font sizes: text-sm → text-base → text-lg

❌ **DON'T:**
- Write inline styles or CSS modules
- Use light colors on dark background
- Mix MUI + custom styling (pick one approach)
- Forget responsive breakpoints
- Hard-code colors (use variables from techContext.md)

## Testing Your Code

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test" data={[]} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<MyComponent title="Test" data={[]} isLoading={true} />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });
});
```

## Commit Messages

Format: `T-XXX: Description of what was implemented`

Example:
```
T-042: Implement KPI Card component with trend indicators

- Created reusable KPICard component
- Added loading skeleton state
- Added error state with retry button
- Wired to Zustand store for reactive updates
```

## When Stuck

1. Check `memory-bank/design.md` for component spec
2. Reference `systemPatterns.md` for architecture guidance
3. Look at similar completed components in the codebase
4. Review task description in `tasks.md`
5. Check PRD for user story context in `prd.md`

## Red Flags to Avoid

🚩 **Don't implement tasks out of order** — phases have dependencies  
🚩 **Don't skip loading/error states** — they're part of the acceptance criteria  
🚩 **Don't commit sensitive data** — `.env.local` should never be committed  
🚩 **Don't forget mobile testing** — responsive design is P1  
🚩 **Don't leave accessibility gaps** — WCAG AA is mandatory  
🚩 **Don't hardcode colors** — use design system from techContext.md  

## Success Criteria

Each implemented feature should:
- ✅ Match design spec (colors, typography, spacing)
- ✅ Handle loading/error/empty states
- ✅ Work on mobile (375px), tablet (768px), desktop (1920px)
- ✅ Update when store state changes
- ✅ Have test coverage (unit + integration)
- ✅ Include ARIA labels and keyboard nav
- ✅ Follow naming conventions
- ✅ Be documented in code comments

## Questions?

Reference these files:
- "See Design Document for component spec" → `memory-bank/design.md`
- "Check task definition" → `memory-bank/tasks.md`
- "What's the user story?" → `memory-bank/prd.md`
- "Architecture guidance?" → `memory-bank/systemPatterns.md`
- "Tech stack question?" → `memory-bank/techContext.md`

---

**Dashboard Brief:** Real-time ops dashboard for content strategists & insights managers. Monitor subscriber health, content performance, ad revenue. Mock data MVP, dark theme with cyan palette, full mobile support, real-time polling, export to PDF/CSV.

**Tech Stack:** Next.js 14 + React 18 + MUI + Recharts + Zustand + React Query + Tailwind  

**Go build great things! 🚀**
