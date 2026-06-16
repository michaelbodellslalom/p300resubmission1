"use client";

import { useQuery } from '@tanstack/react-query';

import { contentMetrics, filterByDateRange } from '@/data/mock';
import { useDashboardStore } from '@/store/dashboardStore';

const SIMULATED_LATENCY_MS = 120;

export interface ContentDataResult {
  items: typeof contentMetrics;
  totalItems: number;
}

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export function useFetchContentData() {
  const dateRange = useDashboardStore((state) => state.dateRange);
  const filters = useDashboardStore((state) => state.filters);

  return useQuery<ContentDataResult>({
    queryKey: [
      'content',
      dateRange.start,
      dateRange.end,
      filters.contentFormat,
      filters.contentType,
    ],
    queryFn: async () => {
      const byDate = filterByDateRange(
        contentMetrics.map((item) => ({ ...item, date: item.publishDate })),
        dateRange,
      );

      const filtered = byDate
        .filter((item) =>
          filters.contentFormat === 'all' ? true : item.format === filters.contentFormat,
        )
        .filter((item) => (filters.contentType === 'all' ? true : item.type === filters.contentType))
        .map(({ date: _date, ...rest }) => rest);

      return delay({
        items: filtered,
        totalItems: filtered.length,
      });
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
}
