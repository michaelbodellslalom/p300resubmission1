import { render, screen } from '@testing-library/react';

import RevenuePage from '@/app/dashboard/revenue/page';

jest.mock('next/dynamic', () => () => () => null);

jest.mock('@/hooks/useFetchRevenueData', () => ({
  useFetchRevenueData: () => ({
    data: {
      timeline: [
        {
          date: '2026-06-01',
          adRevenue: 12000,
          sponsoredRevenue: 3300,
          subscriptionRevenueProxy: 9000,
          totalRevenue: 24300,
          rpm: 18.4,
        },
        {
          date: '2026-06-02',
          adRevenue: 12200,
          sponsoredRevenue: 3500,
          subscriptionRevenueProxy: 9100,
          totalRevenue: 24800,
          rpm: 18.7,
        },
      ],
      byFormat: [
        { format: 'video', contentCount: 5, totalRevenue: 8000, averageRpm: 19.2 },
      ],
    },
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

describe('RevenuePage integration', () => {
  it('renders revenue heading and by-format table', () => {
    render(<RevenuePage />);

    expect(screen.getByRole('heading', { name: 'Revenue' })).toBeInTheDocument();
    expect(screen.getByText('Revenue by Format')).toBeInTheDocument();
    expect(screen.getByText('video')).toBeInTheDocument();
  });
});
