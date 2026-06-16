import {
  type ChurnReason,
  type ContentFormat,
  type ContentMetric,
  type ContentType,
  type DateRange,
  type OverviewKPIs,
  type RevenueSnapshot,
  type SubscriberCohort,
  type SubscriberSnapshot,
} from '@/types/dashboard';

const DAY_MS = 24 * 60 * 60 * 1000;
const START_SUBSCRIBERS = 140000;
const dateEpochCache = new Map<string, number>();

const formats: ContentFormat[] = ['video', 'article', 'podcast', 'short-form', 'long-form'];
const types: ContentType[] = [
  'tutorial',
  'news',
  'interview',
  'analysis',
  'opinion',
  'entertainment',
  'documentary',
];

function toIsoDate(date: Date): string {
  return date.toISOString().split('T')[0] || '';
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function round(value: number, precision = 2): number {
  const factor = 10 ** precision;
  return Math.round(value * factor) / factor;
}

function rangeDays(backDays: number): Date[] {
  const today = new Date();
  return Array.from({ length: backDays }, (_, idx) => {
    const dayOffset = backDays - idx - 1;
    return new Date(today.getTime() - dayOffset * DAY_MS);
  });
}

function toEpoch(dateString: string): number {
  const cached = dateEpochCache.get(dateString);
  if (cached !== undefined) {
    return cached;
  }

  const epoch = Date.parse(dateString);
  dateEpochCache.set(dateString, epoch);
  return epoch;
}

function generateSubscriberTimeline(backDays = 180): SubscriberSnapshot[] {
  let runningTotal = START_SUBSCRIBERS;

  return rangeDays(backDays).map((date, idx) => {
    // Growth pattern with mild seasonality and occasional churn spikes.
    const seasonal = Math.sin(idx / 10) * 180;
    const trend = idx * 1.8;
    const campaignBoost = idx % 28 < 6 ? 220 : 0;
    const newSubscribers = Math.max(120, Math.round(460 + seasonal + trend + campaignBoost));

    const churnSpike = idx % 45 > 35 ? 120 : 0;
    const churnedSubscribers = Math.max(
      70,
      Math.round(newSubscribers * (0.52 + Math.cos(idx / 14) * 0.12) + churnSpike),
    );

    const netGrowth = newSubscribers - churnedSubscribers;
    runningTotal += netGrowth;

    return {
      date: toIsoDate(date),
      totalSubscribers: runningTotal,
      newSubscribers,
      churnedSubscribers,
      churnRate: round((churnedSubscribers / Math.max(runningTotal, 1)) * 100, 3),
      netGrowth,
    };
  });
}

function buildContentTitle(type: ContentType, format: ContentFormat, idx: number): string {
  const typeLabel = type[0].toUpperCase() + type.slice(1);
  const formatLabel = format[0].toUpperCase() + format.slice(1);
  return `${typeLabel} Strategy ${idx + 1} (${formatLabel})`;
}

function generateContentMetrics(itemCount = 72): ContentMetric[] {
  const today = new Date();

  return Array.from({ length: itemCount }, (_, idx) => {
    const format = formats[idx % formats.length] as ContentFormat;
    const type = types[idx % types.length] as ContentType;

    const publishDate = new Date(today.getTime() - (idx + 1) * 2 * DAY_MS);
    const formatBoost = format === 'video' ? 1.4 : format === 'podcast' ? 1.15 : 1;
    const typeBoost = type === 'tutorial' || type === 'analysis' ? 1.2 : 1;

    const views = Math.round((16000 + idx * 1450) * formatBoost * typeBoost);
    const uniqueViewers = Math.round(views * 0.72);
    const engagementRate = round(clamp(3.8 + (idx % 9) * 0.48 + formatBoost * 0.55, 2.6, 12.4), 2);
    const avgSessionMinutes = round(clamp(2.2 + (idx % 6) * 0.9 + formatBoost * 0.5, 1.8, 9.8), 2);

    const attributedNewSubscribers = Math.round(views * (0.006 + engagementRate / 1000));
    const churnInfluenceScore = round(clamp(6.4 - engagementRate * 0.38 + (idx % 4) * 0.3, 0.5, 8.9), 2);

    const rpm = round(clamp(14 + (idx % 8) * 1.1 + formatBoost * 2.2, 12.8, 26.5), 2);
    const adRevenue = round((views / 1000) * rpm, 2);

    return {
      id: `content-${idx + 1}`,
      title: buildContentTitle(type, format, idx),
      format,
      type,
      publishDate: toIsoDate(publishDate),
      views,
      uniqueViewers,
      engagementRate,
      avgSessionMinutes,
      attributedNewSubscribers,
      churnInfluenceScore,
      adRevenue,
      rpm,
    };
  });
}

function generateRevenueTimeline(
  subscribers: SubscriberSnapshot[],
  content: ContentMetric[],
): RevenueSnapshot[] {
  const avgRpm =
    content.reduce((sum, item) => sum + item.rpm, 0) / Math.max(content.length, 1);

  return subscribers.map((point, idx) => {
    const adRevenue = round(
      16000 + idx * 86 + point.newSubscribers * 1.6 + Math.sin(idx / 8) * 1200,
      2,
    );
    const sponsoredRevenue = round(4200 + (idx % 15) * 140 + Math.cos(idx / 9) * 320, 2);
    const subscriptionRevenueProxy = round(point.totalSubscribers * 0.084, 2);
    const totalRevenue = round(adRevenue + sponsoredRevenue + subscriptionRevenueProxy, 2);
    const rpm = round(clamp(avgRpm + Math.sin(idx / 11) * 1.4, 12.5, 28), 2);

    return {
      date: point.date,
      adRevenue,
      sponsoredRevenue,
      subscriptionRevenueProxy,
      totalRevenue,
      rpm,
    };
  });
}

function generateCohorts(months = 12): SubscriberCohort[] {
  const today = new Date();

  return Array.from({ length: months }, (_, idx) => {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - (months - idx - 1), 1);
    const cohortSize = 2800 + idx * 170;
    const week4Retention = round(clamp(76 + idx * 0.4 + Math.sin(idx) * 2.4, 70, 91), 2);
    const week12Retention = round(clamp(61 + idx * 0.48 + Math.cos(idx / 2) * 2, 53, 83), 2);
    const estimatedLtv = round(84 + idx * 1.9 + week12Retention * 0.7, 2);

    return {
      cohortMonth: monthDate.toLocaleString('en-US', { month: 'short', year: 'numeric' }),
      cohortSize,
      week4Retention,
      week12Retention,
      estimatedLtv,
    };
  });
}

