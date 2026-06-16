"use client";

import { useMemo, useState } from 'react';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { KPICard } from '@/components/KPICard';
import { useFetchContentData } from '@/hooks/useFetchContentData';
import { useDashboardStore } from '@/store/dashboardStore';
import { type ContentFormat } from '@/types/dashboard';

type SortKey = 'views' | 'engagementRate' | 'adRevenue' | 'rpm' | 'avgSessionMinutes';
type SortDir = 'asc' | 'desc';

const FORMAT_OPTIONS: Array<{ value: ContentFormat | 'all'; label: string }> = [
  { value: 'all', label: 'All Formats' },
  { value: 'video', label: 'Video' },
  { value: 'article', label: 'Article' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'short-form', label: 'Short-form' },
  { value: 'long-form', label: 'Long-form' },
];

function formatNumber(v: number) { return new Intl.NumberFormat('en-US').format(Math.round(v)); }
function formatCurrency(v: number) { return `$${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(v)}`; }
function formatPercent(v: number) { return `${v.toFixed(2)}%`; }

const SORT_LABELS: Record<SortKey, string> = {
  views: 'Views',
  engagementRate: 'Engagement',
  adRevenue: 'Ad Revenue',
  rpm: 'RPM',
  avgSessionMinutes: 'Avg Session',
};

