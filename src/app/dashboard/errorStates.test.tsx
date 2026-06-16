import { render, screen } from '@testing-library/react';

import ContentPage from '@/app/dashboard/content/page';
import RevenuePage from '@/app/dashboard/revenue/page';
import OverviewPage from '@/app/dashboard/page';

jest.mock('next/dynamic', () => () => () => null);

jest.mock('@/store/dashboardStore', () => ({
  useDashboardStore: (selector: (state: any) => any) =>
    selector({
      filters: { contentFormat: 'all', contentType: 'all' },
      setContentFormat: jest.fn(),
    }),
}));

jest.mock('@/hooks/useFetchSubscriberData', () => ({
  useFetchSubscriberData: () => ({
    data: undefined,
    isLoading: false,
    isError: true,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/hooks/useFetchContentData', () => ({
  useFetchContentData: () => ({
    data: undefined,
    isLoading: false,
    isError: true,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/hooks/useFetchRevenueData', () => ({
  useFetchRevenueData: () => ({
    data: undefined,
    isLoading: false,
    isError: true,
    refetch: jest.fn(),
  }),
}));

describe('dashboard error states', () => {
  it('renders overview error state', () => {
    render(<OverviewPage />);
    expect(screen.getByText('Unable to load one or more KPI data sources.')).toBeInTheDocument();
  });

  it('renders content error state', () => {
    render(<ContentPage />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load content data.');
  });

  it('renders revenue error state', () => {
    render(<RevenuePage />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load revenue data.');
  });
});
