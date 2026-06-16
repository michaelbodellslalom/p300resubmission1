"use client";

import { useEffect, useState } from 'react';

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type ContentMetric } from '@/types/dashboard';

interface ContentScatterProps {
  data: ContentMetric[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

const FORMAT_COLORS: Record<string, string> = {
  video: '#56B4E9',
  article: '#009E73',
  podcast: '#E69F00',
  'short-form': '#D55E00',
  'long-form': '#CC79A7',
};

export function ContentEngagementScatter({
  data,
  isLoading,
  isError,
  onRetry,
}: ContentScatterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) return <LoadingState label="Loading engagement correlation" />;
  if (isError) return <ErrorState message="Failed to load correlation data." onRetry={onRetry} />;
  if (!data.length) return (
    <EmptyState
      title="No correlation data"
      description="Expand the date range to compute engagement vs revenue correlations."
    />
  );
  if (!isMounted) return <LoadingState label="Preparing engagement correlation" />;

  const formats = [...new Set(data.map((d) => d.format))];

  return (
    <div
      role="img"
      aria-label="Views versus engagement scatter chart, with bubble size representing ad revenue and colors representing content format."
      className="card border border-indigo-500/20 bg-gradient-to-b from-indigo-500/5 via-slate-800/70 to-slate-900/40"
    >
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-indigo-200/80">Views vs Engagement</p>
        <p className="text-sm text-slate-300">Scatter of content views against engagement rate, sized by ad revenue</p>
      </div>

      {/* Legend */}
      <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1.5">
        {formats.map((fmt) => (
          <span key={fmt} className="flex items-center gap-1.5 text-[11px] text-slate-400 sm:text-xs">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: FORMAT_COLORS[fmt] ?? '#64748B' }}
            />
            {fmt}
          </span>
        ))}
      </div>

      <div className="h-[18rem] w-full min-w-0 sm:h-72">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180}>
          <ScatterChart margin={{ top: 8, right: 12, bottom: 8, left: -8 }}>
            <CartesianGrid stroke="#1E293B" strokeDasharray="3 6" />
            <XAxis
              type="number"
              dataKey="views"
              name="Views"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 9 : 10 }}
              tickFormatter={(v) =>
                new Intl.NumberFormat('en-US', { notation: 'compact' }).format(v)
              }
              tickCount={isMobile ? 4 : 6}
              tickMargin={6}
            />
            <YAxis
              type="number"
              dataKey="engagementRate"
              name="Engagement"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 9 : 10 }}
              tickFormatter={(v) => `${v}%`}
              tickCount={isMobile ? 4 : 6}
              width={isMobile ? 34 : 42}
            />
            <ZAxis type="number" dataKey="adRevenue" range={[30, 260]} name="Ad Revenue" />
            <Tooltip
              cursor={{ strokeDasharray: '4 4', stroke: '#334155' }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #312E81',
                borderRadius: '8px',
                color: '#E2E8F0',
              }}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0]?.payload as ContentMetric;
                return (
                  <div className="space-y-1 p-2 text-xs">
                    <p className="font-semibold text-slate-100 max-w-40 truncate">{d.title}</p>
                    <p className="text-slate-400">Views: <span className="text-slate-200">{new Intl.NumberFormat('en-US').format(d.views)}</span></p>
                    <p className="text-slate-400">Engagement: <span className="text-slate-200">{d.engagementRate.toFixed(2)}%</span></p>
                    <p className="text-slate-400">Ad Revenue: <span className="text-emerald-300">${d.adRevenue.toFixed(0)}</span></p>
                  </div>
                );
              }}
            />
            {formats.map((fmt) => (
              <Scatter
                key={fmt}
                name={fmt}
                data={data.filter((d) => d.format === fmt)}
                fill={FORMAT_COLORS[fmt] ?? '#64748B'}
                fillOpacity={0.7}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
