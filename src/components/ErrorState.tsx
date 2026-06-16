"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = 'Failed to load KPI data',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-rose-500/60 bg-rose-500/10 p-4"
    >
      <p className="text-sm font-semibold text-rose-200">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md border border-rose-300/50 bg-rose-500/20 px-3 py-1.5 text-sm font-semibold text-rose-100 hover:bg-rose-500/30"
        >
          Retry
        </button>
      )}
    </div>
  );
}