const churnReasonBlueprint: Array<{ reason: string; weight: number }> = [
  { reason: 'Low content relevance', weight: 27 },
  { reason: 'Posting cadence inconsistency', weight: 18 },
  { reason: 'Price sensitivity', weight: 16 },
  { reason: 'Competitor migration', weight: 14 },
  { reason: 'Ad load dissatisfaction', weight: 11 },
  { reason: 'UX friction', weight: 8 },
  { reason: 'Other', weight: 6 },
];

function generateChurnReasonsFromWeights(totalChurned: number, weights: number[]): ChurnReason[] {
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

  return churnReasonBlueprint.map((item, idx) => {
    const normalizedShare = weights[idx] / Math.max(weightSum, 1);
    return {
      reason: item.reason,
      percentage: round(normalizedShare * 100, 1),
      affectedSubscribers: Math.round(normalizedShare * totalChurned),
    };
  });
}

export const subscriberTimeline = generateSubscriberTimeline(180);
export const contentMetrics = generateContentMetrics(72);
export const revenueTimeline = generateRevenueTimeline(subscriberTimeline, contentMetrics);
export const subscriberCohorts = generateCohorts(12);

export function filterByDateRange<T extends { date: string }>(
  items: T[],
  dateRange: DateRange,
): T[] {
  const start = toEpoch(dateRange.start);
  const end = toEpoch(dateRange.end);

  return items.filter((item) => {
    const date = toEpoch(item.date);
    return date >= start && date <= end;
  });
}

export function getContentItems(range?: DateRange, filters?: { format?: string; type?: string }): ContentMetric[] {
  const scoped = range
    ? contentMetrics.filter((item) => {
        const publishEpoch = toEpoch(item.publishDate);
        return publishEpoch >= toEpoch(range.start) && publishEpoch <= toEpoch(range.end);
      })
    : contentMetrics;

  const format = filters?.format ?? 'all';
  const type = filters?.type ?? 'all';

  return scoped
    .filter((item) => (format === 'all' ? true : item.format === format))
    .filter((item) => (type === 'all' ? true : item.type === type));
}

