# Build Task List: Media & Comms Corp Operations Dashboard

## Overview
198 tasks organized into 15 phases. Critical path runs from T-001 → T-197 (launch). All P1 tasks are prerequisites to launch.

## Phase Structure
- **Phase 0** (T-001-T-014): Scaffolding & Setup (14 tasks)
- **Phase 1** (T-015-T-022): Header & Navigation (8 tasks)
- **Phase 2** (T-023-T-034): Overview Tab - KPI Cards (12 tasks)
- **Phase 3** (T-035-T-050): Overview Tab - Charts (16 tasks)
- **Phase 4** (T-051-T-068): Subscribers Tab (18 tasks)
- **Phase 5** (T-069-T-088): Content Tab (20 tasks)
- **Phase 6** (T-089-T-104): Revenue Tab (16 tasks)
- **Phase 7** (T-105-T-116): Correlation & Insights (12 tasks)
- **Phase 8** (T-117-T-130): Reports Tab & Export (14 tasks)
- **Phase 9** (T-131-T-142): Responsiveness & Mobile (12 tasks)
- **Phase 10** (T-143-T-150): Real-Time Updates & Polling (8 tasks)
- **Phase 11** (T-151-T-164): Accessibility & Performance (14 tasks)
- **Phase 12** (T-165-T-180): Testing & Quality (16 tasks)
- **Phase 13** (T-181-T-190): Documentation & Final Polish (10 tasks)
- **Phase 14** (T-191-T-198): Deployment & Launch (8 tasks)
- **Phase 15+** (T-199-T-210): Future Enhancements (12 tasks)

## Phase 0: Project Scaffolding & Setup

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-001 | Initialize Next.js app with TypeScript, ESLint, Tailwind | M | P1 |
| T-002 | Set up directory structure | S | P1 |
| T-003 | Install UI dependencies: MUI, Recharts, Zustand, TanStack Query | M | P1 |
| T-004 | Install utility libraries | S | P1 |
| T-005 | Create Tailwind dark theme config | M | P1 |
| T-006 | Set up global Tailwind styles + dark mode | S | P1 |
| T-007 | Create mock data seed file | L | P1 |
| T-008 | Create Zustand store for dashboard state | M | P1 |
| T-009 | Create custom hook: `useFetchSubscriberData()` | M | P1 |
| T-010 | Create custom hook: `useFetchContentData()` | M | P1 |
| T-011 | Create custom hook: `useFetchRevenueData()` | M | P1 |
| T-012 | Set up API routes | M | P1 |
| T-013 | Create `.env.local` with API endpoints | S | P1 |
| T-014 | Initialize GitHub repo, first commit, README.md skeleton | S | P1 |

## Phase 1: Header & Navigation

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-015 | Create Header component | M | P1 |
| T-016 | Create last-update timestamp display | S | P2 |
| T-017 | Create Tab Navigation component | M | P1 |
| T-018 | Implement tab routing | M | P1 |
| T-019 | Create Date Range filter component | M | P1 |
| T-020 | Wire date range to global state | S | P1 |
| T-021 | Create manual refresh button | S | P1 |
| T-022 | Create Main Layout component | M | P1 |

## Phase 2: Overview Tab - KPI Cards

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-023 | Create KPI Card component (reusable) | M | P1 |
| T-024 | Create Subscriber KPI cards | M | P1 |
| T-025 | Create Revenue KPI cards | M | P1 |
| T-026 | Create Engagement KPI cards | M | P1 |
| T-027 | Wire KPI cards to subscriber data | M | P1 |
| T-028 | Wire KPI cards to revenue data | M | P1 |
| T-029 | Implement loading state for KPI cards | S | P1 |
| T-030 | Implement error state for KPI cards | S | P1 |
| T-031 | Create responsive grid layout | M | P1 |
| T-032 | Style KPI cards with design colors | S | P1 |
| T-033 | Add trend indicators | S | P1 |
| T-034 | Test KPI cards responsiveness | M | P1 |

## Phase 3: Overview Tab - Charts

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-035 | Create Subscriber Trend Chart | L | P1 |
| T-036 | Add hover tooltip to chart | S | P1 |
| T-037 | Wire chart to date range filter | M | P1 |
| T-038 | Create Revenue Trend Chart (dual-axis) | L | P1 |
| T-039 | Add legend to Revenue chart | M | P1 |
| T-040 | Wire Revenue chart to date range | M | P1 |
| T-041 | Create Churn Breakdown table | M | P1 |
| T-042 | Make table sortable | S | P1 |
| T-043 | Wire table to date range | M | P1 |
| T-044 | Create Engagement Distribution chart | M | P1 |
| T-045 | Create responsive layout for charts | M | P1 |
| T-046 | Add "No data" state | S | P1 |
| T-047 | Style charts with design colors | M | P1 |
| T-048 | Test chart responsiveness on mobile | M | P1 |
| T-049 | Implement real-time chart updates | M | P1 |
| T-050 | Add loading skeleton for charts | S | P1 |

