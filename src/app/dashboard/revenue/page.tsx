"use client";

import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';

export default function RevenuePage() {
  const { data, isLoading } = useFetchRevenueData();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Revenue</h2>
      <p className="text-sm text-slate-400">Ad revenue trends and format contribution.</p>

      <div className="card">
        <p className="text-sm text-slate-300">
          {isLoading ? 'Loading revenue trend...' : `Loaded ${data?.timeline.length ?? 0} revenue points across ${data?.byFormat.length ?? 0} formats.`}
        </p>
      </div>
    </div>
  );
}
