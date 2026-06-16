"use client";

interface LoadingStateProps {
  label?: string;
  variant?: 'kpi' | 'panel';
}

export function LoadingState({ label = 'Loading data', variant = 'panel' }: LoadingStateProps) {
  const isKpi = variant === 'kpi';

  return (
    <div
      aria-live="polite"
      aria-label={label}
      className={`state-enter card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/50 ${
        isKpi ? 'min-h-32 sm:min-h-36' : 'min-h-[18rem] sm:min-h-[20rem]'
      }`}
      data-testid="loading-skeleton"
    >
      <div className="animate-pulse">
      <div className="h-3 w-28 rounded bg-slate-700" />
      {isKpi ? (
        <>
          <div className="mt-3 h-8 w-40 rounded bg-slate-600" />
          <div className="mt-3 h-3 w-28 rounded bg-slate-700" />
          <div className="mt-2 h-3 w-44 rounded bg-slate-800" />
        </>
      ) : (
        <>
          <div className="mt-3 h-3 w-56 max-w-full rounded bg-slate-700" />
          <div className="mt-4 h-36 w-full rounded-md bg-slate-800/80 sm:h-44" />
          <div className="mt-3 h-3 w-32 rounded bg-slate-700" />
        </>
      )}
      </div>
    </div>
  );
}
