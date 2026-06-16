"use client";

import { LoadingState } from '@/components/LoadingState';

interface KPICardProps {
  label: string;
  value: string;
  tone?: 'neutral' | 'success' | 'warning' | 'info';
  trendValue?: number;
  helperText?: string;
  isLoading?: boolean;
}

function containerClass(tone: KPICardProps['tone'] = 'neutral'): string {
  if (tone === 'success') {
    return 'border-emerald-500/30 bg-gradient-to-b from-emerald-500/8 to-slate-900/40';
  }
  if (tone === 'warning') {
    return 'border-amber-500/30 bg-gradient-to-b from-amber-500/8 to-slate-900/40';
  }
  if (tone === 'info') {
    return 'border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-slate-900/40';
  }
  return 'border-slate-700 bg-gradient-to-b from-slate-800/70 to-slate-900/40';
}

function toneClass(tone: KPICardProps['tone'] = 'neutral'): string {
  if (tone === 'success') return 'text-emerald-400';
  if (tone === 'warning') return 'text-amber-400';
  if (tone === 'info') return 'text-cyan-300';
  return 'text-slate-100';
}

function trendLabel(value: number): string {
  if (value > 0) return `+${value.toFixed(2)}%`;
  if (value < 0) return `${value.toFixed(2)}%`;
  return '0.00%';
}

function trendClass(value: number): string {
  if (value > 0) return 'text-emerald-300';
  if (value < 0) return 'text-rose-300';
  return 'text-slate-400';
}

function trendGlyph(value: number): string {
  if (value > 0) return '▲';
  if (value < 0) return '▼';
  return '■';
}

export function KPICard({
  label,
  value,
  tone = 'neutral',
  trendValue,
  helperText,
  isLoading = false,
}: KPICardProps) {
  if (isLoading) {
    return <LoadingState label={`Loading ${label}`} variant="kpi" />;
  }

  return (
    <article
      className={`card flex h-full min-h-32 flex-col justify-between border shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-cyan-500/10 sm:min-h-36 ${containerClass(tone)}`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>

      <p className={`mt-2 text-xl font-bold sm:text-2xl md:text-3xl ${toneClass(tone)}`}>{value}</p>

      {typeof trendValue === 'number' && (
        <p className={`mt-2 text-xs font-semibold ${trendClass(trendValue)}`}>
          {trendGlyph(trendValue)} {trendLabel(trendValue)}
        </p>
      )}

      {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </article>
  );
}
