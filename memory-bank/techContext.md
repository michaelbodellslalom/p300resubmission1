# Technical Context

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 14.x | SSR, API routes, deployment to Vercel |
| **React** | React | 18.x | UI components, hooks |
| **UI Components** | Material-UI (MUI) | 5.x | Pre-built accessible components |
| **Charts** | Recharts | 2.x | Standard charts (line, bar, scatter) |
| **Charts** | D3 | 7.x | Custom interactive visualizations |
| **Styling** | Tailwind CSS | 3.x | Utility-first, dark theme support |
| **State** | Zustand | 4.x | Global dashboard state |
| **Data Fetching** | TanStack Query | 5.x | Caching, polling, refetch logic |
| **Export** | react-pdf | 3.x | PDF generation |
| **Export** | papaparse | 5.x | CSV parsing/generation |
| **Dates** | date-fns | 3.x | Date manipulation + formatting |
| **Testing** | Jest | 29.x | Unit test runner |
| **Testing** | React Testing Library | 14.x | Component testing |
| **Linting** | ESLint | 8.x | Code quality |
| **Deployment** | Vercel | - | Hosting + auto-deploy |

## Color Palette (Dark Theme)

```css
/* Primary */
--primary-600: #0891B2 (Cyan-600)
--primary-500: #06B6D4 (Cyan-500)
--primary-400: #22D3EE (Cyan-400)

/* Secondary */
--accent-500: #0EA5E9 (Sky-500)

/* Status */
--success-500: #10B981 (Emerald-500)
--warning-500: #F59E0B (Amber-500)
--error-500: #EF4444 (Red-500)

/* Neutrals */
--bg-950: #0F172A (Slate-950) - background
--bg-900: #111827 (Gray-900)
--bg-800: #1E293B (Slate-800) - cards
--bg-700: #334155 (Slate-700) - hover
--text-100: #F1F5F9 (Slate-100) - primary text
--text-400: #94A3B8 (Slate-400) - secondary text
```

## Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_POLLING_INTERVAL=30000
```

No sensitive keys needed for MVP (mock data).

## Folder Structure

```
project-root/
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/
│       └── test.yml
├── memory-bank/
│   ├── prd.md
│   ├── design.md
│   ├── tasks.md
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
├── src/
│   ├── app/
│   │   ├── layout.tsx (main layout)
│   │   ├── page.tsx (redirect to /dashboard)
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx (overview tab)
│   │       ├── subscribers/
│   │       │   └── page.tsx
│   │       ├── content/
│   │       │   └── page.tsx
│   │       ├── revenue/
│   │       │   └── page.tsx
│   │       └── reports/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── TabNavigation.tsx
│   │   ├── KPICard.tsx
│   │   ├── DataTable.tsx
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── ScatterChart.tsx
│   │   ├── FilterChip.tsx
│   │   ├── DateRangeFilter.tsx
│   │   ├── DrillDownPanel.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useFetchSubscriberData.ts
│   │   ├── useFetchContentData.ts
│   │   ├── useFetchRevenueData.ts
│   │   └── usePolling.ts
│   ├── store/
│   │   └── dashboardStore.ts (Zustand)
│   ├── api/
│   │   ├── subscribers/route.ts
│   │   ├── content/route.ts
│   │   └── revenue/route.ts
│   ├── data/
│   │   └── mock.ts (dummy data seed)
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── calculations.ts
│   │   └── validators.ts
│   ├── types/
│   │   ├── subscriber.ts
│   │   ├── content.ts
│   │   ├── revenue.ts
│   │   └── dashboard.ts
│   └── globals.css
├── public/
│   └── favicon.ico
├── .env.example
├── .env.local (not committed)
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── package.json
├── README.md
├── BRIEF.md
└── LICENSE (MIT)
```

## Key Dependencies

**UI & Charts:**
```json
{
  "@mui/material": "^5.x",
  "@mui/icons-material": "^5.x",
  "recharts": "^2.x",
  "d3": "^7.x",
  "tailwindcss": "^3.x"
}
```

**State & Data:**
```json
{
  "zustand": "^4.x",
  "@tanstack/react-query": "^5.x",
  "date-fns": "^3.x"
}
```

**Export:**
```json
{
  "@react-pdf/renderer": "^3.x",
  "papaparse": "^5.x"
}
```

**Dev:**
```json
{
  "typescript": "^5.x",
  "eslint": "^8.x",
  "jest": "^29.x",
  "@testing-library/react": "^14.x"
}
```

## Performance Targets

- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1
- **Overall Lighthouse Score:** >90
- **Bundle Size:** <250KB (gzipped)
- **API Response Time:** <500ms (mock data)
- **Chart Render Time:** <1s

## Accessibility Standards

✅ **WCAG 2.1 Level AA** compliance  
✅ **Keyboard Navigation** — Full Tab/Arrow/Enter support  
✅ **Screen Reader Support** — ARIA labels on all interactive elements  
✅ **Color Contrast** — Min 4.5:1 for text  
✅ **Focus Indicators** — Visible outline on Tab  
✅ **Color-Blind Safe** — Avoid red-only indicators  

## Deployment

**Hosting:** Vercel  
**Build Command:** `next build`  
**Start Command:** `next start`  
**Preview URL:** Auto-generated by Vercel on PR  
**Production URL:** Connected to main branch  

**Environment Setup on Vercel:**
1. Connect GitHub repo
2. Set env vars (NEXT_PUBLIC_API_BASE_URL, etc.)
3. Deploy on push
4. Auto-HTTPS, CDN caching, serverless functions

## Development Setup

```bash
# Clone repo
git clone <repo>

# Install dependencies
npm install

# Create .env.local (from .env.example)
cp .env.example .env.local

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Build & Test

```bash
# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```
