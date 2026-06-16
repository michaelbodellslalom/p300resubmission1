"use client";

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = 'Loading data' }: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      aria-label={label}
      className="card min-h-32 animate-pulse"
      data-testid="loading-skeleton"
    >
      <div className="h-3 w-28 rounded bg-slate-700" />
      <div className="mt-3 h-8 w-36 rounded bg-slate-600" />
      <div className="mt-3 h-3 w-24 rounded bg-slate-700" />
      <div className="mt-2 h-3 w-44 rounded bg-slate-800" />
    </div>
  );
}
