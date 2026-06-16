# BRIEF: Media & Comms Corp Operations Dashboard

## What This Project Is

A dark-theme operational dashboard for media and communications teams that consolidates subscriber, content, and revenue analytics into a single decision surface.

## Problem

Operational decisions are slowed by fragmented analytics views. Teams need one place to answer:

- What is happening with subscriber growth and churn?
- Which content formats are helping or hurting outcomes?
- How is revenue trending and where should monetization focus next?
- What should we do this week based on current data?

## Target Users

- Content Strategists
- Audience Insights Managers
- Revenue Operations stakeholders

## Current MVP Scope (Implemented)

1. Multi-tab dashboard experience:
- Overview
- Subscribers
- Content
- Revenue
- Insights
- Reports
- Recommendations

2. Core analytics capabilities:
- Subscriber and revenue KPIs
- Trend charts and sortable analysis tables
- Content and revenue format-level breakdowns
- Action-oriented recommendations derived from current metrics

3. Operational support capabilities:
- Date-range and content-format filtering
- CSV exports from Reports
- Session-level performance monitoring surface

4. Quality and platform requirements:
- Responsive mobile/tablet/desktop behavior
- Accessibility-focused interaction patterns
- Automated test suite plus CI verification

## Product Direction

- Data is primary; UI supports rapid interpretation and action
- Recommendation cards convert insight into clear owner/action/horizon guidance
- Performance and accessibility are treated as release quality gates, not post-launch work

## Technical Baseline

- Next.js App Router + React + TypeScript
- Zustand for dashboard state
- TanStack Query for data fetching/caching
- Recharts for visualization
- Tailwind for styling
- Mock data services for MVP

## Success Criteria

- Dashboard routes are stable and build successfully
- Core analysis flows work on mobile and desktop
- Users can export operational data via CSV
- Teams can identify immediate actions via Recommendations tab
- Test suite, type-check, and production build all pass

## Out of Scope for Current MVP

- Authentication and user roles
- Real production data integrations
- Scheduled email automation and PDF report generation
- Predictive/anomaly analytics

## Current Stage

- Testing tranche complete through T-180
- Documentation tranche in progress (T-181 complete, T-182 complete)
- Remaining launch-path work: final docs and deployment tasks
