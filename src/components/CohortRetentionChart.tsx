"use client";

import { useEffect, useState } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type SubscriberCohort } from '@/types/dashboard';

interface CohortRetentionChartProps {
  data: SubscriberCohort[];
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

export function CohortRetentionChart({
  data,
  isLoading,
  isError,
  onRetry,
}: CohortRetentionChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => { setIsMounted(true); }, []);

  if (isLoading) return <LoadingState label="Loading cohort retention" />;
  if (isError) return <ErrorState message="Failed to load cohort data." onRetry={onRetry} />;
  if (!data.length) return <EmptyState title="No cohort data" description="No cohort records found for this range." />;
  if (!isMounted) return <LoadingState label="Preparing cohort chart" />;

  return (
    <div className="card h-72 border border-cyan-500/20 bg-gradient-to-b from-cyan-500/5 via-slate-800/70 to-slate-900/40 sm:h-80">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wide text-cyan-200/80">Cohort Retention</p>
        <p className="text-sm text-slate-300">4-week and 12-week retention rates by cohort month</p>
      </div>
      <div className="h-[82%] w-full min-h-48 min-w-0 sm:min-h-52">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={192}>
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -16 }}>
            <defs>
              <linearGradient id="w4Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#0E7490" stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id="w12Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818CF8" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#4338CA" stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1E293B" strokeDasharray="3 6" vertical={false} />
            <XAxis
              dataKey="cohortMonth"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 9 : 10 }}
              tickFormatter={(value: string) => {
                const date = new Date(`${value}-01`);
                return Number.isNaN(date.getTime())
                  ? value
                  : date.toLocaleDateString('en-US', { month: 'short' });
              }}
              minTickGap={isMobile ? 18 : 28}
              tickMargin={6}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 10 : 11 }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
              width={isMobile ? 34 : 46}
            />
            <Tooltip
              cursor={{ fill: '#0F172A', opacity: 0.5 }}
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #164E63',
                borderRadius: '8px',
                color: '#E2E8F0',
              }}
              formatter={(value, name) => {
                const v = typeof value === 'number' ? value : Number(value ?? 0);
                return [`${v.toFixed(1)}%`, String(name)];
              }}
            />
            <Legend
              verticalAlign="top"
              height={22}
              iconSize={isMobile ? 8 : 10}
              formatter={(value) => (
                <span className="text-xs font-semibold text-slate-300">{value}</span>
              )}
              wrapperStyle={{ fontSize: isMobile ? '10px' : '11px' }}
            />
            <Bar dataKey="week4Retention" name="4W Retention" fill="url(#w4Gradient)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="week12Retention" name="12W Retention" fill="url(#w12Gradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
