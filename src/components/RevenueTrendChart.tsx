"use client";

import { useEffect, useState } from 'react';

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { type RevenueSnapshot } from '@/types/dashboard';

interface RevenueTrendChartProps {
  data: RevenueSnapshot[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

function formatDateLabel(value: string): string {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export function RevenueTrendChart({
  data,
  isLoading,
  isError,
  onRetry,
}: RevenueTrendChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) {
    return <LoadingState label="Loading revenue trend" />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load revenue trend data."
        onRetry={onRetry}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No revenue trend data"
        description="Try expanding the selected date range to load revenue and RPM values."
      />
    );
  }

  if (!isMounted) {
    return <LoadingState label="Preparing revenue trend" />;
  }

  return (
    <div className="card h-64 border border-teal-500/25 bg-gradient-to-b from-teal-500/8 via-slate-800/70 to-slate-900/40 sm:h-72">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-teal-200/80">Revenue Trend</p>
        <p className="text-sm text-slate-300">Total revenue and RPM across the selected date range</p>
      </div>

      <div className="h-[78%] w-full min-h-44 min-w-0 sm:h-[84%] sm:min-h-52">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={208}>
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -4 }}>
            <defs>
              <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2DD4BF" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#0F766E" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E293B" strokeDasharray="4 6" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateLabel}
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              minTickGap={24}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="revenue"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={formatCompactCurrency}
            />
            <YAxis
              yAxisId="rpm"
              orientation="right"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
              tickFormatter={(value) => `$${Number(value).toFixed(0)}`}
            />
            <Tooltip
              cursor={{ fill: '#0F172A', opacity: 0.45 }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #134E4A',
                borderRadius: '8px',
                color: '#E2E8F0',
              }}
              labelFormatter={(label) => formatDateLabel(String(label))}
              formatter={(value, name) => {
                const numericValue = typeof value === 'number' ? value : Number(value ?? 0);
                if (name === 'RPM') {
                  return [`$${numericValue.toFixed(2)}`, 'RPM'];
                }
                return [formatCurrency(numericValue), 'Revenue'];
              }}
            />
            <Legend
              verticalAlign="top"
              height={22}
              iconSize={10}
              formatter={(value) => (
                <span className="text-xs font-semibold tracking-wide text-slate-300">{value}</span>
              )}
              wrapperStyle={{ fontSize: '12px', color: '#CBD5E1' }}
            />
            <Bar
              yAxisId="revenue"
              dataKey="totalRevenue"
              name="Revenue"
              fill="url(#revenueBarGradient)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="rpm"
              type="monotone"
              dataKey="rpm"
              name="RPM"
              stroke="#7DD3FC"
              strokeWidth={2.8}
              dot={false}
              activeDot={{ r: 4, fill: '#BAE6FD', stroke: '#0C4A6E', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
