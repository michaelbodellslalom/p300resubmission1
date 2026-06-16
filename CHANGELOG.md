# Changelog

All notable changes to this project are documented in this file.

## 2026-06-16

### Added

- Recommendations tab route with action-oriented cards derived from subscriber/content/revenue signals.
- Expanded automated test coverage:
  - Custom data hooks
  - KPI card behavior
  - Churn data table states and sorting
  - Chart loading/error/empty states
  - Integration coverage for overview/content/revenue routes
  - Recommendations and reports route tests
  - Error-state and mock data validation tests
- Shared test fixture module at `src/test/fixtures/dashboardFixtures.ts`.
- GitHub Actions CI workflow to run tests, type-check, and build on push/PR.
- Documentation set:
  - API route reference (`docs/API_ROUTES.md`)
  - Contribution guide (`CONTRIBUTING.md`)
  - Deployment runbook (`DEPLOYMENT.md`)

### Changed

- Jest setup now includes a `window.matchMedia` mock for jsdom compatibility.
- README rewritten to match implemented product scope and current workflows.
- BRIEF refreshed to align with delivered MVP functionality and launch status.

### Verified

- Full validation loop passing:
  - Jest test suites green
  - TypeScript type-check green
  - Next.js production build green