## Phase 4: Subscribers Tab

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-051 | Create Subscribers page layout | M | P1 |
| T-052 | Create Subscriber Cohort Analysis chart | L | P1 |
| T-053 | Create Cohort table | M | P1 |
| T-054 | Create Churn Reason Breakdown chart | M | P1 |
| T-055 | Add drill-down to churn reason | M | P1 |
| T-056 | Create Subscriber LTV distribution | M | P1 |
| T-057 | Create Churn Risk table | M | P1 |
| T-058 | Wire page to subscriber data | M | P1 |
| T-059 | Add date range filtering | M | P1 |
| T-060 | Implement pagination | S | P1 |
| T-061 | Create responsive layout | M | P1 |
| T-062 | Add hover effects + drill-down | M | P1 |
| T-063 | Implement loading & error states | S | P1 |
| T-064 | Style with design colors | M | P1 |
| T-065 | Test responsiveness on mobile | M | P1 |
| T-066 | Add empty state message | S | P1 |
| T-067 | Wire real-time updates | M | P1 |
| T-068 | Create CSV export button | M | P1 |

## Phase 5: Content Tab

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-069 | Create Content page layout | M | P1 |
| T-070 | Create Content Performance table | L | P1 |
| T-071 | Wire table to content data | M | P1 |
| T-072 | Implement table sorting | M | P1 |
| T-073 | Implement pagination | S | P1 |
| T-074 | Create Content Format filter | M | P1 |
| T-075 | Create Content Type filter | M | P1 |
| T-076 | Create "Top Content" KPI card | M | P1 |
| T-077 | Create Performance Distribution chart | M | P1 |
| T-078 | Create Views vs Engagement Scatter | L | P1 |
| T-079 | Add drill-down to content | M | P1 |
| T-080 | Create Content Trend chart | M | P1 |
| T-081 | Wire filters to table | M | P1 |
| T-082 | Implement date range filtering | M | P1 |
| T-083 | Create responsive layout | L | P1 |
| T-084 | Add loading & error states | S | P1 |
| T-085 | Create empty state | S | P1 |
| T-086 | Wire real-time updates | M | P1 |
| T-087 | Create CSV export button | M | P1 |
| T-088 | Style with design colors | M | P1 |

## Phase 6: Revenue Tab

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-089 | Create Revenue page layout | M | P1 |
| T-090 | Create Revenue KPI cards | M | P1 |
| T-091 | Create RPM KPI card | M | P1 |
| T-092 | Create Revenue Trend chart (dual-axis) | L | P1 |
| T-093 | Create Revenue by Format table | M | P1 |
| T-094 | Create Revenue by Format bar chart | M | P1 |
| T-095 | Create Content vs Revenue scatter | L | P1 |
| T-096 | Create RPM Distribution chart | M | P1 |
| T-097 | Wire page to revenue data | M | P1 |
| T-098 | Implement date range filtering | M | P1 |
| T-099 | Create responsive layout | M | P1 |
| T-100 | Add loading & error states | S | P1 |
| T-101 | Wire real-time updates | M | P1 |
| T-102 | Create CSV export button | M | P1 |
| T-103 | Style with design colors | M | P1 |
| T-104 | Add drill-down to format | M | P1 |

## Phase 7: Correlation & Insights

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-105 | Create Insights page | M | P1 |
| T-106 | Create "Top Content vs New Subs" chart | M | P1 |
| T-107 | Create "Format Retention" heat map | L | P1 |
| T-108 | Create "Revenue Drivers" analysis | M | P1 |
| T-109 | Create "Churn Impact Summary" | M | P1 |
| T-110 | Create AI-generated insights cards | L | P2 |
| T-111 | Create Recommendations panel | M | P2 |
| T-112 | Wire correlations | M | P1 |
| T-113 | Implement date range filtering | M | P1 |
| T-114 | Create responsive layout | M | P1 |
| T-115 | Style with design colors | M | P1 |
| T-116 | Test responsiveness | M | P1 |

## Phase 8: Reports Tab & Export

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-117 | Create Reports page layout | M | P1 |
| T-118 | Create Report Template selection | S | P1 |
| T-119 | Create report configuration panel | M | P1 |
| T-120 | Implement PDF generation (Weekly) | L | P1 |
| T-121 | Implement PDF generation (Monthly) | L | P1 |
| T-122 | Create CSV export | M | P1 |
| T-123 | Create shareable dashboard link | M | P1 |
| T-124 | Implement URL parameter restoration | M | P1 |
| T-125 | Create export preview | M | P1 |
| T-126 | Add "Email Report" feature | M | P2 |
| T-127 | Wire real-time updates | M | P1 |
| T-128 | Create loading state | S | P1 |
| T-129 | Test exports on mobile | M | P1 |
| T-130 | Style Reports tab | M | P1 |

