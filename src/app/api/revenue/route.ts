import { NextRequest, NextResponse } from 'next/server';

import { filterByDateRange, getContentItems, getRevenueByFormat, revenueTimeline } from '@/data/mock';
import { API_CACHE_CONTROL } from '@/utils/cachePolicy';

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

  const timeline = filterByDateRange(revenueTimeline, dateRange);
  const scopedContent = getContentItems(dateRange);

  return NextResponse.json(
    {
      timeline,
      byFormat: getRevenueByFormat(scopedContent),
    },
    {
      headers: {
        'Cache-Control': API_CACHE_CONTROL,
      },
    },
  );
}
