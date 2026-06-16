"use client";

import { useQuery } from '@tanstack/react-query';

import {
  filterByDateRange,
  getChurnReasonsForRange,
  getOverviewKPIs,
  subscriberCohorts,
  subscriberTimeline,
} from '@/data/mock';
import { useDashboardStore } from '@/store/dashboardStore';
import { QUERY_GC_MS, QUERY_REFETCH_MS, QUERY_STALE_MS } from '@/utils/cachePolicy';

const SIMULATED_LATENCY_MS = 120;

export interface SubscriberDataResult {
  timeline: typeof subscriberTimeline;
  cohorts: typeof subscriberCohorts;
  churnReasons: ReturnType<typeof getChurnReasonsForRange>;
  overview: ReturnType<typeof getOverviewKPIs>;
}

function delay<T>(value: T, ms = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

export function useFetchSubscriberData() {
  const dateRange = useDashboardStore((state) => state.dateRange);

  return useQuery<SubscriberDataResult>({
    queryKey: ['subscribers', dateRange.start, dateRange.end],
    queryFn: async () => {
      const timeline = filterByDateRange(subscriberTimeline, dateRange);
      const churnReasons = getChurnReasonsForRange(dateRange);
      const overview = getOverviewKPIs(dateRange);

      return delay({
        timeline,
        cohorts: subscriberCohorts,
        churnReasons,
        overview,
      });
    },
    staleTime: QUERY_STALE_MS,
    gcTime: QUERY_GC_MS,
    refetchInterval: QUERY_REFETCH_MS,
  });
}
