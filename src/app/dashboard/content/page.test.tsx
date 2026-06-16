import { render, screen } from '@testing-library/react';

import ContentPage from '@/app/dashboard/content/page';

jest.mock('@/hooks/useFetchContentData', () => ({
  useFetchContentData: () => ({
    data: {
      items: [
        {
          id: '1',
          title: 'Sample Content',
          format: 'video',
          type: 'tutorial',
          publishDate: '2026-06-01',
          views: 12000,
          uniqueViewers: 9000,
          engagementRate: 6.4,
          avgSessionMinutes: 4.2,
          attributedNewSubscribers: 340,
          churnInfluenceScore: 2.1,
          adRevenue: 420,
          rpm: 18.2,
        },
      ],
      totalItems: 1,
    },
    isLoading: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/store/dashboardStore', () => ({
  useDashboardStore: (selector: (state: any) => any) =>
    selector({
      filters: { contentFormat: 'all', contentType: 'all' },
      setContentFormat: jest.fn(),
    }),
}));

describe('ContentPage integration', () => {
  it('renders content heading and performance section', () => {
    render(<ContentPage />);

    expect(screen.getByRole('heading', { name: 'Content' })).toBeInTheDocument();
    expect(screen.getByText('Content Performance')).toBeInTheDocument();
    expect(screen.getByText('Sample Content')).toBeInTheDocument();
  });
});
