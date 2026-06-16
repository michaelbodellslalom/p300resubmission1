# Media & Comms Corp Operations Dashboard

Operational dashboard for media and communications teams to monitor subscriber health, content performance, revenue trends, and action-oriented recommendations in one place.

## Product Snapshot

- Audience: Content strategists and audience insights managers
- Goal: Turn scattered subscriber/content/revenue data into weekly operational decisions
- Data source: Mock data for MVP (no production integrations yet)
- Access model: Public MVP without auth

## Implemented Features

### Dashboard tabs

1. Overview
- KPI cards for subscriber and revenue health
- Subscriber trend and dual-axis revenue trend charts
- Sortable churn breakdown table with loading/error/empty states

2. Subscribers
- Subscriber KPIs and cohort/churn views
- Churn reason visualizations and table-driven analysis

3. Content
- Content performance table with sorting, pagination, and filtering
- Format-level analysis and engagement insights

4. Revenue
- Revenue KPIs and trend visualizations
- Revenue-by-format breakdowns

5. Insights
- Correlation-focused analytics views

6. Reports
- CSV export for subscriber, content, and revenue datasets
- In-app performance metrics dashboard

7. Recommendations
- Action cards that synthesize subscriber/content/revenue signals
- Immediate, this-week, and strategic recommendations with owner and impact metadata

### Cross-cutting capabilities

- Mobile-first responsive behavior across all tabs
- Accessibility remediation (focus states, keyboard flow, ARIA semantics, skip link)
- Route-level code splitting and dynamic imports for heavier modules
- Shared caching policy across hooks and API routes
- Client-side performance metric capture (web vitals + route timings)

## Tech Stack

- Next.js App Router 16
- React 19 + TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- Recharts
- Papa Parse (dynamic import for CSV export)
- Jest + React Testing Library

## Repository Layout

```text
.
├── memory-bank/                 # Planning, architecture, task tracking
├── src/
│   ├── app/                     # Routes and API handlers
│   ├── components/              # Reusable UI components
│   ├── hooks/                   # Data hooks
│   ├── store/                   # Zustand store
│   ├── data/                    # Mock data generators/selectors
│   ├── test/fixtures/           # Shared test fixtures
│   ├── types/                   # Domain types
│   └── utils/                   # Shared utilities
├── .github/workflows/ci.yml     # CI: test + type-check + build
├── BRIEF.md
├── LICENSE
└── README.md
```

## Local Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Install and run

```bash
npm ci
npm run dev
```

Open http://localhost:3000/dashboard.

## Scripts

```bash
# Development
npm run dev

# Quality gates
npm test
npm run test:coverage
npm run type-check
npm run lint

# Production build
npm run build
npm start
```

## Testing and Quality

Current automated coverage includes:

- Store behavior tests
- Custom data hook tests
- KPI, chart-state, and data-table component tests
- Integration tests for overview, content, revenue, recommendations, and reports paths
- Error-state and mock-data validation tests

CI runs on push and pull request via [.github/workflows/ci.yml](.github/workflows/ci.yml):

1. Install dependencies
2. Run Jest test suite
3. Run TypeScript type-check
4. Run production build

## Accessibility and Performance Notes

- WCAG-oriented keyboard and focus improvements applied across navigation and controls
- Chart containers include descriptive labels for non-visual context
- Reduced-motion behavior supported for state transitions and animated affordances
- Dynamic imports used to keep initial route payloads lighter

## Environment

MVP runs with local defaults and mock data.

- Optional local file: .env.local
- Example template: [.env.example](.env.example)

## Additional Documentation

- API contracts: [docs/API_ROUTES.md](docs/API_ROUTES.md)
- Contribution workflow: [CONTRIBUTING.md](CONTRIBUTING.md)
- Product brief: [BRIEF.md](BRIEF.md)
- Deployment runbook: [DEPLOYMENT.md](DEPLOYMENT.md)
- Change log: [CHANGELOG.md](CHANGELOG.md)

## Current Status

- Testing phase tasks through T-180 are complete
- Documentation and launch packaging tasks are in progress
- Production build, type-check, and test suite are currently green

## License

See [LICENSE](LICENSE).
