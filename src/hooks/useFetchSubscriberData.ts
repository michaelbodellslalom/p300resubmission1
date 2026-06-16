"use client";

import { useQuery } from '@tanstack/react-query';

import {
  churnReasons,
  filterByDateRange,
  getOverviewKPIs,
  subscriberCohorts,
  subscriberTimeline,
} from '@/data/mock';
import { useDashboardStore } from '@/store/dashboardStore';

const SIMULATED_LATENCY_MS = 120;

export interface SubscriberDataResult {
  timeline: typeof subscriberTimeline;
  cohorts: typeof subscriberCohorts;
  churnReasons: typeof churnReasons;
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
      const overview = getOverviewKPIs(dateRange);

      return delay({
        timeline,
        cohorts: subscriberCohorts,
        churnReasons,
        overview,
      });
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
}
