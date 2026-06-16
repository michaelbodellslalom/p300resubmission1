"use client";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="card min-h-36 border border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40">
      <p className="text-sm font-semibold text-slate-200">{title}</p>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}
