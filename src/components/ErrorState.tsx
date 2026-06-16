"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  variant?: 'inline' | 'panel';
}

export function ErrorState({
  message = 'Failed to load KPI data',
  onRetry,
  variant = 'panel',
}: ErrorStateProps) {
  const isInline = variant === 'inline';

  return (
    <div
      role="alert"
      className={
        isInline
          ? 'state-enter rounded-lg border border-rose-500/60 bg-rose-500/10 p-4'
          : 'state-enter card flex min-h-[18rem] flex-col justify-center gap-2 border border-rose-500/60 bg-rose-500/10 p-4 sm:min-h-[20rem] sm:p-5'
      }
    >
      <p className="text-sm font-semibold text-rose-200">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 min-h-11 rounded-md border border-rose-300/50 bg-rose-500/20 px-3.5 py-2 text-sm font-semibold text-rose-100 hover:bg-rose-500/30 sm:min-h-9 sm:px-3 sm:py-1.5"
        >
          Retry
        </button>
      )}
    </div>
  );
}
