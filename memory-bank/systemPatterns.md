# System Patterns & Architecture

## Architecture Overview
**Pattern:** Component-driven with custom hooks for data fetching, Zustand for global state, tab-based routing.

```
App (layout wrapper)
├── Header (title, refresh, settings)
├── TabNavigation (Overview, Subscribers, Content, Revenue, Reports)
├── FilterBar (date range, format filters)
└── TabContent (dynamic page by active tab)
    ├── Overview (KPI cards + charts)
    ├── Subscribers (cohort analysis + breakdown)
    ├── Content (performance table + filters)
    ├── Revenue (revenue tracking + correlation)
    └── Reports (export + sharing)
```

## State Management (Zustand Store)

**Global Dashboard State:**
```typescript
{
  activeTab: 'overview' | 'subscribers' | 'content' | 'revenue' | 'reports',
  dateRange: {
    start: Date,
    end: Date,
    preset: '7d' | '30d' | '90d' | '1y' | 'custom'
  },
  filters: {
    contentFormat: 'all' | 'video' | 'article' | 'podcast' | 'short-form' | 'long-form',
    contentType: 'all' | 'tutorial' | 'news' | 'entertainment' | 'interview' | ...
  },
  lastUpdated: timestamp,
  isLoading: boolean,
  selectedContent: ContentItem | null // for drill-down
}
```

**Actions:**
- `setActiveTab(tab)`
- `setDateRange(preset | custom)`
- `setContentFormat(format)`
- `setContentType(type)`
- `setSelectedContent(content)`
- `refreshData()`

## Data Fetching Pattern (React Query + Custom Hooks)

**Hook Pattern:**
```typescript
const useFetchSubscriberData = () => {
  const { dateRange } = dashboardStore()
  return useQuery({
    queryKey: ['subscribers', dateRange],
    queryFn: () => fetch(`/api/subscribers?...`).then(r => r.json()),
    staleTime: 30000, // 30 sec
    refetchInterval: 60000 // 60 sec
  })
}
```

**API Route Pattern:**
```
GET /api/subscribers?startDate=...&endDate=...
GET /api/content?format=video&type=tutorial&...
GET /api/revenue?startDate=...&endDate=...
```

Returns filtered mock data based on query params.

## Component Hierarchy

**Reusable Components:**
- `KPICard` — Metric display with trend indicator
- `DataTable` — Sortable, paginated table with row drill-down
- `LineChart` — Recharts line chart with tooltips
- `BarChart` — Recharts bar chart with legend
- `ScatterChart` — D3 scatter plot with hover
- `TabNavigation` — Tab switcher
- `DateRangeFilter` — Quick presets + custom picker
- `FilterChip` — Format/type filter buttons
- `DrillDownPanel` — Slide-in detail view
- `LoadingState` — Skeleton shimmer
- `ErrorState` — Retry button
- `EmptyState` — No data message

**Page Components (one per tab):**
- `OverviewPage` — KPIs + trends
- `SubscribersPage` — Cohort analysis
- `ContentPage` — Performance table
- `RevenuePage` — Revenue metrics
- `ReportsPage` — Export interface

## Data Flow

```
User Action (filter change, tab click, refresh)
    ↓
Store Action (update activeTab, dateRange, etc.)
    ↓
Component Re-render
    ↓
Custom Hook (useFetchSubscriberData, etc.)
    ↓
React Query (check cache, fetch if needed)
    ↓
API Route (mock data filtering)
    ↓
Return Data
    ↓
Component Render (table, charts, KPIs)
```

## Real-Time Update Flow

1. **Global Polling Timer** — Interval set in custom hook
2. **React Query Auto-Refetch** — Triggers on interval
3. **Store Update** — lastUpdated timestamp
4. **Visual Indicator** — "Last updated: 2 minutes ago"
5. **Auto-Refresh** — All components re-render with latest data

## Responsive Design Pattern

**Breakpoints (Tailwind):**
- Mobile: <640px (1 column, touch-optimized)
- Tablet: 640-1024px (2 columns, hybrid)
- Desktop: >1024px (3+ columns, full detail)

**Responsive Components:**
- KPI cards: 3 cols → 2 cols → 1 col
- Tables: Horizontal scroll on mobile, swipe to reveal
- Charts: Reduced detail on small screens, full on desktop
- Modals/Drill-down: Full-screen on mobile, slide-in on desktop

## Export Pattern

**CSV Export:**
1. User clicks "Export CSV"
2. Gather current filtered data + date range
3. Format as CSV using `papaparse`
4. Trigger browser download with timestamp filename

**PDF Export:**
1. User selects report template (Weekly/Monthly)
2. Configure sections (what to include)
3. Render PDF layout using `react-pdf`
4. Include KPIs, charts, tables
5. Trigger browser download

**Shareable Link:**
1. Encode state in URL params (tab, filters, date range)
2. Copy link to clipboard
3. User can share; link restores exact dashboard state

## Performance Optimizations

✅ **Code Splitting** — Lazy load tab pages  
✅ **Image Optimization** — Responsive images, lazy load  
✅ **Bundle Optimization** — Tree-shake unused libraries  
✅ **React Query Caching** — 30 sec stale time, 5 min cache duration  
✅ **Memoization** — useMemo for expensive calculations  
✅ **Pagination** — Load 50 items per page, not full dataset  

## Error Handling

1. **Network Error** — Show error state + retry button
2. **Invalid Data** — Fall back to previous data, log warning
3. **Timeout** — Show "Data fetch timed out" message
4. **Empty Data** — Show empty state with helpful message
5. **Polling Error** — Backoff, don't spam requests
