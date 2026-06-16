# Media & Comms Corp Operations Dashboard

A real-time operational dashboard for content strategists and audience insights managers at media & communications organizations. Monitor subscriber health, analyze content performance, track ad revenue impact, and identify growth opportunities — all in one unified interface.

## Features

✨ **Subscriber Health Monitoring**
- Track subscriber growth, churn rates, and retention cohorts
- Analyze subscriber lifetime value and risk indicators
- Drill-down into churn reasons and patterns

📊 **Content Performance Analytics**
- Compare content performance across formats (video, article, podcast, etc.)
- Track views, engagement rates, session duration
- Identify which content drives subscriptions
- Format-specific performance breakdown

💰 **Ad Revenue Tracking**
- Monitor ad revenue trends and revenue per subscriber
- Calculate RPM (revenue per 1k views) by format
- Correlate content performance with ad revenue
- Revenue contribution by content format

🔗 **Correlation Analysis**
- See which content drives new subscriptions
- Understand ad revenue drivers
- Format retention correlation
- Weekly content vs. subscriber acquisition paired analysis

⚡ **Real-Time Updates**
- Dashboard refreshes every 30-60 seconds
- Live data indicator with last-update timestamp
- Manual refresh button for immediate updates

📱 **Full Mobile Support**
- Desktop, tablet, and mobile full functionality
- Touch-optimized controls and interactions
- Responsive charts and data tables

📤 **Export & Sharing**
- Generate CSV exports of any data table
- Create PDF reports (weekly/monthly templates)
- Share dashboard state via URL links
- Stakeholder presentation ready

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/media-comms-dashboard.git
cd media-comms-dashboard

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Check code quality
npm run lint
```

## Tech Stack

- **Frontend:** Next.js 14 + React 18
- **UI Components:** Material-UI (MUI) v5
- **Charts:** Recharts + D3
- **Styling:** Tailwind CSS with dark theme
- **State:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Export:** react-pdf + papaparse
- **Hosting:** Vercel

## Project Structure

```
.
├── memory-bank/              # AI scaffolding & planning docs
│   ├── prd.md                # Product requirements
│   ├── design.md             # Design decisions & component specs
│   ├── tasks.md              # 200+ build tasks (15 phases)
│   ├── projectbrief.md       # 1-page summary
│   ├── systemPatterns.md     # Architecture patterns
│   └── ...
├── src/
│   ├── app/                  # Next.js pages & routing
│   ├── components/           # React components
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand state management
│   ├── api/                  # API routes
│   ├── data/                 # Mock data seed
│   ├── types/                # TypeScript types
│   └── utils/                # Helper functions
├── public/                   # Static assets
├── README.md                 # This file
├── BRIEF.md                  # Project brief & goals
├── LICENSE                   # MIT License
└── .github/
    └── copilot-instructions.md  # AI instructions
```

## Key Metrics & Success Criteria

- ⚡ **Performance:** <2 second page load, <5 second export
- 🎯 **Usability:** Complete performance analysis in <3 clicks
- 📱 **Compatibility:** Works on 375px mobile, 768px tablet, 1920px desktop
- ✅ **Quality:** >85% test coverage, Lighthouse >90
- 📊 **Real-Time:** Data updates within 60 seconds

## Usage Guide

### Dashboard Tabs

1. **Overview** — KPI cards, subscriber trends, engagement overview
2. **Subscribers** — Cohort analysis, churn breakdown, lifetime value
3. **Content** — Performance table, format comparison, drill-down details
4. **Revenue** — Revenue trends, RPM by format, content correlation
5. **Reports** — Export reports, share links, weekly/monthly templates

### Filtering & Navigation

- **Date Range:** Quick filters (7d, 30d, 90d, 1y) or custom date picker
- **Format Filter:** Video, article, podcast, short-form, long-form
- **Type Filter:** Tutorial, news, entertainment, interview, etc.
- **Drill-Down:** Click any content row to see detailed metrics
- **Real-Time Refresh:** Manual refresh or auto-update every 30-60 seconds

### Exporting Data

```bash
# CSV Export (any data table)
Click "Export CSV" button → Download CSV with timestamp

# PDF Report (multiple templates)
1. Go to Reports tab
2. Select template (Weekly/Monthly)
3. Configure sections
4. Click "Export PDF"

# Share Dashboard State
1. Configure filters/date range
2. Click "Copy Link"
3. Share URL with team
4. Link restores exact state when opened
```

## Environment Variables

Create `.env.local` (never commit):

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_POLLING_INTERVAL=30000
```

See `.env.example` for template.

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test -- DataTable.test.tsx
```

**Coverage Target:** >85% of all code paths

## Accessibility

This dashboard meets **WCAG 2.1 Level AA** standards:

- ✅ Full keyboard navigation (Tab, Arrow, Enter)
- ✅ High contrast dark theme (4.5:1 minimum)
- ✅ ARIA labels on all interactive elements
- ✅ Color-blind safe palette
- ✅ Screen reader compatible

## Performance

Lighthouse audit targets:

- **Performance:** >90
- **Accessibility:** >95
- **Best Practices:** >90
- **SEO:** >90

## Deployment

### Deploy to Vercel

```bash
# Link to Vercel
vercel link

# Deploy
vercel

# Set environment variables on Vercel Dashboard
```

### Deploy to Other Platforms

```bash
# Build production bundle
npm run build

# Start server
npm start

# Serve on port 3000
```

## Project Timeline

- **Phase 0:** Scaffolding & Setup (2 days)
- **Phase 1-8:** Core Features & Tabs (10 days)
- **Phase 9-11:** Mobile, Accessibility, Performance (5 days)
- **Phase 12-13:** Testing & Documentation (5 days)
- **Phase 14:** Deployment & Launch (1 day)

**Total Estimated:** ~3-4 weeks for MVP

## Future Enhancements (Post-MVP)

- 🔮 Predictive analytics (forecast churn, next top content)
- 🔐 User authentication + role-based dashboards
- 🚨 Anomaly detection alerts
- 🤖 AI insights engine (ChatGPT-style recommendations)
- 📲 Mobile app (React Native or PWA)
- 🔌 Real data source integration (replace mock data)
- 💬 Slack integration
- 🏢 White-label version

## Troubleshooting

### Dashboard Not Loading

```bash
# 1. Check dev server is running
npm run dev

# 2. Clear Next.js cache
rm -rf .next

# 3. Reinstall dependencies
npm ci

# 4. Check environment variables
cat .env.local
```

### Charts Not Rendering

- Check browser console for errors
- Verify mock data in `/src/data/mock.ts`
- Ensure Recharts/D3 are installed: `npm list recharts d3`

### Mobile Issues

- Try in browser dev tools (F12 → mobile toggle)
- Test touch interactions in device simulator
- Check viewport meta tag in `app/layout.tsx`

## Contributing

See [CONTRIBUTING.md](./memory-bank/CONTRIBUTING.md) for development setup and guidelines.

## License

MIT License — see [LICENSE](./LICENSE) file for details.

## Support

- 📖 **Documentation:** See `memory-bank/` folder
- 🐛 **Issues:** Report in GitHub issues
- 💬 **Questions:** Check existing issues first

---

**Last Updated:** June 16, 2026  
**Status:** MVP Planning Complete, Development Ready  
**Maintained by:** Media & Comms Corp Team