export function getChurnReasonsForRange(range?: DateRange): ChurnReason[] {
  const subs = range ? filterByDateRange(subscriberTimeline, range) : subscriberTimeline;
  const totalChurned = subs.reduce((sum, point) => sum + point.churnedSubscribers, 0);

  if (!subs.length || totalChurned <= 0) {
    return [];
  }

  const avgChurnRate =
    subs.reduce((sum, point) => sum + point.churnRate, 0) / Math.max(subs.length, 1);
  const latestChurnRate = subs[subs.length - 1]?.churnRate ?? avgChurnRate;

  const adjustedWeights = churnReasonBlueprint.map((item) => {
    if (item.reason === 'Low content relevance') {
      return item.weight * (1 + clamp((avgChurnRate - 0.23) * 0.9, -0.12, 0.2));
    }
    if (item.reason === 'Posting cadence inconsistency') {
      return item.weight * (1 + (subs.length < 21 ? 0.1 : -0.03));
    }
    if (item.reason === 'Price sensitivity') {
      return item.weight * (1 + clamp((30 - subs.length) / 130, -0.06, 0.12));
    }
    if (item.reason === 'Competitor migration') {
      return item.weight * (1 + clamp((latestChurnRate - avgChurnRate) * 3.5, -0.1, 0.1));
    }
    if (item.reason === 'Ad load dissatisfaction') {
      return item.weight * (1 + clamp((avgChurnRate - 0.2) * 0.7, -0.08, 0.12));
    }
    if (item.reason === 'UX friction') {
      return item.weight * (1 + clamp((21 - subs.length) / 120, -0.05, 0.08));
    }

    return item.weight;
  });

  return generateChurnReasonsFromWeights(totalChurned, adjustedWeights);
}

export function getOverviewKPIs(range?: DateRange): OverviewKPIs {
  const subs = range ? filterByDateRange(subscriberTimeline, range) : subscriberTimeline;
  const rev = range ? filterByDateRange(revenueTimeline, range) : revenueTimeline;

  const latestSub = subs[subs.length - 1] ?? subscriberTimeline[subscriberTimeline.length - 1];
  const earliestSub = subs[0] ?? subscriberTimeline[0];

  const latestRev = rev[rev.length - 1] ?? revenueTimeline[revenueTimeline.length - 1];
  const earliestRev = rev[0] ?? revenueTimeline[0];

  const subscriberGrowthRate =
    ((latestSub.totalSubscribers - earliestSub.totalSubscribers) /
      Math.max(earliestSub.totalSubscribers, 1)) *
    100;

  const churnRate =
    (subs.reduce((sum, point) => sum + point.churnedSubscribers, 0) /
      Math.max(subs.reduce((sum, point) => sum + point.totalSubscribers, 0), 1)) *
    100;

  const revenueTrendRate =
    ((latestRev.totalRevenue - earliestRev.totalRevenue) / Math.max(earliestRev.totalRevenue, 1)) *
    100;

  const avgEngagementRate =
    contentMetrics.reduce((sum, item) => sum + item.engagementRate, 0) /
    Math.max(contentMetrics.length, 1);

  return {
    totalSubscribers: latestSub.totalSubscribers,
    subscriberGrowthRate: round(subscriberGrowthRate, 2),
    churnRate: round(churnRate, 3),
    totalRevenue: round(latestRev.totalRevenue, 2),
    revenueTrendRate: round(revenueTrendRate, 2),
    avgEngagementRate: round(avgEngagementRate, 2),
  };
}

export function getTopContentBy(metric: keyof Pick<ContentMetric, 'views' | 'engagementRate' | 'adRevenue'>, count = 5): ContentMetric[] {
  return [...contentMetrics]
    .sort((a, b) => Number(b[metric]) - Number(a[metric]))
    .slice(0, count);
}

export function getRevenueByFormat(items: ContentMetric[] = contentMetrics): Array<{
  format: ContentFormat;
  contentCount: number;
  totalRevenue: number;
  averageRpm: number;
}> {
  return formats.map((format) => {
    const formatItems = items.filter((item) => item.format === format);
    const totalRevenue = formatItems.reduce((sum, item) => sum + item.adRevenue, 0);
    const averageRpm = formatItems.reduce((sum, item) => sum + item.rpm, 0) / Math.max(formatItems.length, 1);

    return {
      format,
      contentCount: formatItems.length,
      totalRevenue: round(totalRevenue, 2),
      averageRpm: round(averageRpm, 2),
    };
  });
}

export function getContentPerformanceByFormat(items: ContentMetric[] = contentMetrics): Array<{
  format: ContentFormat;
  averageViews: number;
  averageEngagementRate: number;
  averageAttributedSubscribers: number;
}> {
  return formats.map((format) => {
    const formatItems = items.filter((item) => item.format === format);

    return {
      format,
      averageViews: Math.round(formatItems.reduce((sum, item) => sum + item.views, 0) / Math.max(formatItems.length, 1)),
      averageEngagementRate: round(
        formatItems.reduce((sum, item) => sum + item.engagementRate, 0) / Math.max(formatItems.length, 1),
        2,
      ),
      averageAttributedSubscribers: Math.round(
        formatItems.reduce((sum, item) => sum + item.attributedNewSubscribers, 0) / Math.max(formatItems.length, 1),
      ),
    };
  });
}
