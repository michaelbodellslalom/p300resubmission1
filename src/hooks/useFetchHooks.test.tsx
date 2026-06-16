import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

import { useFetchContentData } from '@/hooks/useFetchContentData';
import { useFetchRevenueData } from '@/hooks/useFetchRevenueData';
import { useFetchSubscriberData } from '@/hooks/useFetchSubscriberData';
import { useDashboardStore } from '@/store/dashboardStore';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('custom data hooks', () => {
  beforeEach(() => {
    useDashboardStore.setState({
      dateRange: { start: '2026-05-17', end: '2026-06-16' },
      filters: { contentFormat: 'all', contentType: 'all' },
    });
  });

  it('loads subscriber data', async () => {
    const { result } = renderHook(() => useFetchSubscriberData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.timeline.length).toBeGreaterThan(0);
    expect(result.current.data?.overview.totalSubscribers).toBeGreaterThan(0);
  });

  it('loads filtered content data', async () => {
    useDashboardStore.getState().setContentFormat('video');

    const { result } = renderHook(() => useFetchContentData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.items.length).toBeGreaterThan(0);
    expect(result.current.data?.items.every((item) => item.format === 'video')).toBe(true);
  });

  it('loads revenue data with by-format aggregates', async () => {
    const { result } = renderHook(() => useFetchRevenueData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.timeline.length).toBeGreaterThan(0);
    expect(result.current.data?.byFormat.length).toBeGreaterThan(0);
  });
});
