"use client";

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';

import { recordPerformanceMetric } from '@/utils/performanceMonitoring';

function metricUnit(name: string): 'ms' | 'score' {
  if (name === 'CLS') {
    return 'score';
  }
  return 'ms';
}

export function PerformanceMonitor() {
  const pathname = usePathname();

  useReportWebVitals((metric) => {
    recordPerformanceMetric({
      id: metric.id,
      name: metric.name,
      value: Number(metric.value.toFixed(2)),
      unit: metricUnit(metric.name),
      route: pathname ?? 'unknown',
      timestamp: Date.now(),
      source: 'web-vital',
      rating: metric.rating,
    });
  });

  useEffect(() => {
    const start = performance.now();
    let frame1 = 0;
    let frame2 = 0;

    frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => {
        recordPerformanceMetric({
          name: 'route-change',
          value: Number((performance.now() - start).toFixed(2)),
          unit: 'ms',
          route: pathname ?? 'unknown',
          timestamp: Date.now(),
          source: 'route-change',
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [pathname]);

  return null;
}
