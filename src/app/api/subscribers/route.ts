import { NextRequest, NextResponse } from 'next/server';

import {
  filterByDateRange,
  getChurnReasonsForRange,
  getOverviewKPIs,
  subscriberCohorts,
  subscriberTimeline,
} from '@/data/mock';

function getDateRange(searchParams: URLSearchParams): { start: string; end: string } {
  const end = searchParams.get('end') ?? new Date().toISOString().split('T')[0] ?? '';

  const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0] ?? '';
  const start = searchParams.get('start') ?? defaultStart;

  return { start, end };
}

export async function GET(request: NextRequest) {
  const dateRange = getDateRange(request.nextUrl.searchParams);

  const timeline = filterByDateRange(subscriberTimeline, dateRange);
  const overview = getOverviewKPIs(dateRange);

  return NextResponse.json({
    timeline,
    cohorts: subscriberCohorts,
    churnReasons: getChurnReasonsForRange(dateRange),
    overview,
  });
}