## Phase 9: Responsiveness & Mobile

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-131 | Create mobile nav (hamburger) | M | P1 |
| T-132 | Optimize KPI cards for mobile | S | P1 |
| T-133 | Optimize tables for mobile | M | P1 |
| T-134 | Optimize charts for mobile | M | P1 |
| T-135 | Create responsive font sizes | S | P1 |
| T-136 | Create responsive spacing | S | P1 |
| T-137 | Test across all screen sizes | L | P1 |
| T-138 | Test touch interactions | M | P1 |
| T-139 | Optimize images & assets | M | P1 |
| T-140 | Create mobile-specific drill-down | M | P1 |
| T-141 | Verify form inputs are touch-friendly | M | P1 |
| T-142 | Test performance on 4G | M | P1 |

## Phase 10: Real-Time Updates & Polling

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-143 | Implement 30-second polling | M | P1 |
| T-144 | Create refresh indicator | S | P1 |
| T-145 | Implement manual refresh button | S | P1 |
| T-146 | Implement React Query refetch | M | P1 |
| T-147 | Create data change detection | M | P2 |
| T-148 | Implement pause/resume for polling | M | P2 |
| T-149 | Handle polling errors | M | P1 |
| T-150 | Test polling at scale | M | P1 |

## Phase 11: Accessibility & Performance

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-151 | Audit WCAG AA contrast | M | P1 |
| T-152 | Add ARIA labels | M | P1 |
| T-153 | Implement keyboard navigation | M | P1 |
| T-154 | Create focus indicators | S | P1 |
| T-155 | Add alt text | S | P1 |
| T-156 | Test color-blind palette | S | P1 |
| T-157 | Optimize Lighthouse score | L | P1 |
| T-158 | Implement code splitting | M | P1 |
| T-159 | Dynamic imports for heavy libraries | M | P1 |
| T-160 | Set up performance monitoring | M | P1 |
| T-161 | Optimize database queries | M | P1 |
| T-162 | Test load time on 3G | M | P1 |
| T-163 | Implement caching strategy | L | P2 |
| T-164 | Create performance dashboard | M | P2 |

## Phase 12: Testing & Quality

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-165 | Set up Jest + React Testing Library | M | P1 |
| T-166 | Write Zustand store tests | M | P1 |
| T-167 | Write custom hooks tests | M | P1 |
| T-168 | Write KPI Card tests | M | P1 |
| T-169 | Write Data Table tests | M | P1 |
| T-170 | Write chart tests | L | P1 |
| T-171 | Write Overview tab integration test | L | P1 |
| T-172 | Write Content tab integration test | L | P1 |
| T-173 | Write Revenue tab integration test | L | P1 |
| T-174 | Write E2E tests (Cypress/Playwright) | L | P2 |
| T-175 | Test error states | M | P1 |
| T-176 | Test data validation | M | P1 |
| T-177 | Create test data fixtures | M | P1 |
| T-178 | Set up CI/CD (GitHub Actions) | M | P1 |
| T-179 | Run full test suite | M | P1 |
| T-180 | Fix tests + increase coverage | L | P1 |

## Phase 13: Documentation & Final Polish

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-181 | Write comprehensive README.md | M | P1 |
| T-182 | Write BRIEF.md | M | P1 |
| T-183 | Add LICENSE file (MIT) | S | P1 |
| T-184 | Create CONTRIBUTING.md | S | P1 |
| T-185 | Document API routes | M | P1 |
| T-186 | Document component library (Storybook) | L | P2 |
| T-187 | Create deployment guide | M | P1 |
| T-188 | Write changelog | S | P1 |
| T-189 | Create troubleshooting guide | S | P2 |
| T-190 | Final visual review + polish | M | P1 |

## Phase 14: Deployment & Launch

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-191 | Set up Vercel project | S | P1 |
| T-192 | Configure environment variables | S | P1 |
| T-193 | Run final Lighthouse audit | M | P1 |
| T-194 | Test all features on production build | M | P1 |
| T-195 | Create production checklist | M | P1 |
| T-196 | Set up error tracking (Sentry) | M | P2 |
| T-197 | Deploy to production | S | P1 |
| T-198 | Create post-launch monitoring plan | S | P1 |

## Phase 15+: Future Enhancements

| ID | Task | Size | Priority |
|-----|------|------|----------|
| T-199 | Add predictive analytics | XL | P3 |
| T-200 | Integrate real data sources | XL | P3 |
| T-201 | Implement user authentication | XL | P3 |
| T-202 | Add anomaly detection alerts | L | P3 |
| T-203 | Build admin panel | L | P3 |
| T-204 | Implement custom dashboard builder | XL | P3 |
| T-205 | Add A/B testing integration | L | P3 |
| T-206 | Build Slack integration | M | P3 |
| T-207 | Create mobile app (PWA) | XL | P3 |
| T-208 | Implement AI insights engine | XL | P3 |
| T-209 | Add data warehouse integration | L | P3 |
| T-210 | Build white-label version | XL | P3 |

---

**Total Tasks:** 198  
**Critical Path:** T-001 → T-002 → ... → T-190 → T-197 (launch)  
**P1 Tasks:** 170 (must complete before launch)  
**P2 Tasks:** 18 (post-launch improvements)  
**P3 Tasks:** 10 (future features)
