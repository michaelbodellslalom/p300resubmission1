"use client";

import { useMemo } from 'react';

import { ContentEngagementScatter } from '@/components/ContentEngagementScatter';
import { ErrorState } from '@/components/ErrorState';
import { useFetchContentData } from '@/hooks/useFetchContentData';
import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';
import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';

function formatNumber(v: number) { return new Intl.NumberFormat('en-US').format(Math.round(v)); }
function formatCurrency(v: number) { return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v)}`; }

interface InsightCardProps {
  label: string;
  value: string;
  subtext: string;
  accent: string;
}

function InsightCard({ label, value, subtext, accent }: InsightCardProps) {
  return (
    <div className={`card border ${accent} bg-gradient-to-b from-slate-800/70 to-slate-900/40`}>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-100">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{subtext}</p>
    </div>
  );
}

export default function InsightsPage() {
  const {
    data: subData,
    isLoading: loadingSubs,
    isError: subError,
    refetch: refetchSubs,
  } = useFetchSubscriberData();

  const {
    data: contentData,
    isLoading: loadingContent,
    isError: contentError,
    refetch: refetchContent,
  } = useFetchContentData();

  const {
    data: revData,
    isLoading: loadingRev,
    isError: revError,
    refetch: refetchRev,
  } = useFetchRevenueData();

  const isLoading = loadingSubs || loadingContent || loadingRev;
  const isError = subError || contentError || revError;

  const handleRetry = () => {
    void refetchSubs();
    void refetchContent();
    void refetchRev();
  };

  // Derived insight values
  const topContent = useMemo(() => {
    const items = contentData?.items ?? [];
    return [...items].sort((a, b) => b.attributedNewSubscribers - a.attributedNewSubscribers).slice(0, 5);
  }, [contentData?.items]);

  const topRevenueContent = useMemo(() => {
    const items = contentData?.items ?? [];
    return [...items].sort((a, b) => b.adRevenue - a.adRevenue).slice(0, 1)[0];
  }, [contentData?.items]);

  const lowestChurnDriver = useMemo(() => {
    const reasons = subData?.churnReasons ?? [];
    return [...reasons].sort((a, b) => b.affectedSubscribers - a.affectedSubscribers)[0];
  }, [subData?.churnReasons]);

  const avgEngagementByFormat = useMemo(() => {
    const items = contentData?.items ?? [];
    if (!items.length) return null;
    const byFmt = new Map<string, number[]>();
    for (const item of items) {
      if (!byFmt.has(item.format)) byFmt.set(item.format, []);
      byFmt.get(item.format)!.push(item.engagementRate);
    }
    let bestFmt = '';
    let bestAvg = -Infinity;
    byFmt.forEach((rates, fmt) => {
      const avg = rates.reduce((s, r) => s + r, 0) / rates.length;
      if (avg > bestAvg) { bestAvg = avg; bestFmt = fmt; }
    });
    return { format: bestFmt, avg: bestAvg };
  }, [contentData?.items]);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Insights</h2>
        <p className="text-sm text-slate-400">
          Correlation analysis between content performance, subscriber movement, and revenue impact.
        </p>
      </section>

      {isError && (
        <ErrorState message="Failed to load one or more insight data sources." variant="inline" onRetry={handleRetry} />
      )}

      {/* Key insight cards */}
      <section className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        <InsightCard
          label="Top Sub Driver"
          value={isLoading ? '…' : (() => {
            const t = topContent[0]?.title ?? '';
            return t.length > 28 ? t.slice(0, 28) + '…' : t || '—';
          })()}
          subtext={isLoading ? '' : `${formatNumber(topContent[0]?.attributedNewSubscribers ?? 0)} attributed new subs`}
          accent="border-cyan-500/25"
        />
        <InsightCard
          label="Top Revenue Content"
          value={isLoading ? '…' : (topRevenueContent?.format ?? '—').toUpperCase()}
          subtext={isLoading ? '' : `${topRevenueContent ? formatCurrency(topRevenueContent.adRevenue) : '—'} ad revenue`}
          accent="border-emerald-500/25"
        />
        <InsightCard
          label="Highest Churn Risk"
          value={isLoading ? '…' : (lowestChurnDriver?.reason?.split(' ').slice(0, 3).join(' ') ?? '—')}
          subtext={isLoading ? '' : `Affects ${formatNumber(lowestChurnDriver?.affectedSubscribers ?? 0)} subscribers`}
          accent="border-rose-500/25"
        />
        <InsightCard
          label="Best Engagement Format"
          value={isLoading || !avgEngagementByFormat ? '…' : avgEngagementByFormat.format}
          subtext={isLoading || !avgEngagementByFormat ? '' : `${avgEngagementByFormat.avg.toFixed(2)}% average engagement`}
          accent="border-indigo-500/25"
        />
        <InsightCard
          label="Total Attributed Subs"
          value={isLoading ? '…' : formatNumber((contentData?.items ?? []).reduce((s, i) => s + i.attributedNewSubscribers, 0))}
          subtext="Content-attributed subscriber acquisitions"
          accent="border-cyan-500/20"
        />
        <InsightCard
          label="Avg Churn Rate"
          value={isLoading ? '…' : `${(subData?.overview.churnRate ?? 0).toFixed(3)}%`}
          subtext="Across selected date range"
          accent="border-amber-500/20"
        />
      </section>

      {/* Scatter chart */}
      <section>
        <ContentEngagementScatter
          data={contentData?.items ?? []}
          isLoading={loadingContent}
          isError={contentError}
          onRetry={() => void refetchContent()}
        />
      </section>

      {/* Top content by attributed subscribers */}
      <section className="overflow-hidden">
        <div className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
          <div className="mb-3.5 space-y-1 sm:mb-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Top Content by Subscriber Impact</p>
            <p className="text-sm text-slate-300 sm:text-sm">Content pieces driving the most new subscriber acquisitions</p>
          </div>
          <div className="overflow-x-auto rounded-md border border-slate-800/80">
            <table className="min-w-[42rem] text-left text-xs sm:min-w-full sm:text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                  <th className="whitespace-nowrap pb-2 pl-2 pr-4 sm:pl-3">Title</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-center">Format</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">Views</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">Engagement</th>
                  <th className="whitespace-nowrap pb-2 pr-2 text-right sm:pr-3">New Subs</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b border-slate-800/70">
                        {Array.from({ length: 5 }).map((__, j) => (
                          <td key={j} className="py-2 pr-4">
                            <div className="h-3 animate-pulse rounded bg-slate-700" style={{ width: j === 0 ? '10rem' : '4rem' }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  : topContent.map((item) => (
                      <tr key={item.id} className="border-b border-slate-800/70 last:border-0">
                        <td className="max-w-[11rem] truncate py-2 pl-2 pr-4 text-slate-200 sm:pl-3" title={item.title}>{item.title}</td>
                        <td className="py-2 pr-4 text-center">
                          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                            {item.format}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-right text-slate-300">{formatNumber(item.views)}</td>
                        <td className="py-2 pr-4 text-right text-slate-300">{item.engagementRate.toFixed(2)}%</td>
                        <td className="py-2 pr-2 text-right font-semibold text-cyan-300 sm:pr-3">+{formatNumber(item.attributedNewSubscribers)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Revenue drivers summary */}
      <section className="overflow-hidden">
        <div className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
          <div className="mb-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Revenue Drivers</p>
            <p className="text-sm text-slate-300">Sponsorship, ad, and subscription proxy breakdown from latest revenue point</p>
          </div>
          {isLoading || !revData?.timeline.length ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 animate-pulse rounded bg-slate-700" style={{ width: i === 0 ? '80%' : i === 1 ? '60%' : '70%' }} />
              ))}
            </div>
          ) : (() => {
            const latest = revData.timeline[revData.timeline.length - 1]!;
            const total = latest.totalRevenue;
            const rows = [
              { label: 'Ad Revenue', value: latest.adRevenue, color: 'bg-teal-500' },
              { label: 'Sponsored Revenue', value: latest.sponsoredRevenue, color: 'bg-cyan-500' },
              { label: 'Subscription Proxy', value: latest.subscriptionRevenueProxy, color: 'bg-indigo-500' },
            ];
            return (
              <div className="space-y-3">
                {rows.map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-slate-300">{row.label}</span>
                      <span className="font-medium text-slate-200">{formatCurrency(row.value)} ({total > 0 ? ((row.value / total) * 100).toFixed(1) : '0'}%)</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                      <div
                        className={`h-full rounded-full ${row.color}`}
                        style={{ width: `${total > 0 ? (row.value / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}

