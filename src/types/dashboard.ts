export type ContentFormat = 'video' | 'article' | 'podcast' | 'short-form' | 'long-form';

export type DashboardTab =
  | 'overview'
  | 'subscribers'
  | 'content'
  | 'revenue'
  | 'reports'
  | 'insights';

export type ContentType =
  | 'tutorial'
  | 'news'
  | 'interview'
  | 'analysis'
  | 'opinion'
  | 'entertainment'
  | 'documentary';

export interface SubscriberSnapshot {
  date: string;
  totalSubscribers: number;
  newSubscribers: number;
  churnedSubscribers: number;
  churnRate: number;
  netGrowth: number;
}

export interface ContentMetric {
  id: string;
  title: string;
  format: ContentFormat;
  type: ContentType;
  publishDate: string;
  views: number;
  uniqueViewers: number;
  engagementRate: number;
  avgSessionMinutes: number;
  attributedNewSubscribers: number;
  churnInfluenceScore: number;
  adRevenue: number;
  rpm: number;
}

export interface RevenueSnapshot {
  date: string;
  adRevenue: number;
  sponsoredRevenue: number;
  subscriptionRevenueProxy: number;
  totalRevenue: number;
  rpm: number;
}

export interface ChurnReason {
  reason: string;
  percentage: number;
  affectedSubscribers: number;
}

export interface SubscriberCohort {
  cohortMonth: string;
  cohortSize: number;
  week4Retention: number;
  week12Retention: number;
  estimatedLtv: number;
}

export interface OverviewKPIs {
  totalSubscribers: number;
  subscriberGrowthRate: number;
  churnRate: number;
  totalRevenue: number;
  revenueTrendRate: number;
  avgEngagementRate: number;
}

export interface DateRange {
  start: string;
  end: string;
}
