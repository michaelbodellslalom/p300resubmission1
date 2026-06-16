import { render, screen } from '@testing-library/react';

import RecommendationsPage from '@/app/dashboard/recommendations/page';

const subscriberHookMock = jest.fn();
const contentHookMock = jest.fn();
const revenueHookMock = jest.fn();

jest.mock('@/hooks/useFetchSubscriberData', () => ({
  useFetchSubscriberData: () => subscriberHookMock(),
}));

jest.mock('@/hooks/useFetchContentData', () => ({
  useFetchContentData: () => contentHookMock(),
}));

jest.mock('@/hooks/useFetchRevenueData', () => ({
  useFetchRevenueData: () => revenueHookMock(),
}));

describe('RecommendationsPage', () => {
  beforeEach(() => {
    subscriberHookMock.mockReturnValue({
      data: {
        overview: { churnRate: 0.35 },
        churnReasons: [
          { reason: 'Price sensitivity', percentage: 34.2, affectedSubscribers: 2100 },
          { reason: 'Low relevance', percentage: 21.5, affectedSubscribers: 1300 },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    contentHookMock.mockReturnValue({
      data: {
        items: [
          {
            id: '1',
            title: 'Video One',
            format: 'video',
            type: 'tutorial',
            publishDate: '2026-06-01',
            views: 12000,
            uniqueViewers: 9000,
            engagementRate: 4.1,
            avgSessionMinutes: 5.2,
            attributedNewSubscribers: 300,
            churnInfluenceScore: 2.3,
            adRevenue: 600,
            rpm: 22,
          },
          {
            id: '2',
            title: 'Article One',
            format: 'article',
            type: 'analysis',
            publishDate: '2026-06-02',
            views: 8000,
            uniqueViewers: 6000,
            engagementRate: 2.2,
            avgSessionMinutes: 3.4,
            attributedNewSubscribers: 120,
            churnInfluenceScore: 1.8,
            adRevenue: 250,
            rpm: 15,
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    revenueHookMock.mockReturnValue({
      data: {
        timeline: [
          {
            date: '2026-06-01',
            adRevenue: 12000,
            sponsoredRevenue: 3000,
            subscriptionRevenueProxy: 9000,
            totalRevenue: 24000,
            rpm: 18.2,
          },
          {
            date: '2026-06-15',
            adRevenue: 13000,
            sponsoredRevenue: 3400,
            subscriptionRevenueProxy: 9500,
            totalRevenue: 25900,
            rpm: 19.1,
          },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });
  });

  it('renders recommendations from available data', () => {
    render(<RecommendationsPage />);

    expect(screen.getByRole('heading', { name: 'Recommendations' })).toBeInTheDocument();
    expect(screen.getByText('Reduce immediate churn risk')).toBeInTheDocument();
    expect(screen.getByText('Fix low-engagement format drag')).toBeInTheDocument();
    expect(screen.getByText('Prioritize monetization on high-scale format')).toBeInTheDocument();
    expect(screen.getByText('Create cross-functional weekly action loop')).toBeInTheDocument();
  });

  it('renders error state when any source fails', () => {
    revenueHookMock.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });

    render(<RecommendationsPage />);

    expect(
      screen.getByText('Unable to generate recommendations from one or more data sources.'),
    ).toBeInTheDocument();
  });

  it('renders loading placeholders while data is loading', () => {
    subscriberHookMock.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(<RecommendationsPage />);

    expect(document.querySelectorAll('.animate-pulse').length).toBeGreaterThan(0);
  });

  it('uses fallback wording for sparse datasets', () => {
    subscriberHookMock.mockReturnValueOnce({
      data: {
        overview: { churnRate: 0 },
        churnReasons: [],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    contentHookMock.mockReturnValueOnce({
      data: { items: [] },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    revenueHookMock.mockReturnValueOnce({
      data: { timeline: [] },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<RecommendationsPage />);

    expect(screen.getByText(/top driver is n\/a/i)).toBeInTheDocument();
    expect(screen.getByText(/Lowest format has the weakest engagement/i)).toBeInTheDocument();
    expect(screen.getByText(/Top format carries the highest view volume/i)).toBeInTheDocument();
  });
});
