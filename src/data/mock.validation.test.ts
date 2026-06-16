import {
  contentMetrics,
  filterByDateRange,
  getChurnReasonsForRange,
  getContentItems,
  getOverviewKPIs,
  getRevenueByFormat,
  revenueTimeline,
  subscriberTimeline,
} from '@/data/mock';

describe('mock data validation', () => {
  it('returns only items within date range', () => {
    const range = { start: '2026-06-01', end: '2026-06-16' };
    const filtered = filterByDateRange(subscriberTimeline, range);

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((item) => item.date >= range.start && item.date <= range.end)).toBe(true);
  });

  it('keeps churn reason percentages in sane bounds', () => {
    const reasons = getChurnReasonsForRange({ start: '2026-05-17', end: '2026-06-16' });

    expect(reasons.length).toBeGreaterThan(0);
    expect(reasons.every((reason) => reason.percentage >= 0 && reason.percentage <= 100)).toBe(true);
  });

  it('returns content scoped by format filter', () => {
    const items = getContentItems({ start: '2026-05-17', end: '2026-06-16' }, { format: 'video' });

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.format === 'video')).toBe(true);
  });

  it('returns valid overview and revenue aggregates', () => {
    const overview = getOverviewKPIs({ start: '2026-05-17', end: '2026-06-16' });
    const byFormat = getRevenueByFormat(contentMetrics);

    expect(overview.totalSubscribers).toBeGreaterThan(0);
    expect(overview.churnRate).toBeGreaterThanOrEqual(0);
    expect(byFormat.length).toBeGreaterThan(0);
    expect(byFormat.every((row) => row.totalRevenue >= 0 && row.averageRpm >= 0)).toBe(true);
  });

  it('ensures revenue timeline is chronological for range filtering', () => {
    const range = { start: '2026-05-17', end: '2026-06-16' };
    const filtered = filterByDateRange(revenueTimeline, range);

    expect(filtered.length).toBeGreaterThan(0);
    for (let i = 1; i < filtered.length; i += 1) {
      expect(filtered[i - 1]?.date <= filtered[i]?.date).toBe(true);
    }
  });
});
