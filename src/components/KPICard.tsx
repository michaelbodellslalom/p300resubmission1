"use client";

interface KPICardProps {
  label: string;
  value: string;
  tone?: 'neutral' | 'success' | 'warning' | 'info';
  trendValue?: number;
  helperText?: string;
  isLoading?: boolean;
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
  return (
    <article className="card min-h-32">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>

      <p className={`mt-2 text-3xl font-bold ${toneClass(tone)}`}>
        {isLoading ? '...' : value}
      </p>

      {typeof trendValue === 'number' && (
        <p className={`mt-2 text-xs font-semibold ${trendClass(trendValue)}`}>
          {trendGlyph(trendValue)} {trendLabel(trendValue)}
        </p>
      )}

      {helperText && <p className="mt-1 text-xs text-slate-500">{helperText}</p>}
    </article>
  );
}
