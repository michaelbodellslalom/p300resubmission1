import { type ContentMetric, type RevenueSnapshot, type SubscriberSnapshot } from '@/types/dashboard';

export const subscriberFixture: SubscriberSnapshot[] = [
  {
    date: '2026-06-01',
    totalSubscribers: 150000,
    newSubscribers: 900,
    churnedSubscribers: 420,
    churnRate: 0.28,
    netGrowth: 480,
  },
  {
    date: '2026-06-02',
    totalSubscribers: 150480,
    newSubscribers: 870,
    churnedSubscribers: 410,
    churnRate: 0.27,
    netGrowth: 460,
  },
];

export const contentFixture: ContentMetric[] = [
  {
    id: 'content-1',
    title: 'Sample Video Performance',
    format: 'video',
    type: 'tutorial',
    publishDate: '2026-06-01',
    views: 12000,
    uniqueViewers: 9000,
    engagementRate: 6.4,
    avgSessionMinutes: 4.2,
    attributedNewSubscribers: 340,
    churnInfluenceScore: 2.1,
    adRevenue: 420,
    rpm: 18.2,
  },
  {
    id: 'content-2',
    title: 'Sample Article Performance',
    format: 'article',
    type: 'analysis',
    publishDate: '2026-06-02',
    views: 8500,
    uniqueViewers: 6200,
    engagementRate: 5.8,
    avgSessionMinutes: 3.6,
    attributedNewSubscribers: 210,
    churnInfluenceScore: 2.4,
    adRevenue: 300,
    rpm: 16.3,
  },
];

export const revenueFixture: RevenueSnapshot[] = [
  {
    date: '2026-06-01',
    adRevenue: 12000,
    sponsoredRevenue: 3300,
    subscriptionRevenueProxy: 9000,
    totalRevenue: 24300,
    rpm: 18.4,
  },
  {
    date: '2026-06-02',
    adRevenue: 12200,
    sponsoredRevenue: 3500,
    subscriptionRevenueProxy: 9100,
    totalRevenue: 24800,
    rpm: 18.7,
  },
];
