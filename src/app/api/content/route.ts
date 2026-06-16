import { NextRequest, NextResponse } from 'next/server';

import { contentMetrics, filterByDateRange, getContentPerformanceByFormat } from '@/data/mock';

function getDateRange(searchParams: URLSearchParams): { start: string; end: string } {
  const end = searchParams.get('end') ?? new Date().toISOString().split('T')[0] ?? '';

  const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0] ?? '';
  const start = searchParams.get('start') ?? defaultStart;

  return { start, end };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateRange = getDateRange(searchParams);

  const contentFormat = searchParams.get('format') ?? 'all';
  const contentType = searchParams.get('type') ?? 'all';

  const datedContent = filterByDateRange(
    contentMetrics.map((item) => ({ ...item, date: item.publishDate })),
    dateRange,
  );

  const filtered = datedContent
    .filter((item) => (contentFormat === 'all' ? true : item.format === contentFormat))
    .filter((item) => (contentType === 'all' ? true : item.type === contentType))
    .map(({ date: _date, ...item }) => item);

  return NextResponse.json({
    items: filtered,
    totalItems: filtered.length,
    byFormat: getContentPerformanceByFormat(),
  });
}
