# API Routes

This project currently serves mock-backed analytics data through three Next.js route handlers.

Base URL in local development:

```text
http://localhost:3000/api
```

## Common Behavior

- Method: `GET`
- Date query support: `start` and `end` (`YYYY-MM-DD`)
- Default range when omitted: last 30 days ending today
- Response cache header: `Cache-Control` set from shared policy in `src/utils/cachePolicy.ts`

## GET /api/subscribers

Returns subscriber timeline, cohorts, churn reasons, and overview KPIs for the selected range.

### Query Parameters

- `start` (optional): range start date, format `YYYY-MM-DD`
- `end` (optional): range end date, format `YYYY-MM-DD`

### Example

```bash
curl "http://localhost:3000/api/subscribers?start=2026-06-01&end=2026-06-16"
```

### Response Shape

```json
{
  "timeline": [
    {
      "date": "2026-06-01",
      "totalSubscribers": 150000,
      "newSubscribers": 900,
      "churnedSubscribers": 420,
      "churnRate": 0.28,
      "netGrowth": 480
    }
  ],
  "cohorts": [
    {
      "cohort": "2026-01",
      "week1Retention": 0.92
    }
  ],
  "churnReasons": [
    {
      "reason": "Price sensitivity",
      "percentage": 24.5,
      "affectedSubscribers": 1300
    }
  ],
  "overview": {
    "totalSubscribers": 150000,
    "subscriberGrowthRate": 3.2,
    "churnRate": 0.28,
    "totalRevenue": 98000,
    "revenueTrendRate": 4.5,
    "avgEngagementRate": 6.1
  }
}
```

## GET /api/content

Returns content items filtered by date and optional format/type, plus aggregate by-format performance.

### Query Parameters

- `start` (optional): range start date
- `end` (optional): range end date
- `format` (optional): content format filter (`video`, `article`, `podcast`, `all`, etc.)
- `type` (optional): content type filter (`tutorial`, `analysis`, `all`, etc.)

### Example

```bash
curl "http://localhost:3000/api/content?start=2026-06-01&end=2026-06-16&format=video&type=all"
```

### Response Shape

```json
{
  "items": [
    {
      "id": "content-1",
      "title": "Sample Video Performance",
      "format": "video",
      "type": "tutorial",
      "publishDate": "2026-06-01",
      "views": 12000,
      "uniqueViewers": 9000,
      "engagementRate": 6.4,
      "avgSessionMinutes": 4.2,
      "attributedNewSubscribers": 340,
      "churnInfluenceScore": 2.1,
      "adRevenue": 420,
      "rpm": 18.2
    }
  ],
  "totalItems": 1,
  "byFormat": [
    {
      "format": "video",
      "contentCount": 12,
      "avgViews": 11000,
      "avgEngagementRate": 5.9,
      "totalAttributedSubs": 2400,
      "totalRevenue": 8400,
      "averageRpm": 17.8
    }
  ]
}
```

## GET /api/revenue

Returns revenue timeline and revenue-by-format aggregates for the selected range.

### Query Parameters

- `start` (optional): range start date
- `end` (optional): range end date

### Example

```bash
curl "http://localhost:3000/api/revenue?start=2026-06-01&end=2026-06-16"
```

### Response Shape

```json
{
  "timeline": [
    {
      "date": "2026-06-01",
      "adRevenue": 12000,
      "sponsoredRevenue": 3300,
      "subscriptionRevenueProxy": 9000,
      "totalRevenue": 24300,
      "rpm": 18.4
    }
  ],
  "byFormat": [
    {
      "format": "video",
      "contentCount": 5,
      "totalRevenue": 8000,
      "averageRpm": 19.2
    }
  ]
}
```
