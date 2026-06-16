import { useDashboardStore } from '@/store/dashboardStore';
import { type ContentMetric } from '@/types/dashboard';

const sampleContent: ContentMetric = {
  id: 'content-1',
  title: 'Sample Content',
  format: 'video',
  type: 'tutorial',
  publishDate: '2026-06-01',
  views: 1000,
  uniqueViewers: 750,
  engagementRate: 6.2,
  avgSessionMinutes: 4.5,
  attributedNewSubscribers: 42,
  churnInfluenceScore: 2.3,
  adRevenue: 180,
  rpm: 18,
};

function resetStore() {
  useDashboardStore.setState(
    {
      activeTab: 'overview',
      dateRange: { start: '2026-05-17', end: '2026-06-16' },
      filters: { contentFormat: 'all', contentType: 'all' },
      selectedContent: null,
      lastUpdatedAt: '2026-06-16T00:00:00.000Z',
      isRefreshing: false,
    },
  );
}

describe('dashboardStore', () => {
  beforeEach(() => {
    resetStore();
  });

  it('updates active tab and date range', () => {
    useDashboardStore.getState().setActiveTab('revenue');
    useDashboardStore.getState().setDateRange({ start: '2026-06-01', end: '2026-06-16' });

    const state = useDashboardStore.getState();
    expect(state.activeTab).toBe('revenue');
    expect(state.dateRange).toEqual({ start: '2026-06-01', end: '2026-06-16' });
  });

  it('updates content filters independently', () => {
    useDashboardStore.getState().setContentFormat('podcast');
    useDashboardStore.getState().setContentType('analysis');

    const state = useDashboardStore.getState();
    expect(state.filters.contentFormat).toBe('podcast');
    expect(state.filters.contentType).toBe('analysis');
  });

  it('handles selected content and reset filters', () => {
    useDashboardStore.getState().setSelectedContent(sampleContent);
    expect(useDashboardStore.getState().selectedContent?.id).toBe('content-1');

    useDashboardStore.getState().setContentFormat('video');
    useDashboardStore.getState().setContentType('tutorial');
    useDashboardStore.getState().resetFilters();

    const state = useDashboardStore.getState();
    expect(state.filters).toEqual({ contentFormat: 'all', contentType: 'all' });
    expect(state.selectedContent).toBeNull();
  });

  it('handles refresh lifecycle', () => {
    const before = useDashboardStore.getState().lastUpdatedAt;

    useDashboardStore.getState().markRefreshing(true);
    expect(useDashboardStore.getState().isRefreshing).toBe(true);

    useDashboardStore.getState().markUpdated();
    const afterState = useDashboardStore.getState();

    expect(afterState.isRefreshing).toBe(false);
    expect(new Date(afterState.lastUpdatedAt).getTime()).toBeGreaterThanOrEqual(new Date(before).getTime());
  });
});
