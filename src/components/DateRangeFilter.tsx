"use client";

import { useMemo } from 'react';

import { type DateRange } from '@/types/dashboard';

interface DateRangeFilterProps {
  dateRange: DateRange;
  onChange: (range: DateRange) => void;
}

type Preset = '7d' | '30d' | '90d' | '1y';

function toIsoDate(date: Date): string {
  return date.toISOString().split('T')[0] || '';
}

function fromPreset(preset: Preset): DateRange {
  const end = new Date();
  const start = new Date(end);

  if (preset === '7d') {
    start.setDate(end.getDate() - 7);
  } else if (preset === '30d') {
    start.setDate(end.getDate() - 30);
  } else if (preset === '90d') {
    start.setDate(end.getDate() - 90);
  } else {
    start.setFullYear(end.getFullYear() - 1);
  }

  return { start: toIsoDate(start), end: toIsoDate(end) };
}

function matchesPreset(range: DateRange, preset: Preset): boolean {
  const target = fromPreset(preset);
  return target.start === range.start && target.end === range.end;
}

export function DateRangeFilter({ dateRange, onChange }: DateRangeFilterProps) {
  const presets = useMemo<Array<{ key: Preset; label: string }>>(
    () => [
      { key: '7d', label: '7D' },
      { key: '30d', label: '30D' },
      { key: '90d', label: '90D' },
      { key: '1y', label: '1Y' },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-2 md:items-end">
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const active = matchesPreset(dateRange, preset.key);
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => onChange(fromPreset(preset.key))}
              className={
                active
                  ? 'min-h-11 rounded-md border border-cyan-400 bg-cyan-500/20 px-3.5 py-2 text-sm font-semibold text-cyan-200 sm:min-h-9 sm:px-3 sm:py-1 sm:text-xs'
                  : 'min-h-11 rounded-md border border-slate-700 bg-slate-900 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:border-slate-500 sm:min-h-9 sm:px-3 sm:py-1 sm:text-xs'
              }
            >
              {preset.label}
            </button>
          );
        })}
      </div>

      <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 text-sm text-slate-300 sm:w-auto sm:text-xs">
        <input
          aria-label="Start date"
          type="date"
          value={dateRange.start}
          onChange={(event) => onChange({ ...dateRange, start: event.target.value })}
          className="h-11 min-w-0 rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm sm:h-9 sm:text-xs"
        />
        <span className="text-slate-500">to</span>
        <input
          aria-label="End date"
          type="date"
          value={dateRange.end}
          onChange={(event) => onChange({ ...dateRange, end: event.target.value })}
          className="h-11 min-w-0 rounded-md border border-slate-700 bg-slate-900 px-2.5 text-sm sm:h-9 sm:text-xs"
        />
      </div>
    </div>
  );
}
