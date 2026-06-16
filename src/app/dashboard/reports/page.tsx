"use client";

import { useState } from 'react';

import { useFetchContentData } from '@/hooks/useFetchContentData';
import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';
import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';
import { useDashboardStore } from '@/store/dashboardStore';

function downloadCSV(filename: string, rows: string[][]): void {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const [exporting, setExporting] = useState<string | null>(null);
  const dateRange = useDashboardStore((s) => s.dateRange);

  const { data: subData, isLoading: loadingSubs } = useFetchSubscriberData();
  const { data: contentData, isLoading: loadingContent } = useFetchContentData();
  const { data: revData, isLoading: loadingRev } = useFetchRevenueData();

  const isLoading = loadingSubs || loadingContent || loadingRev;

  const exportSubscribers = () => {
    if (!subData) return;
    setExporting('subscribers');
    const rows = [
      ['Date', 'Total Subscribers', 'New Subscribers', 'Churned', 'Churn Rate %', 'Net Growth'],
      ...subData.timeline.map((p) => [
        p.date, p.totalSubscribers, p.newSubscribers, p.churnedSubscribers,
        p.churnRate.toFixed(3), p.netGrowth,
      ]),
    ] as string[][];
    downloadCSV(`subscribers_${dateRange.start}_${dateRange.end}.csv`, rows);
    setTimeout(() => setExporting(null), 600);
  };

  const exportContent = () => {
    if (!contentData) return;
    setExporting('content');
    const rows = [
      ['ID', 'Title', 'Format', 'Type', 'Publish Date', 'Views', 'Unique Viewers',
       'Engagement Rate %', 'Avg Session Min', 'Attributed New Subs', 'Ad Revenue', 'RPM'],
      ...contentData.items.map((i) => [
        i.id, i.title, i.format, i.type, i.publishDate, i.views, i.uniqueViewers,
        i.engagementRate, i.avgSessionMinutes, i.attributedNewSubscribers, i.adRevenue, i.rpm,
      ]),
    ] as string[][];
    downloadCSV(`content_${dateRange.start}_${dateRange.end}.csv`, rows);
    setTimeout(() => setExporting(null), 600);
  };

  const exportRevenue = () => {
    if (!revData) return;
    setExporting('revenue');
    const rows = [
      ['Date', 'Ad Revenue', 'Sponsored Revenue', 'Subscription Proxy', 'Total Revenue', 'RPM'],
      ...revData.timeline.map((p) => [
        p.date, p.adRevenue, p.sponsoredRevenue, p.subscriptionRevenueProxy, p.totalRevenue, p.rpm,
      ]),
    ] as string[][];
    downloadCSV(`revenue_${dateRange.start}_${dateRange.end}.csv`, rows);
    setTimeout(() => setExporting(null), 600);
  };

  const exportActions = [
    {
      id: 'subscribers',
      label: 'Subscriber Timeline',
      description: 'Daily subscriber totals, churn, and net growth',
      onExport: exportSubscribers,
      count: subData?.timeline.length,
    },
    {
      id: 'content',
      label: 'Content Performance',
      description: 'Views, engagement, attributed subs, and ad revenue per item',
      onExport: exportContent,
      count: contentData?.items.length,
    },
    {
      id: 'revenue',
      label: 'Revenue Timeline',
      description: 'Daily ad, sponsored, and subscription revenue breakdown',
      onExport: exportRevenue,
      count: revData?.timeline.length,
    },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-sm text-slate-400">
          Export dashboard data as CSV for the selected date range.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {exportActions.map((action) => (
          <div
            key={action.id}
            className="card flex flex-col justify-between border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40"
          >
            <div>
              <p className="text-sm font-semibold text-slate-100">{action.label}</p>
              <p className="mt-1 text-xs text-slate-400">{action.description}</p>
              {!isLoading && action.count !== undefined && (
                <p className="mt-1 text-xs text-slate-500">{action.count} rows available</p>
              )}
            </div>
            <button
              type="button"
              disabled={isLoading || exporting === action.id}
              onClick={action.onExport}
              className="mt-4 rounded-md border border-cyan-600 bg-cyan-600/20 px-3 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-600/30 disabled:opacity-40"
            >
              {exporting === action.id ? 'Exporting…' : isLoading ? 'Loading…' : 'Export CSV'}
            </button>
          </div>
        ))}
      </section>

      <section>
        <div className="card border border-slate-700/60 bg-slate-900/30">
          <p className="text-xs uppercase tracking-wide text-slate-500">Coming Soon</p>
          <p className="mt-1 text-sm text-slate-400">
            PDF snapshots, scheduled email reports, and shareable dashboard links are planned for a future release.
          </p>
        </div>
      </section>
    </div>
  );
}

