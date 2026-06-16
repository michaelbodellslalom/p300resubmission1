# Deployment Guide

This guide covers how to validate and deploy the Media & Comms Corp Operations Dashboard.

## 1. Preconditions

- Access to the repository and deployment target (recommended: Vercel)
- Node.js 20+ available locally
- Required environment variables configured in deployment platform

## 2. Local Release Validation

Run all quality gates before deploying:

```bash
npm ci
npm test -- --runInBand
npm run type-check
npm run build
```

Optional:

```bash
npm run lint
npm run test:coverage
```

## 3. Environment Variables

Use `.env.example` as a baseline. For production, configure variables in your host platform settings rather than committing values.

## 4. Vercel Deployment (Recommended)

### Initial setup

```bash
npm i -g vercel
vercel login
vercel link
```

### Deploy preview

```bash
vercel
```

### Deploy production

```bash
vercel --prod
```

## 5. Post-Deploy Verification Checklist

After deployment, verify:

1. Route availability:
- `/dashboard`
- `/dashboard/subscribers`
- `/dashboard/content`
- `/dashboard/revenue`
- `/dashboard/insights`
- `/dashboard/reports`
- `/dashboard/recommendations`

2. API route responses:
- `/api/subscribers`
- `/api/content`
- `/api/revenue`

3. Core workflows:
- Date range changes update dashboard metrics
- Report CSV export works for all three datasets
- Recommendations cards render from current data

4. Quality checks:
- Lighthouse snapshot captured on production build
- Keyboard navigation and focus states validated on key routes
- Mobile viewport smoke test at 375px and 768px

## 6. Rollback Strategy

If production issues are detected:

1. Revert to the previous stable commit in GitHub.
2. Trigger a fresh production deployment from that commit.
3. Log incident details and root cause in follow-up notes.

## 7. Ongoing Monitoring

- Review in-app performance dashboard values from Reports during QA sessions.
- Track CI status on every push/PR before promoting release commits.
- Re-run local validation after any dependency or route-level change.