export default function ContentPage() {
  const { data, isLoading, isError, refetch } = useFetchContentData();
  const setContentFormat = useDashboardStore((s) => s.setContentFormat);
  const activeFormat = useDashboardStore((s) => s.filters.contentFormat);

  const [sortKey, setSortKey] = useState<SortKey>('views');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
    setPage(0);
  };

  const sortedItems = useMemo(() => {
    const items = [...(data?.items ?? [])];
    items.sort((a, b) => {
      const diff = Number(a[sortKey]) - Number(b[sortKey]);
      return sortDir === 'asc' ? diff : -diff;
    });
    return items;
  }, [data?.items, sortKey, sortDir]);

  const pageItems = sortedItems.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE);

  // Aggregate KPIs from current filtered set
  const kpis = useMemo(() => {
    const items = data?.items ?? [];
    if (!items.length) return null;
    return {
      totalViews: items.reduce((s, i) => s + i.views, 0),
      avgEngagement: items.reduce((s, i) => s + i.engagementRate, 0) / items.length,
      totalRevenue: items.reduce((s, i) => s + i.adRevenue, 0),
      avgRpm: items.reduce((s, i) => s + i.rpm, 0) / items.length,
    };
  }, [data?.items]);

  const dirGlyph = (key: SortKey) => {
    if (key !== sortKey) return '↕';
    return sortDir === 'asc' ? '↑' : '↓';
  };

  const ariaSort = (key: SortKey): 'ascending' | 'descending' | 'none' => {
    if (key !== sortKey) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Content</h2>
        <p className="text-sm text-slate-400">
          Performance by format and content type — views, engagement, and ad revenue.
        </p>
      </section>

      {isError && (
        <ErrorState message="Failed to load content data." variant="inline" onRetry={() => void refetch()} />
      )}

      {/* Format filter */}
      <section className="relative z-10 flex flex-wrap gap-2">
        {FORMAT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => { setContentFormat(opt.value); setPage(0); }}
            className={`min-h-11 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors sm:min-h-9 sm:px-3 sm:py-1.5 sm:text-xs ${
              activeFormat === opt.value
                ? 'border-cyan-500 bg-cyan-500/20 text-cyan-200'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </section>

      {/* KPI strip */}
      <section className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <KPICard
          label="Total Views"
          value={isLoading || !kpis ? '...' : formatNumber(kpis.totalViews)}
          tone="neutral"
          helperText="Across filtered content items"
          isLoading={isLoading || !kpis}
        />
        <KPICard
          label="Avg Engagement"
          value={isLoading || !kpis ? '...' : formatPercent(kpis.avgEngagement)}
          tone="info"
          helperText="Mean engagement rate"
          isLoading={isLoading || !kpis}
        />
        <KPICard
          label="Total Ad Revenue"
          value={isLoading || !kpis ? '...' : formatCurrency(kpis.totalRevenue)}
          tone="success"
          helperText="Ad revenue from filtered items"
          isLoading={isLoading || !kpis}
        />
        <KPICard
          label="Avg RPM"
          value={isLoading || !kpis ? '...' : `$${kpis.avgRpm.toFixed(2)}`}
          tone="info"
          helperText="Revenue per thousand views"
          isLoading={isLoading || !kpis}
        />
      </section>

      {/* Content performance table */}
      <section className="overflow-hidden">
        {!isLoading && !data?.items.length ? (
          <EmptyState
            title="No content items"
            description="Adjust the format filter or date range to see content performance."
          />
        ) : (
          <div className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
            <div className="mb-3.5 flex flex-col gap-1.5 sm:mb-3 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Content Performance</p>
                <p className="text-sm text-slate-300">
                  {isLoading ? 'Loading…' : `${sortedItems.length} items — page ${page + 1} of ${totalPages || 1}`}
                </p>
              </div>
              <p className="text-[11px] text-slate-500 sm:text-xs">Click headers to sort</p>
            </div>

            <div className="overflow-x-auto rounded-md border border-slate-800/80">
              <table className="min-w-[52rem] text-left text-xs sm:min-w-full sm:text-sm">
                <caption className="sr-only">Content performance table with sortable metrics for views, engagement, ad revenue, RPM, and average session time.</caption>
                <thead>
                  <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                    <th scope="col" className="whitespace-nowrap pb-2 pl-2 pr-4 sm:pl-3">Title</th>
                    <th scope="col" className="whitespace-nowrap pb-2 pr-3 text-center">Format</th>
                    {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                      <th key={key} scope="col" aria-sort={ariaSort(key)} className="whitespace-nowrap pb-2 pr-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleSort(key)}
                          aria-label={`Sort by ${SORT_LABELS[key]}${key === sortKey ? `, currently ${sortDir === 'asc' ? 'ascending' : 'descending'}` : ''}`}
                          className="inline-flex min-h-11 items-center gap-1 px-1.5 py-2 text-sm hover:text-slate-200 sm:min-h-0 sm:px-0 sm:py-0 sm:text-xs"
                        >
                          {SORT_LABELS[key]} {dirGlyph(key)}
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-b border-slate-800/70">
                          {Array.from({ length: 7 }).map((__, j) => (
                            <td key={j} className="py-2 pr-3">
                              <div className="h-3 animate-pulse rounded bg-slate-700" style={{ width: j === 0 ? '10rem' : '4rem' }} />
                            </td>
                          ))}
                        </tr>
                      ))
                    : pageItems.map((item) => (
                        <tr key={item.id} className="border-b border-slate-800/70 last:border-0 hover:bg-slate-800/30">
                          <td className="max-w-[12rem] truncate py-2 pl-2 pr-4 text-slate-200 sm:pl-3" title={item.title}>{item.title}</td>
                          <td className="py-2 pr-3 text-center">
                            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-300">
                              {item.format}
                            </span>
                          </td>
                          <td className="py-2 pr-3 text-right text-slate-300">{formatNumber(item.views)}</td>
                          <td className="py-2 pr-3 text-right text-slate-300">{formatPercent(item.engagementRate)}</td>
                          <td className="py-2 pr-3 text-right text-emerald-300">{formatCurrency(item.adRevenue)}</td>
                          <td className="py-2 pr-3 text-right text-slate-300">${item.rpm.toFixed(2)}</td>
                          <td className="py-2 pr-3 text-right text-slate-300">{item.avgSessionMinutes.toFixed(1)}m</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="min-h-11 rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 disabled:opacity-40 sm:min-h-9 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  ← Prev
                </button>
                <span className="text-sm text-slate-400 sm:text-xs">
                  Page {page + 1} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  className="min-h-11 rounded-md border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 disabled:opacity-40 sm:min-h-9 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

