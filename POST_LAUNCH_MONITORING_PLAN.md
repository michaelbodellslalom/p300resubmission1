# Post-Launch Monitoring Plan

## Goals

- Detect regressions quickly after release
- Monitor route performance and user-facing stability
- Keep data export and dashboard route availability reliable

## Monitoring Windows

1. Launch day (first 24 hours)
- Check production route/API availability every 2-4 hours
- Verify CSV export behavior at least twice
- Capture at least one Lighthouse run on `/dashboard`

2. Week 1
- Daily route/API checks
- Two Lighthouse checks (start and end of week)
- Verify no CI quality regressions on merged commits

3. Ongoing cadence
- Weekly Lighthouse baseline check
- Weekly visual QA pass across all dashboard tabs
- Monthly review of documentation and runbooks

## What to Monitor

### Availability

- Core routes:
  - `/dashboard`
  - `/dashboard/subscribers`
  - `/dashboard/content`
  - `/dashboard/revenue`
  - `/dashboard/insights`
  - `/dashboard/reports`
  - `/dashboard/recommendations`
- API routes:
  - `/api/subscribers`
  - `/api/content`
  - `/api/revenue`

### Performance

- Lighthouse category scores (Perf/A11y/Best Practices/SEO)
- LCP and TBT on primary dashboard routes
- In-session metrics visible in Reports performance dashboard

### Functional Health

- Date-range changes update dashboard values
- Report CSV export remains usable
- Recommendation cards render with expected action structure

## Incident Response Basics

1. Reproduce issue on production URL.
2. Identify last known good deployment.
3. Roll back if user-impacting and no hotfix is ready.
4. Log root cause and mitigation in CHANGELOG or incident notes.

## Owners

- Release owner: project maintainer
- QA verification: dashboard maintainer
- Performance checks: dashboard maintainer

## References

- `DEPLOYMENT.md`
- `PRODUCTION_CHECKLIST.md`
- `CHANGELOG.md`
- `.github/workflows/ci.yml`
