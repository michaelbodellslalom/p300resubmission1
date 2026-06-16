"use client";

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
      <div className="card min-h-36 border border-slate-700">
        <p className="text-sm text-slate-400">No revenue trend data available for this range.</p>
      </div>
    );
  }

  return (
    <div className="card h-72 border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">Revenue Trend</p>
        <p className="text-sm text-slate-300">Total revenue and RPM across the selected date range</p>
      </div>

      <div className="h-[84%] w-full min-h-52 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={208}>
          <ComposedChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -4 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateLabel}
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11 }}
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
              contentStyle={{
                backgroundColor: '#0F172A',
                border: '1px solid #334155',
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
              wrapperStyle={{ fontSize: '12px', color: '#CBD5E1' }}
            />
            <Bar
              yAxisId="revenue"
              dataKey="totalRevenue"
              name="Revenue"
              fill="#14B8A6"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="rpm"
              type="monotone"
              dataKey="rpm"
              name="RPM"
              stroke="#38BDF8"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: '#38BDF8', stroke: '#0F172A', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
