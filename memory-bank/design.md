# Design Document: Media & Comms Corp Operations Dashboard

## Visual Direction

### Brand
Media & Comms Corp - bold, creative, premium media platform

### Color Palette
- **Primary:** `#0891B2` (Cyan-600) - trustworthy, tech-forward
- **Secondary:** `#06B6D4` (Cyan-500) - accent, growth indicators
- **Accent:** `#0EA5E9` (Sky-500) - interactive elements, hover states
- **Success:** `#10B981` (Emerald-500) - positive metrics, growth
- **Warning:** `#F59E0B` (Amber-500) - churn, risk indicators
- **Background:** `#0F172A` (Slate-950) - dark, premium feel
- **Text:** `#F1F5F9` (Slate-100) - high contrast, readable
- **Cards:** `#1E293B` (Slate-800) - subtle elevation from background

### Typography
- **Headers:** `Inter` (bold, 24px/32px) - strong, modern
- **Body:** `Inter` (regular, 14px) - clean, readable
- **Mono:** `Fira Code` (12px) - for data values, codes
- **Line height:** 1.5x for readability

### Tone
Professional yet approachable. Data is the hero; UI gets out of the way.

## Component Specifications

### KPI Card
- Header: metric name + icon (e.g., 📈 Subscriber Growth)
- Primary value: large, bold number (e.g., `+12.5%`)
- Secondary: previous period or target for context (e.g., "vs. last month")
- Status badge: color-coded (green=good, amber=risk, gray=neutral)
- Subtle hover effect: slight elevation, glow

### Data Table
- Sortable columns (click header to sort)
- Rows: 20-50 items with pagination
- Row hover: highlight with `#334155` background
- Content drill-down: click row to show details panel (slide-in from right)

### Chart (Recharts + D3)
- Line chart: subscriber trends (cyan lines, gradient fill)
- Bar chart: content performance (grouped by format)
- Scatter: content vs. conversions
- Hover tooltip: detailed values + timestamp
- Y-axis: labeled with metric unit (e.g., "Subscribers", "Revenue ($)")
- Legend: interactive (click to hide/show series)
- Responsive: adapts to container width

### Tab Navigation
- Location: horizontal tabs below header
- Tabs: Overview, Subscribers, Content, Revenue, Reports
- Active state: cyan underline + bold text
- Inactive: dim text, hover lightens

### Filters & Controls
- Date range quick filters: [7d] [30d] [90d] [1y] [Custom]
- Format filter (Content tab): dropdown or chip buttons
- Export button: CSV | PDF | Share
- Manual refresh icon: spinning when updating

### Header
- Logo + "Media & Comms Corp Dashboard"
- Timestamp: "Last updated: 2 minutes ago"
- Right side: theme toggle (optional), settings icon

## UX Flows

### Flow 1: Check Subscriber Health (Content Strategist - 60 sec)
1. Open dashboard → Overview tab
2. Glance at subscriber KPI cards (growth %, churn %)
3. View 30-day subscriber line chart
4. If churn spike detected, click "Churn Breakdown" to see reasons
5. Note: "Video content dropped last week, churn +2%"

### Flow 2: Identify Top Content (Content Strategist - 2 min)
1. Click Content tab
2. View performance table (sorts by views by default)
3. Filter by format: "Video" only
4. See: "Tutorials" rank #1 in views + engagement
5. Cross-tab to Revenue: confirm "Tutorials" = highest RPM
6. Decision: "Increase tutorial production"

### Flow 3: Correlate Content & Subscriptions (Audience Insights Manager - 3 min)
1. Click Revenue tab
2. View scatter plot: top content vs. new subscriptions
3. Hover over outliers: "Documentary about AI Trends = 500 new subs in 1 week"
4. Click to drill-down: see cohort retention, lifetime value
5. Export as PDF for stakeholder meeting

### Flow 4: Generate Weekly Report (Content Strategist - 2 min)
1. Navigate to Reports tab
2. Select date range: Last 7 days
3. Click "Export PDF"
4. PDF includes: KPIs, top content, churn analysis, revenue snapshot
5. Email or share link

## Tech Stack & Architecture Decisions

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js 14 + React 18 | SSR for fast loads, API routes for serverless backend |
| **UI Components** | Material-UI (MUI) v5 | Mature, accessible, built for dashboards |
| **Charts** | Recharts + D3 | Recharts for standard charts, D3 for custom interactions |
| **Styling** | Tailwind CSS | Utility-first for rapid prototyping, custom dark theme |
| **Data Fetching** | TanStack Query (React Query) | Handles caching, real-time updates, pagination |
| **State Management** | Zustand | Lightweight, Redux alternative for filters + view state |
| **Export** | `react-pdf` + `papaparse` | PDF + CSV generation |
| **Responsive** | Tailwind breakpoints | Mobile-first approach, full mobile functionality |
| **Hosting** | Vercel | Built for Next.js, auto-deployment, serverless |
| **Data** | Mock data (seed file) | Dummy data in `src/data/mock.ts` for MVP |

## Architecture Pattern
Component-driven with custom hooks for data fetching. Dashboard tabs as separate page routes. Real-time updates via setInterval polling (mock data).

## Design Decisions Resolved

✅ **Dark theme**: Bold/creative look, reduces eye strain for long monitoring sessions  
✅ **Multi-tab layout**: Segments concerns, scales to more metrics later  
✅ **Cyan/blue palette**: Conveys trust + growth (perfect for media/analytics)  
✅ **Interactive charts**: D3 for sophisticated interactions = higher perceived quality  
✅ **Public access**: No auth = faster iteration, lower scope for MVP  
✅ **Mobile-first responsive**: Full mobile functionality, not degraded experience  
✅ **Real-time updates**: 30-60 sec polling = feels live without complexity  
✅ **Export-ready**: CSV + PDF = stakeholder presentations possible  
