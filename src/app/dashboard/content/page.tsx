"use client";

import { useFetchContentData } from '@/hooks/useFetchContentData';

export default function ContentPage() {
  const { data, isLoading } = useFetchContentData();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Content</h2>
      <p className="text-sm text-slate-400">Performance by format and content type.</p>

      <div className="card">
        <p className="text-sm text-slate-300">
          {isLoading ? 'Loading content performance...' : `Loaded ${data?.totalItems ?? 0} content items for the current filters.`}
        </p>
      </div>
    </div>
  );
}
