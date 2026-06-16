"use client";

import { useQuery } from '@tanstack/react-query';

import { contentMetrics, getContentItems } from '@/data/mock';
import { useDashboardStore } from '@/store/dashboardStore';
import { QUERY_GC_MS, QUERY_REFETCH_MS, QUERY_STALE_MS } from '@/utils/cachePolicy';

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
      const filtered = getContentItems(dateRange, {
        format: filters.contentFormat,
        type: filters.contentType,
      });

      return delay({
        items: filtered,
        totalItems: filtered.length,
      });
    },
    staleTime: QUERY_STALE_MS,
    gcTime: QUERY_GC_MS,
    refetchInterval: QUERY_REFETCH_MS,
  });
}
