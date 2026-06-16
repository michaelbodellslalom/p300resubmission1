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
import { useIsMobile } from '@/hooks/useIsMobile';
import { type RevenueSnapshot } from '@/types/dashboard';

interface RevenueTrendChartProps {
  data: RevenueSnapshot[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

function formatDateLabel(value: string, isMobile: boolean): string {
  const date = new Date(value);
  if (isMobile) {
    return date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
  }
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
  const isMobile = useIsMobile();

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
    <div
      role="img"
      aria-label="Revenue trend chart comparing total revenue bars and RPM line over the selected date range."
      className="card h-[18rem] border border-teal-500/25 bg-gradient-to-b from-teal-500/8 via-slate-800/70 to-slate-900/40 sm:h-72"
    >
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-teal-200/80">Revenue Trend</p>
        <p className="text-sm text-slate-300">Total revenue and RPM across the selected date range</p>
      </div>

      <div className="h-[79%] w-full min-h-40 min-w-0 sm:h-[84%] sm:min-h-52">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180}>
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -4 }}>
            <defs>
              <linearGradient id="revenueBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#56B4E9" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#0072B2" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E293B" strokeDasharray="4 6" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => formatDateLabel(String(value), isMobile)}
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 10 : 11 }}
              minTickGap={isMobile ? 34 : 24}
              tickMargin={6}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="revenue"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 10 : 11 }}
              tickFormatter={formatCompactCurrency}
              width={isMobile ? 44 : 58}
            />
            <YAxis
              yAxisId="rpm"
              orientation="right"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 10 : 11 }}
              tickFormatter={(value) => `$${Number(value).toFixed(0)}`}
              width={isMobile ? 28 : 42}
            />
            <Tooltip
              cursor={{ fill: '#0F172A', opacity: 0.45 }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #134E4A',
                borderRadius: '8px',
                color: '#E2E8F0',
              }}
              labelFormatter={(label) => formatDateLabel(String(label), false)}
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
              wrapperStyle={{ fontSize: isMobile ? '10px' : '11px', color: '#CBD5E1' }}
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
              stroke="#E69F00"
              strokeWidth={2.8}
              strokeDasharray="6 3"
              dot={false}
              activeDot={{ r: 4, fill: '#FDE68A', stroke: '#B45309', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
