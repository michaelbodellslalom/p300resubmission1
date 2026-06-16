export interface DashboardPerformanceMetric {
  id?: string;
  name: string;
  value: number;
  unit: 'ms' | 'score';
  route: string;
  timestamp: number;
  source: 'web-vital' | 'route-change';
  rating?: 'good' | 'needs-improvement' | 'poor';
}

declare global {
  interface Window {
    __dashboardPerfMetrics?: DashboardPerformanceMetric[];
  }
}

const MAX_METRICS = 200;

export function recordPerformanceMetric(metric: DashboardPerformanceMetric): void {
  if (typeof window === 'undefined') {
    return;
  }

  const queue = window.__dashboardPerfMetrics ?? [];
  queue.push(metric);

  if (queue.length > MAX_METRICS) {
    queue.splice(0, queue.length - MAX_METRICS);
  }

  window.__dashboardPerfMetrics = queue;

  if (process.env.NODE_ENV !== 'production') {
    console.info('[perf]', metric);
  }
}
