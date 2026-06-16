"use client";

import { useEffect, useState } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type ChurnReason } from '@/types/dashboard';

interface ChurnReasonChartProps {
  data: ChurnReason[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

// Gradient steps cycling across the design palette
const COLORS = [
  '#F87171', // rose-400
  '#FB923C', // orange-400
  '#FACC15', // yellow-400
  '#34D399', // emerald-400
  '#38BDF8', // sky-400
  '#818CF8', // indigo-400
  '#C084FC', // purple-400
];

export function ChurnReasonChart({
  data,
  isLoading,
  isError,
  onRetry,
}: ChurnReasonChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => { setIsMounted(true); }, []);

  if (isLoading) return <LoadingState label="Loading churn reason chart" />;
  if (isError) return <ErrorState message="Failed to load churn reason data." onRetry={onRetry} />;
  if (!data.length) return (
    <EmptyState
      title="No churn reason data"
      description="Try expanding the selected date range to see churn driver breakdown."
    />
  );
  if (!isMounted) return <LoadingState label="Preparing churn reason chart" />;

  // Sort descending by percentage for visual impact
  const sorted = [...data].sort((a, b) => b.percentage - a.percentage);

  return (
    <div
      role="img"
      aria-label="Churn drivers chart showing churn share percentages by primary churn reason."
      className="card h-72 border border-rose-500/20 bg-gradient-to-b from-rose-500/5 via-slate-800/70 to-slate-900/40 sm:h-80"
    >
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-rose-200/80">Churn Drivers</p>
        <p className="text-sm text-slate-300">Breakdown of subscriber churn by primary reason</p>
      </div>
      <div className="h-[82%] w-full min-h-48 min-w-0 sm:min-h-52">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={192}>
          <BarChart
            data={sorted}
            layout="vertical"
            margin={{ top: 4, right: 18, bottom: 4, left: 0 }}
          >
            <CartesianGrid stroke="#1E293B" strokeDasharray="3 6" horizontal={false} />
            <XAxis
              type="number"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 10 : 11 }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 'dataMax + 4']}
              tickMargin={6}
            />
            <YAxis
              type="category"
              dataKey="reason"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 9 : 10 }}
              tickFormatter={(value: string) =>
                value.length > (isMobile ? 12 : 15) ? `${value.slice(0, isMobile ? 12 : 15)}…` : value
              }
              width={isMobile ? 92 : 112}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: '#0F172A', opacity: 0.5 }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #4C0519',
                borderRadius: '8px',
                color: '#E2E8F0',
              }}
              formatter={(value, _name, entry) => {
                const v = typeof value === 'number' ? value : Number(value ?? 0);
                const affected: number = (entry.payload as ChurnReason).affectedSubscribers;
                return [
                  `${v.toFixed(1)}% — ${new Intl.NumberFormat('en-US').format(affected)} subs`,
                  'Share',
                ];
              }}
            />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
              {sorted.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
