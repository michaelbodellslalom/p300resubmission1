"use client";

import { ChurnBreakdownTable } from '@/components/ChurnBreakdownTable';
import { ChurnReasonChart } from '@/components/ChurnReasonChart';
import { CohortRetentionChart } from '@/components/CohortRetentionChart';
import { ErrorState } from '@/components/ErrorState';
import { KPICard } from '@/components/KPICard';
import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export default function SubscribersPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFetchSubscriberData();

  const overview = data?.overview;

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-bold">Subscribers</h2>
        <p className="text-sm text-slate-400">
          Cohort retention, churn drivers, and subscriber growth trends.
        </p>
      </section>

      {isError && (
        <ErrorState
          message="Failed to load subscriber data."
          onRetry={() => void refetch()}
        />
      )}

      {/* KPI summary strip */}
      <section className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        <KPICard
          label="Total Subscribers"
          value={isLoading || !overview ? '...' : formatNumber(overview.totalSubscribers)}
          tone="neutral"
          helperText="Current active subscriber base"
          isLoading={isLoading || !overview}
        />
        <KPICard
          label="Subscriber Growth"
          value={isLoading || !overview ? '...' : formatPercent(overview.subscriberGrowthRate)}
          tone="success"
          trendValue={overview?.subscriberGrowthRate}
          helperText="Net movement over selected range"
          isLoading={isLoading || !overview}
        />
        <KPICard
          label="Churn Rate"
          value={isLoading || !overview ? '...' : formatPercent(overview.churnRate)}
          tone="warning"
          trendValue={overview ? -overview.churnRate : undefined}
          helperText="Lower is better"
          isLoading={isLoading || !overview}
        />
      </section>

      {/* Cohort retention chart */}
      <section>
        <CohortRetentionChart
          data={data?.cohorts ?? []}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
        />
      </section>

      {/* Cohort table */}
      <section className="overflow-hidden">
        <div className="card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
          <div className="mb-3.5 space-y-1 sm:mb-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Cohort Summary</p>
            <p className="text-sm text-slate-300 sm:text-sm">Monthly cohort sizes and estimated LTV</p>
          </div>
          <div className="overflow-x-auto rounded-md border border-slate-800/80">
            <table className="min-w-[42rem] text-left text-xs sm:min-w-full sm:text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
                  <th className="whitespace-nowrap pb-2 pl-2 pr-4 sm:pl-3">Cohort</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">Size</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">4-Wk Retention</th>
                  <th className="whitespace-nowrap pb-2 pr-4 text-right">12-Wk Retention</th>
                  <th className="whitespace-nowrap pb-2 pr-2 text-right sm:pr-3">Est. LTV</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i} className="border-b border-slate-800/70">
                        {Array.from({ length: 5 }).map((__, j) => (
                          <td key={j} className="py-2 pr-4">
                            <div className="h-3 rounded bg-slate-700 animate-pulse" style={{ width: j === 0 ? '6rem' : '3.5rem' }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  : (data?.cohorts ?? []).map((cohort) => (
                      <tr key={cohort.cohortMonth} className="border-b border-slate-800/70 last:border-0">
                        <td className="py-2 pl-2 pr-4 text-slate-200 sm:pl-3">{cohort.cohortMonth}</td>
                        <td className="py-2 pr-4 text-right text-slate-300">{formatNumber(cohort.cohortSize)}</td>
                        <td className="py-2 pr-4 text-right text-cyan-300">{cohort.week4Retention.toFixed(1)}%</td>
                        <td className="py-2 pr-4 text-right text-indigo-300">{cohort.week12Retention.toFixed(1)}%</td>
                        <td className="py-2 pr-2 text-right font-medium text-slate-200 sm:pr-3">${cohort.estimatedLtv.toFixed(2)}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Churn reason chart + breakdown table side by side on wide screens */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChurnReasonChart
          data={data?.churnReasons ?? []}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => void refetch()}
        />

        <div className="overflow-hidden">
          <ChurnBreakdownTable
            data={data?.churnReasons ?? []}
            isLoading={isLoading}
            isError={isError}
            onRetry={() => void refetch()}
          />
        </div>
      </section>
    </div>
  );
}

