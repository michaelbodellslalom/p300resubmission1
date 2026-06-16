"use client";

import { useEffect, useState } from 'react';

import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { type SubscriberSnapshot } from '@/types/dashboard';

interface SubscriberTrendChartProps {
  data: SubscriberSnapshot[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

function formatDateLabel(value: string): string {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export function SubscriberTrendChart({
  data,
  isLoading,
  isError,
  onRetry,
}: SubscriberTrendChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) {
    return <LoadingState label="Loading subscriber trend" />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load subscriber trend data."
        onRetry={onRetry}
      />
    );
  }

  if (!data.length) {
    return (
      <EmptyState
        title="No subscriber trend data"
        description="Try expanding the selected date range to load subscriber trend values."
      />
    );
  }

  if (!isMounted) {
    return <LoadingState label="Preparing subscriber trend" />;
  }

  return (
    <div className="card h-64 border border-cyan-500/25 bg-gradient-to-b from-cyan-500/8 via-slate-800/70 to-slate-900/40 sm:h-72">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide text-cyan-200/80">Subscriber Trend</p>
        <p className="text-sm text-slate-300">Total subscribers over the selected time range</p>
      </div>

      <div className="h-[78%] w-full min-h-44 min-w-0 sm:h-[82%] sm:min-h-52">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={208}>
        <LineChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -12 }}>
          <defs>
            <linearGradient id="subscriberTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1E293B" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            stroke="#64748B"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            minTickGap={24}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#64748B"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickFormatter={formatCompactNumber}
          />
          <Tooltip
            cursor={{ stroke: '#155E75', strokeDasharray: '4 4' }}
            contentStyle={{
              backgroundColor: '#020617',
              border: '1px solid #164E63',
              borderRadius: '8px',
              color: '#E2E8F0',
            }}
            labelFormatter={(label) => formatDateLabel(String(label))}
            formatter={(value) => {
              const numericValue =
                typeof value === 'number' ? value : Number(value ?? 0);
              return [
                new Intl.NumberFormat('en-US').format(numericValue),
                'Subscribers',
              ];
            }}
          />
          <Area
            type="monotone"
            dataKey="totalSubscribers"
            stroke="none"
            fill="url(#subscriberTrendFill)"
          />
          <Line
            type="monotone"
            dataKey="totalSubscribers"
            stroke="#22D3EE"
            strokeWidth={2.8}
            dot={false}
            activeDot={{ r: 4, fill: '#67E8F9', stroke: '#083344', strokeWidth: 2 }}
          />
        </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
