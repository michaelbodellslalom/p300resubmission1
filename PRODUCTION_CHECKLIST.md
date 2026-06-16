# Production Checklist

## Pre-Deploy

- [x] CI workflow passing (test, type-check, build)
- [x] Local validation run complete (`npm test -- --runInBand && npm run type-check && npm run build`)
- [x] README and launch documentation updated
- [x] API routes documented
- [x] Deployment runbook present

## Vercel Setup

- [x] Vercel project linked (`p300-resubmission1`)
- [x] GitHub repository connected
- [x] Production environment variables configured:
  - `NEXT_PUBLIC_API_BASE_URL`
  - `NEXT_PUBLIC_POLLING_INTERVAL`
- [x] Preview environment variables configured:
  - `NEXT_PUBLIC_API_BASE_URL`
  - `NEXT_PUBLIC_POLLING_INTERVAL`

## Deployment

- [x] Production deployment completed
- [x] Production alias active: `https://p300-resubmission1.vercel.app`

## Post-Deploy Verification

- [x] Production routes respond with HTTP 200:
  - `/dashboard`
  - `/dashboard/subscribers`
  - `/dashboard/content`
  - `/dashboard/revenue`
  - `/dashboard/insights`
  - `/dashboard/reports`
  - `/dashboard/recommendations`
- [x] API routes respond with HTTP 200:
  - `/api/subscribers`
  - `/api/content`
  - `/api/revenue`
- [x] Lighthouse production audit captured for `/dashboard`

## Audit Snapshot

- Performance: 96
- Accessibility: 100
- Best Practices: 96
- SEO: 100
- LCP: 1668 ms
- TBT: 182 ms

## Follow-Up

- [ ] Add error tracking provider if desired (Sentry task remains optional)
- [ ] Continue route-level Lighthouse spot checks for subscribers/revenue/insights
- [ ] Perform final mobile interaction QA on production URL
