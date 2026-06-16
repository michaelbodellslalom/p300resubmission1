"use client";

import { useMemo, useState } from 'react';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { type ChurnReason } from '@/types/dashboard';

type SortKey = 'reason' | 'percentage' | 'affectedSubscribers';

type SortDirection = 'asc' | 'desc';

interface ChurnBreakdownTableProps {
  data: ChurnReason[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function ChurnBreakdownTable({
  data,
  isLoading,
  isError,
  onRetry,
}: ChurnBreakdownTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('percentage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedData = useMemo(() => {
    const copied = [...data];

    copied.sort((a, b) => {
      if (sortKey === 'reason') {
        const result = a.reason.localeCompare(b.reason);
        return sortDirection === 'asc' ? result : -result;
      }

      const valueA = a[sortKey];
      const valueB = b[sortKey];
      const result = valueA - valueB;
      return sortDirection === 'asc' ? result : -result;
    });

    return copied;
  }, [data, sortDirection, sortKey]);

  const handleSort = (nextKey: SortKey) => {
    if (sortKey === nextKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === 'reason' ? 'asc' : 'desc');
  };

  const directionGlyph = (key: SortKey): string => {
    if (key !== sortKey) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (isLoading) {
    return <LoadingState label="Loading churn breakdown" />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load churn breakdown data."
        onRetry={onRetry}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No churn breakdown data"
        description="Try expanding the selected date range to calculate churn reasons."
      />
    );
  }

  return (
    <section className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Churn Breakdown</p>
          <p className="text-sm text-slate-300">Primary reasons contributing to subscriber churn</p>
        </div>
        <p className="text-xs text-slate-500">Click headers to sort</p>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-800/80">
        <table className="min-w-[34rem] text-left text-xs sm:min-w-full sm:text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
              <th className="whitespace-nowrap pb-2 pl-2 pr-4 sm:pl-3">
                <button
                  type="button"
                  onClick={() => handleSort('reason')}
                  className="inline-flex items-center gap-1 hover:text-slate-200"
                >
                  Reason {directionGlyph('reason')}
                </button>
              </th>
              <th className="whitespace-nowrap pb-2 pr-4 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('percentage')}
                  className="inline-flex items-center gap-1 hover:text-slate-200"
                >
                  Share {directionGlyph('percentage')}
                </button>
              </th>
              <th className="whitespace-nowrap pb-2 pr-2 text-right sm:pr-3">
                <button
                  type="button"
                  onClick={() => handleSort('affectedSubscribers')}
                  className="inline-flex items-center gap-1 hover:text-slate-200"
                >
                  Affected Subs {directionGlyph('affectedSubscribers')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.reason} className="border-b border-slate-800/70 last:border-0">
                <td className="py-2 pl-2 pr-4 text-slate-200 sm:pl-3">{row.reason}</td>
                <td className="py-2 pr-4 text-right text-slate-300">{row.percentage.toFixed(1)}%</td>
                <td className="py-2 pr-2 text-right font-medium text-slate-200 sm:pr-3">
                  {formatNumber(row.affectedSubscribers)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
