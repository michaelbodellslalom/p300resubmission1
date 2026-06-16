"use client";

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
        <article className="card">
          <p className="text-xs uppercase tracking-wide text-slate-400">Total Subscribers</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {loadingSubscribers || !overview ? '...' : formatNumber(overview.totalSubscribers)}
          </p>
        </article>

        <article className="card">
          <p className="text-xs uppercase tracking-wide text-slate-400">Subscriber Growth</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {loadingSubscribers || !overview ? '...' : formatPercent(overview.subscriberGrowthRate)}
          </p>
        </article>

        <article className="card">
          <p className="text-xs uppercase tracking-wide text-slate-400">Churn Rate</p>
          <p className="mt-2 text-3xl font-bold text-amber-400">
            {loadingSubscribers || !overview ? '...' : formatPercent(overview.churnRate)}
          </p>
        </article>

        <article className="card">
          <p className="text-xs uppercase tracking-wide text-slate-400">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-cyan-300">
            {loadingRevenue || !latestRevenuePoint ? '...' : `$${formatNumber(latestRevenuePoint.totalRevenue)}`}
          </p>
        </article>

        <article className="card">
          <p className="text-xs uppercase tracking-wide text-slate-400">Revenue Trend</p>
          <p className="mt-2 text-3xl font-bold text-cyan-300">
            {loadingSubscribers || !overview ? '...' : formatPercent(overview.revenueTrendRate)}
          </p>
        </article>

        <article className="card">
          <p className="text-xs uppercase tracking-wide text-slate-400">Avg Engagement</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {loadingSubscribers || !overview ? '...' : formatPercent(overview.avgEngagementRate)}
          </p>
        </article>
      </section>
    </div>
  );
}
