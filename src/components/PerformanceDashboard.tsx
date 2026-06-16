"use client";

import { useEffect, useMemo, useState } from 'react';

import { type DashboardPerformanceMetric } from '@/utils/performanceMonitoring';

function formatMetric(metric: DashboardPerformanceMetric): string {
  if (metric.unit === 'ms') {
    return `${metric.value.toFixed(1)} ms`;
  }
  return `${metric.value.toFixed(3)}`;
}

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<DashboardPerformanceMetric[]>([]);

  useEffect(() => {
    const pull = () => {
      setMetrics([...(window.__dashboardPerfMetrics ?? [])]);
    };

    pull();
    const intervalId = window.setInterval(pull, 1500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const summary = useMemo(() => {
    const webVitals = metrics.filter((metric) => metric.source === 'web-vital');
    const routeChanges = metrics.filter((metric) => metric.name === 'route-change');
    const latestRouteChange = routeChanges[routeChanges.length - 1];

    return {
      total: metrics.length,
      webVitals: webVitals.length,
      routeChanges: routeChanges.length,
      latestRouteChange,
    };
  }, [metrics]);

  const recent = metrics.slice(-8).reverse();

  return (
    <div className="card border border-cyan-500/30 bg-gradient-to-b from-cyan-500/8 to-slate-900/40">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-cyan-300/80">Performance Dashboard</p>
          <p className="text-sm text-slate-300">Live client metrics captured from web vitals and route transitions</p>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">
          {summary.total} samples
        </span>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-md border border-slate-700 bg-slate-900/60 p-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Web Vitals</p>
          <p className="text-sm font-semibold text-slate-200">{summary.webVitals}</p>
        </div>
        <div className="rounded-md border border-slate-700 bg-slate-900/60 p-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Route Changes</p>
          <p className="text-sm font-semibold text-slate-200">{summary.routeChanges}</p>
        </div>
        <div className="rounded-md border border-slate-700 bg-slate-900/60 p-2">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">Latest Route Time</p>
          <p className="text-sm font-semibold text-slate-200">
            {summary.latestRouteChange ? formatMetric(summary.latestRouteChange) : 'No data'}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-800/80">
        <table className="min-w-[36rem] text-left text-xs sm:min-w-full sm:text-sm">
          <thead>
            <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-400">
              <th className="whitespace-nowrap pb-2 pl-2 pr-3 sm:pl-3">Metric</th>
              <th className="whitespace-nowrap pb-2 pr-3">Source</th>
              <th className="whitespace-nowrap pb-2 pr-3">Route</th>
              <th className="whitespace-nowrap pb-2 pr-2 text-right sm:pr-3">Value</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td className="py-3 pl-2 pr-3 text-slate-400 sm:pl-3" colSpan={4}>
                  Metrics will appear here after you navigate through dashboard routes.
                </td>
              </tr>
            ) : (
              recent.map((metric, idx) => (
                <tr key={`${metric.name}-${metric.timestamp}-${idx}`} className="border-b border-slate-800/70 last:border-0">
                  <td className="py-2 pl-2 pr-3 text-slate-200 sm:pl-3">{metric.name}</td>
                  <td className="py-2 pr-3 text-slate-300">{metric.source}</td>
                  <td className="max-w-[12rem] truncate py-2 pr-3 text-slate-300" title={metric.route}>{metric.route}</td>
                  <td className="py-2 pr-2 text-right font-medium text-cyan-300 sm:pr-3">{formatMetric(metric)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
