"use client";

import { ReactNode, useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { Header } from '@/components/Header';
import { TabNavigation } from '@/components/TabNavigation';
import { useDashboardStore } from '@/store/dashboardStore';
import { type DashboardTab } from '@/types/dashboard';

interface DashboardShellProps {
  children: ReactNode;
}

function tabFromPath(pathname: string): DashboardTab {
  if (pathname.startsWith('/dashboard/subscribers')) return 'subscribers';
  if (pathname.startsWith('/dashboard/content')) return 'content';
  if (pathname.startsWith('/dashboard/revenue')) return 'revenue';
  if (pathname.startsWith('/dashboard/reports')) return 'reports';
  if (pathname.startsWith('/dashboard/insights')) return 'insights';
  if (pathname.startsWith('/dashboard/recommendations')) return 'recommendations';
  return 'overview';
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const activeTab = useDashboardStore((state) => state.activeTab);
  const setActiveTab = useDashboardStore((state) => state.setActiveTab);

  useEffect(() => {
    const derived = tabFromPath(pathname);
    if (derived !== activeTab) {
      setActiveTab(derived);
    }
  }, [activeTab, pathname, setActiveTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <a href="#dashboard-main" className="skip-link">Skip to main content</a>
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main id="dashboard-main" className="px-3 py-4 sm:px-4 sm:py-5 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
