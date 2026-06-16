# Product Context

## Product Vision
Enable data-driven decision-making for media & communications teams by providing instant visibility into subscriber health, content performance, and revenue impact.

## User Goals

### Content Strategist
- Understand which content types and formats drive subscriptions
- Identify why subscribers are churning
- Track performance across time ranges to spot trends
- Make recommendations backed by data
- Share findings with stakeholders via reports

### Audience Insights Manager
- Track metrics across multiple dimensions (format, type, cohort)
- Correlate content performance with ad revenue
- Identify patterns in subscriber behavior
- Generate weekly/monthly reports
- Export data for further analysis

## Key UX Goals
1. **Single Dashboard View** — All critical metrics visible on one page
2. **Interactive Drill-Down** — Click to explore details without leaving the dashboard
3. **Flexible Time Ranges** — Quick filters (7d, 30d, 90d) + custom date picker
4. **Real-Time Feel** — Auto-refresh every 30-60 seconds with visual indicator
5. **Export-Ready** — PDF reports and CSV downloads for stakeholders
6. **Mobile-First** — Full functionality on all screen sizes
7. **Sophisticated Interactions** — D3-style hover tooltips, clickable legends, sortable tables

## Design Decisions

✅ **Dark Theme** — Bold, creative look reduces eye strain for long sessions  
✅ **Cyan/Blue Palette** — Conveys trust, tech, growth (perfect for analytics)  
✅ **Multi-Tab Layout** — Separates concerns (Overview, Subscribers, Content, Revenue, Reports)  
✅ **Public Access** — No authentication = faster iteration, lower MVP scope  
✅ **Mock Data** — Dummy data seed file enables rapid development  
✅ **Real-Time Polling** — 30-sec interval updates feel live without server complexity  
✅ **Mobile Full Functionality** — Not just responsive view, but touch-optimized UI  
✅ **Export-Centric** — CSV + PDF generation for stakeholder presentations  

## Non-Goals (MVP)
- ❌ User accounts or role-based access control
- ❌ Anomaly detection or alerting
- ❌ Predictive modeling or forecasting
- ❌ Custom dashboard builder
- ❌ Third-party analytics integration
- ❌ A/B testing platform integration

## Success Metrics
- **Performance:** <2 second page load, <5 second export generation
- **Usability:** Complete performance analysis in <3 clicks
- **Compatibility:** Works on desktop (1920px), tablet (768px), mobile (375px)
- **Quality:** >85% test coverage, Lighthouse score >90
- **User Experience:** All interactive elements responsive to filters, real-time updates visible
