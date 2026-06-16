"use client";

import Link from 'next/link';

import { type DashboardTab } from '@/types/dashboard';

interface TabNavigationProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const tabs: Array<{ key: DashboardTab; label: string; href: string }> = [
  { key: 'overview', label: 'Overview', href: '/dashboard' },
  { key: 'subscribers', label: 'Subscribers', href: '/dashboard/subscribers' },
  { key: 'content', label: 'Content', href: '/dashboard/content' },
  { key: 'revenue', label: 'Revenue', href: '/dashboard/revenue' },
  { key: 'reports', label: 'Reports', href: '/dashboard/reports' },
  { key: 'insights', label: 'Insights', href: '/dashboard/insights' },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/70 px-4 md:px-8" aria-label="Dashboard sections">
      <ul className="flex gap-1 overflow-x-auto py-2">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <li key={tab.key}>
              <Link
                href={tab.href}
                onClick={() => onTabChange(tab.key)}
                className={
                  isActive
                    ? 'inline-flex whitespace-nowrap rounded-md border border-cyan-500/50 bg-cyan-500/15 px-3 py-2 text-sm font-semibold text-cyan-300'
                    : 'inline-flex whitespace-nowrap rounded-md border border-transparent px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
