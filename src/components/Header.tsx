"use client";

import { useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { DateRangeFilter } from '@/components/DateRangeFilter';
import { useDashboardStore } from '@/store/dashboardStore';

function formatLastUpdated(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const queryClient = useQueryClient();
  const dateRange = useDashboardStore((state) => state.dateRange);
  const setDateRange = useDashboardStore((state) => state.setDateRange);
  const lastUpdatedAt = useDashboardStore((state) => state.lastUpdatedAt);
  const isRefreshing = useDashboardStore((state) => state.isRefreshing);
  const markRefreshing = useDashboardStore((state) => state.markRefreshing);
  const markUpdated = useDashboardStore((state) => state.markUpdated);

  const refreshLabel = useMemo(() => {
    if (!isMounted) return 'Updated --:--';
    if (isRefreshing) return 'Refreshing...';
    return `Updated ${formatLastUpdated(lastUpdatedAt)}`;
  }, [isMounted, isRefreshing, lastUpdatedAt]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRefresh = async () => {
    if (isRefreshing) return;
    markRefreshing(true);
    try {
      await queryClient.invalidateQueries();
    } finally {
      markUpdated();
    }
  };

  return (
    <header className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-4 md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400">Media & Comms Corp</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-100 md:text-3xl">Operational Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">Subscriber growth, churn, format performance, and ad revenue trends</p>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRefresh}
              className="min-h-11 rounded-md border border-cyan-600 bg-cyan-600/20 px-3.5 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-600/30 sm:min-h-9 sm:px-3 sm:py-2"
            >
              {isRefreshing ? 'Refreshing' : 'Refresh'}
            </button>
            <span
              suppressHydrationWarning
              role="status"
              aria-live="polite"
              className="pointer-events-none text-xs text-slate-400"
            >
              {refreshLabel}
            </span>
          </div>

          <DateRangeFilter dateRange={dateRange} onChange={setDateRange} />
        </div>
      </div>
    </header>
  );
}
