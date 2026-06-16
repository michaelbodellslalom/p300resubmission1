"use client";

import { ErrorState } from '@/components/ErrorState';
import { KPICard } from '@/components/KPICard';
import { RevenueTrendChart } from '@/components/RevenueTrendChart';
import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';

function formatNumber(v: number) { return new Intl.NumberFormat('en-US').format(Math.round(v)); }
function formatCurrency(v: number) { return `$${formatNumber(v)}`; }

export default function RevenuePage() {
  const { data, isLoading, isError, refetch } = useFetchRevenueData();

  const latest = data?.timeline[data.timeline.length - 1];
  const earliest = data?.timeline[0];
  const trendRate = latest && earliest && earliest.totalRevenue > 0
    ? ((latest.totalRevenue - earliest.totalRevenue) / earliest.totalRevenue) * 100
    : undefined;
  const avgRpm = data?.timeline.length
    ? data.timeline.reduce((s, p) => s + p.rpm, 0) / data.timeline.length
    : undefined;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Revenue</h2>
        <p className="text-sm text-slate-400">
          Ad revenue trends, RPM performance, and format contribution breakdown.
        </p>
      </section>

      {isError && (
        <ErrorState message="Failed to load revenue data." onRetry={() => void refetch()} />
      )}

      {/* KPI strip */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          label="Total Revenue"
          value={isLoading || !latest ? '...' : formatCurrency(latest.totalRevenue)}
          tone="info"
          helperText="End-of-range total revenue"
          isLoading={isLoading || !latest}
        />
        <KPICard
          label="Revenue Trend"
          value={isLoading || trendRate === undefined ? '...' : `${trendRate.toFixed(2)}%`}
          tone={trendRate !== undefined && trendRate >= 0 ? 'success' : 'warning'}
          trendValue={trendRate}
          helperText="Start vs end of range"
          isLoading={isLoading || trendRate === undefined}
        />
        <KPICard
          label="Avg RPM"
          value={isLoading || avgRpm === undefined ? '...' : `$${avgRpm.toFixed(2)}`}
          tone="neutral"
          helperText="Revenue per thousand views"
          isLoading={isLoading || avgRpm === undefined}
        />
        <KPICard
          label="Ad Revenue"
          value={isLoading || !latest ? '...' : formatCurrency(latest.adRevenue)}
          tone="info"
          helperText="Latest period ad revenue"
          isLoading={isLoading || !latest}
        />
      </section>

      {/* Revenue trend chart (reusing shared component) */}
      <section>
        <RevenueTrendChart
          data={data?.timeline ?? []}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
        />
      </section>

      {/* Revenue by format table */}
      <section className="overflow-hidden">
        <div className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
          <div className="mb-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Revenue by Format</p>
            <p className="text-sm text-slate-300">Content count, total revenue, and average RPM per format</p>
          </div>
          <div className="overflow-x-auto rounded-md border border-slate-800/80">
            <table className="min-w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                  <th className="whitespace-nowrap pb-2 pl-2 pr-4 sm:pl-3">Format</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">Content Items</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">Total Revenue</th>
                  <th className="whitespace-nowrap pb-2 pr-2 text-right sm:pr-3">Avg RPM</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b border-slate-800/70">
                        {Array.from({ length: 4 }).map((__, j) => (
                          <td key={j} className="py-2 pr-4">
                            <div className="h-3 animate-pulse rounded bg-slate-700" style={{ width: j === 0 ? '5rem' : '4rem' }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  : (data?.byFormat ?? []).map((row) => (
                      <tr key={row.format} className="border-b border-slate-800/70 last:border-0">
                        <td className="py-2 pl-2 pr-4 sm:pl-3">
                          <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-2 py-0.5 text-xs text-teal-300">
                            {row.format}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-right text-slate-300">{row.contentCount}</td>
                        <td className="py-2 pr-4 text-right font-medium text-emerald-300">{formatCurrency(row.totalRevenue)}</td>
                        <td className="py-2 pr-2 text-right text-slate-300 sm:pr-3">${row.averageRpm.toFixed(2)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

