"use client";

import { useMemo } from 'react';

import { ErrorState } from '@/components/ErrorState';
import { useFetchContentData } from '@/hooks/useFetchContentData';
import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';
import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';

interface RecommendationItem {
  title: string;
  why: string;
  action: string;
  owner: string;
  horizon: 'Immediate' | 'This Week' | 'Strategic';
  impact: 'High' | 'Medium';
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

export default function RecommendationsPage() {
  const {
    data: subscriberData,
    isLoading: loadingSubscribers,
    isError: subscribersError,
    refetch: refetchSubscribers,
  } = useFetchSubscriberData();

  const {
    data: contentData,
    isLoading: loadingContent,
    isError: contentError,
    refetch: refetchContent,
  } = useFetchContentData();

  const {
    data: revenueData,
    isLoading: loadingRevenue,
    isError: revenueError,
    refetch: refetchRevenue,
  } = useFetchRevenueData();

  const isLoading = loadingSubscribers || loadingContent || loadingRevenue;
  const hasError = subscribersError || contentError || revenueError;

  const recommendations = useMemo<RecommendationItem[]>(() => {
    if (!subscriberData || !contentData || !revenueData) {
      return [];
    }

    const overview = subscriberData.overview;
    const topChurn = [...subscriberData.churnReasons].sort(
      (a, b) => b.affectedSubscribers - a.affectedSubscribers,
    )[0];

    const earliestRevenue = revenueData.timeline[0];
    const latestRevenue = revenueData.timeline[revenueData.timeline.length - 1];
    const revenueTrend = earliestRevenue
      ? ((latestRevenue.totalRevenue - earliestRevenue.totalRevenue) /
          Math.max(earliestRevenue.totalRevenue, 1)) *
        100
      : 0;

    const byFormat = new Map<string, { totalEngagement: number; count: number; totalViews: number }>();
    for (const item of contentData.items) {
      const current = byFormat.get(item.format) ?? { totalEngagement: 0, count: 0, totalViews: 0 };
      current.totalEngagement += item.engagementRate;
      current.totalViews += item.views;
      current.count += 1;
      byFormat.set(item.format, current);
    }

    const formats = Array.from(byFormat.entries()).map(([format, agg]) => ({
      format,
      avgEngagement: agg.totalEngagement / Math.max(agg.count, 1),
      totalViews: agg.totalViews,
    }));

    const lowestEngagementFormat = [...formats].sort((a, b) => a.avgEngagement - b.avgEngagement)[0];
    const highestScaleFormat = [...formats].sort((a, b) => b.totalViews - a.totalViews)[0];

    return [
      {
        title: 'Reduce immediate churn risk',
        why: `Churn is ${formatPercent(overview.churnRate)} and top driver is ${topChurn?.reason ?? 'n/a'} affecting ${formatNumber(topChurn?.affectedSubscribers ?? 0)} subscribers.`,
        action: 'Launch a 7-day retention intervention for at-risk subscribers with targeted messaging and content reminders tied to recent behavior.',
        owner: 'Lifecycle Marketing',
        horizon: 'Immediate',
        impact: 'High',
      },
      {
        title: 'Fix low-engagement format drag',
        why: `${lowestEngagementFormat?.format ?? 'Lowest format'} has the weakest engagement at ${formatPercent(lowestEngagementFormat?.avgEngagement ?? 0)}.`,
        action: `Run a quick content refresh experiment on ${lowestEngagementFormat?.format ?? 'the lowest-performing format'}: shorter hooks, stronger CTAs, and tighter publishing cadence for the next two weeks.`,
        owner: 'Content Strategy',
        horizon: 'This Week',
        impact: 'Medium',
      },
      {
        title: 'Prioritize monetization on high-scale format',
        why: `${highestScaleFormat?.format ?? 'Top format'} carries the highest view volume while revenue trend is ${formatPercent(revenueTrend)} over the selected range.`,
        action: `Increase premium inventory and sponsorship packaging in ${highestScaleFormat?.format ?? 'the highest-scale format'} to compound near-term revenue gains.`,
        owner: 'Revenue Ops',
        horizon: 'This Week',
        impact: 'High',
      },
      {
        title: 'Create cross-functional weekly action loop',
        why: 'Data across subscribers, content, and revenue is available but action follow-through can drift without a fixed operating cadence.',
        action: 'Stand up a weekly recommendations review using this tab: assign owners, set due dates, and track status deltas against churn, engagement, and RPM.',
        owner: 'Insights Manager',
        horizon: 'Strategic',
        impact: 'Medium',
      },
    ];
  }, [subscriberData, contentData, revenueData]);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Recommendations</h2>
        <p className="text-sm text-slate-400">
          Suggested actions based on subscriber, content, and revenue trends to help teams prioritize what to do next.
        </p>
      </section>

      {hasError && (
        <ErrorState
          message="Unable to generate recommendations from one or more data sources."
          variant="inline"
          onRetry={() => {
            void Promise.all([refetchSubscribers(), refetchContent(), refetchRevenue()]);
          }}
        />
      )}

      {isLoading ? (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card min-h-[12rem] animate-pulse border border-slate-700 bg-slate-900/40" />
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {recommendations.map((item) => (
            <article
              key={item.title}
              className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                  {item.horizon}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
                    item.impact === 'High'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                  }`}
                >
                  {item.impact} Impact
                </span>
              </div>

              <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.why}</p>

              <div className="mt-3 rounded-md border border-slate-700 bg-slate-900/60 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">Recommended Action</p>
                <p className="mt-1 text-sm text-slate-200">{item.action}</p>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                Owner: <span className="font-semibold text-slate-300">{item.owner}</span>
              </p>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
