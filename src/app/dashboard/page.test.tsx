import { render, screen } from '@testing-library/react';

import OverviewPage from '@/app/dashboard/page';

jest.mock('next/dynamic', () => () => () => null);

jest.mock('@/hooks/useFetchSubscriberData', () => ({
  useFetchSubscriberData: () => ({
    data: {
      timeline: [],
      churnReasons: [],
      overview: {
        totalSubscribers: 150000,
        subscriberGrowthRate: 3.2,
        churnRate: 0.23,
        totalRevenue: 98000,
        revenueTrendRate: 4.5,
        avgEngagementRate: 6.1,
      },
    },
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/hooks/useFetchRevenueData', () => ({
  useFetchRevenueData: () => ({
    data: {
      timeline: [{ totalRevenue: 123000, rpm: 22.5 }],
      byFormat: [],
    },
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

describe('OverviewPage integration', () => {
  it('renders overview heading and KPI labels', () => {
    render(<OverviewPage />);

    expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument();
    expect(screen.getByText('Total Subscribers')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
  });
});
