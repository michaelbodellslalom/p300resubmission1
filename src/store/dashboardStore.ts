import { create } from 'zustand';

import {
  type ContentFormat,
  type ContentMetric,
  type ContentType,
  type DashboardTab,
  type DateRange,
} from '@/types/dashboard';

interface DashboardFilters {
  contentFormat: ContentFormat | 'all';
  contentType: ContentType | 'all';
}

interface DashboardStoreState {
  activeTab: DashboardTab;
  dateRange: DateRange;
  filters: DashboardFilters;
  selectedContent: ContentMetric | null;
  lastUpdatedAt: string;
  isRefreshing: boolean;
}

interface DashboardStoreActions {
  setActiveTab: (tab: DashboardTab) => void;
  setDateRange: (dateRange: DateRange) => void;
  setContentFormat: (format: ContentFormat | 'all') => void;
  setContentType: (contentType: ContentType | 'all') => void;
  setSelectedContent: (content: ContentMetric | null) => void;
  markRefreshing: (refreshing: boolean) => void;
  markUpdated: () => void;
  resetFilters: () => void;
}

export type DashboardStore = DashboardStoreState & DashboardStoreActions;

const nowIso = (): string => new Date().toISOString();

const defaultDateRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    start: start.toISOString().split('T')[0] || '',
    end: now.toISOString().split('T')[0] || '',
  };
};

const defaultFilters = (): DashboardFilters => ({
  contentFormat: 'all',
  contentType: 'all',
});

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeTab: 'overview',
  dateRange: defaultDateRange(),
  filters: defaultFilters(),
  selectedContent: null,
  lastUpdatedAt: nowIso(),
  isRefreshing: false,

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setDateRange: (dateRange) => {
    set({ dateRange });
  },

  setContentFormat: (format) => {
    set((state) => ({
      filters: {
        ...state.filters,
        contentFormat: format,
      },
    }));
  },

  setContentType: (contentType) => {
    set((state) => ({
      filters: {
        ...state.filters,
        contentType,
      },
    }));
  },

  setSelectedContent: (content) => {
    set({ selectedContent: content });
  },

  markRefreshing: (refreshing) => {
    set({ isRefreshing: refreshing });
  },

  markUpdated: () => {
    set({ lastUpdatedAt: nowIso(), isRefreshing: false });
  },

  resetFilters: () => {
    set({
      filters: defaultFilters(),
      dateRange: defaultDateRange(),
      selectedContent: null,
    });
  },
}));
