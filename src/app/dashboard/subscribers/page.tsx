"use client";

import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';

export default function SubscribersPage() {
  const { data, isLoading } = useFetchSubscriberData();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Subscribers</h2>
      <p className="text-sm text-slate-400">Cohort retention and churn drivers.</p>

      <div className="card">
        <p className="text-sm text-slate-300">
          {isLoading ? 'Loading subscriber timeline...' : `Loaded ${data?.timeline.length ?? 0} timeline points and ${data?.cohorts.length ?? 0} cohorts.`}
        </p>
      </div>
    </div>
  );
}
