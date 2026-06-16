"use client";

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = 'Loading data' }: LoadingStateProps) {
  return (
    <div
      aria-live="polite"
      aria-label={label}
      className="card min-h-36 animate-pulse border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/50"
      data-testid="loading-skeleton"
    >
      <div className="h-3 w-28 rounded bg-slate-700" />
      <div className="mt-3 h-8 w-40 rounded bg-slate-600" />
      <div className="mt-3 h-3 w-28 rounded bg-slate-700" />
      <div className="mt-2 h-3 w-44 rounded bg-slate-800" />
    </div>
  );
}
