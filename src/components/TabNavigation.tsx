"use client";

import { useState } from 'react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: DashboardTab) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950/70 px-4 md:px-8" aria-label="Dashboard sections">
      <div className="flex items-center justify-between py-2 md:hidden">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sections</p>
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-dashboard-sections"
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-slate-500"
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {isMobileMenuOpen && (
        <ul id="mobile-dashboard-sections" className="grid gap-1 pb-2 md:hidden">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;

            return (
              <li key={tab.key}>
                <Link
                  href={tab.href}
                  onClick={() => handleTabClick(tab.key)}
                  className={
                    isActive
                      ? 'block rounded-md border border-cyan-500/50 bg-cyan-500/15 px-3 py-2 text-sm font-semibold text-cyan-300'
                      : 'block rounded-md border border-transparent px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                  }
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <ul className="hidden gap-1 overflow-x-auto py-2 md:flex">
        {tabs.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <li key={tab.key}>
              <Link
                href={tab.href}
                onClick={() => handleTabClick(tab.key)}
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
