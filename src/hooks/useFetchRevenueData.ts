"use client";

import { useQuery } from '@tanstack/react-query';

import {
  filterByDateRange,
  getContentItems,
  getRevenueByFormat,
  revenueTimeline,
} from '@/data/mock';
import { useDashboardStore } from '@/store/dashboardStore';
import { QUERY_GC_MS, QUERY_REFETCH_MS, QUERY_STALE_MS } from '@/utils/cachePolicy';

const SIMULATED_LATENCY_MS = 120;

export interface RevenueDataResult {
  timeline: typeof revenueTimeline;
  byFormat: ReturnType<typeof getRevenueByFormat>;
}

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export function useFetchRevenueData() {
  const dateRange = useDashboardStore((state) => state.dateRange);

  return useQuery<RevenueDataResult>({
    queryKey: ['revenue', dateRange.start, dateRange.end],
    queryFn: async () => {
      const timeline = filterByDateRange(revenueTimeline, dateRange);
      const byFormat = getRevenueByFormat(getContentItems(dateRange));

      return delay({
        timeline,
        byFormat,
      });
    },
    staleTime: QUERY_STALE_MS,
    gcTime: QUERY_GC_MS,
    refetchInterval: QUERY_REFETCH_MS,
  });
}
