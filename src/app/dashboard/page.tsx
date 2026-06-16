"use client";

import { KPICard } from '@/components/KPICard';
import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';
import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export default function OverviewPage() {
  const { data: subscriberData, isLoading: loadingSubscribers } = useFetchSubscriberData();
  const { data: revenueData, isLoading: loadingRevenue } = useFetchRevenueData();

  const overview = subscriberData?.overview;
  const latestRevenuePoint = revenueData?.timeline[revenueData.timeline.length - 1];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="text-sm text-slate-400">Live snapshot of subscriber health, engagement, and revenue performance.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KPICard
          label="Total Subscribers"
          value={loadingSubscribers || !overview ? '...' : formatNumber(overview.totalSubscribers)}
          tone="neutral"
          helperText="Current active subscriber base"
          isLoading={loadingSubscribers || !overview}
        />

        <KPICard
          label="Subscriber Growth"
          value={loadingSubscribers || !overview ? '...' : formatPercent(overview.subscriberGrowthRate)}
          tone="success"
          trendValue={overview?.subscriberGrowthRate}
          helperText="Net movement over selected range"
          isLoading={loadingSubscribers || !overview}
        />

        <KPICard
          label="Churn Rate"
          value={loadingSubscribers || !overview ? '...' : formatPercent(overview.churnRate)}
          tone="warning"
          trendValue={overview ? -overview.churnRate : undefined}
          helperText="Lower is better"
          isLoading={loadingSubscribers || !overview}
        />

        <KPICard
          label="Total Revenue"
          value={loadingRevenue || !latestRevenuePoint ? '...' : `$${formatNumber(latestRevenuePoint.totalRevenue)}`}
          tone="info"
          helperText="Ad + sponsored + subscription proxy"
          isLoading={loadingRevenue || !latestRevenuePoint}
        />

        <KPICard
          label="Revenue Trend"
          value={loadingSubscribers || !overview ? '...' : formatPercent(overview.revenueTrendRate)}
          tone="info"
          trendValue={overview?.revenueTrendRate}
          helperText="Momentum vs start of selected range"
          isLoading={loadingSubscribers || !overview}
        />

        <KPICard
          label="Avg Engagement"
          value={loadingSubscribers || !overview ? '...' : formatPercent(overview.avgEngagementRate)}
          tone="neutral"
          helperText="Cross-format engagement average"
          isLoading={loadingSubscribers || !overview}
        />
      </section>
    </div>
  );
}
