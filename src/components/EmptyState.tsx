"use client";

interface EmptyStateProps {
  title: string;
  description: string;
  variant?: 'compact' | 'panel';
}

export function EmptyState({ title, description, variant = 'panel' }: EmptyStateProps) {
  const isCompact = variant === 'compact';

  return (
    <div
      className={`card border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40 ${
        isCompact ? 'min-h-32 sm:min-h-36' : 'min-h-[18rem] sm:min-h-[20rem]'
      }`}
    >
      <p className="text-sm font-semibold text-slate-200">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}
