import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import ReportsPage from '@/app/dashboard/reports/page';

const subscriberHookMock = jest.fn();
const contentHookMock = jest.fn();
const revenueHookMock = jest.fn();
const storeHookMock = jest.fn();
const unparseMock = jest.fn(() => 'a,b\n1,2');
const clickMock = jest.fn();

jest.mock('papaparse', () => ({
  unparse: (...args: any[]) => (unparseMock as (...values: any[]) => string)(...args),
}));

jest.mock('@/components/PerformanceDashboard', () => ({
  PerformanceDashboard: () => <div>Performance Dashboard Stub</div>,
}));

jest.mock('@/hooks/useFetchSubscriberData', () => ({
  useFetchSubscriberData: () => subscriberHookMock(),
}));

jest.mock('@/hooks/useFetchContentData', () => ({
  useFetchContentData: () => contentHookMock(),
}));

jest.mock('@/hooks/useFetchRevenueData', () => ({
  useFetchRevenueData: () => revenueHookMock(),
}));

jest.mock('@/store/dashboardStore', () => ({
  useDashboardStore: (selector: (state: any) => any) => storeHookMock(selector),
}));

describe('ReportsPage', () => {
  const originalCreateElement = document.createElement.bind(document);

  beforeEach(() => {
    jest.clearAllMocks();

    storeHookMock.mockImplementation((selector: (state: any) => any) =>
      selector({ dateRange: { start: '2026-06-01', end: '2026-06-16' } }),
    );

    subscriberHookMock.mockReturnValue({
      data: {
        timeline: [
          {
            date: '2026-06-01',
            totalSubscribers: 100,
            newSubscribers: 10,
            churnedSubscribers: 3,
            churnRate: 0.03,
            netGrowth: 7,
          },
        ],
      },
      isLoading: false,
    });

    contentHookMock.mockReturnValue({
      data: {
        items: [
          {
            id: 'c-1',
            title: 'Sample Content',
            format: 'video',
            type: 'tutorial',
            publishDate: '2026-06-01',
            views: 1000,
            uniqueViewers: 850,
            engagementRate: 4.2,
            avgSessionMinutes: 3.1,
            attributedNewSubscribers: 20,
            churnInfluenceScore: 1.4,
            adRevenue: 120,
            rpm: 14,
          },
        ],
      },
      isLoading: false,
    });

    revenueHookMock.mockReturnValue({
      data: {
        timeline: [
          {
            date: '2026-06-01',
            adRevenue: 1200,
            sponsoredRevenue: 300,
            subscriptionRevenueProxy: 900,
            totalRevenue: 2400,
            rpm: 11,
          },
        ],
      },
      isLoading: false,
    });

    Object.defineProperty(URL, 'createObjectURL', {
      writable: true,
      value: jest.fn(() => 'blob:test-url'),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      writable: true,
      value: jest.fn(() => undefined),
    });
    jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') {
        return { href: '', download: '', click: clickMock } as unknown as HTMLAnchorElement;
      }

      return originalCreateElement(tagName);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders export cards and row counts', () => {
    render(<ReportsPage />);

    expect(screen.getByRole('heading', { name: 'Reports' })).toBeInTheDocument();
    expect(screen.getByText('Subscriber Timeline')).toBeInTheDocument();
    expect(screen.getByText('Content Performance')).toBeInTheDocument();
    expect(screen.getByText('Revenue Timeline')).toBeInTheDocument();
    expect(screen.getAllByText('1 rows available')).toHaveLength(3);
  });

  it('disables export actions while loading', () => {
    subscriberHookMock.mockReturnValueOnce({ data: undefined, isLoading: true });

    render(<ReportsPage />);

    const buttons = screen.getAllByRole('button', { name: 'Loading…' });
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => expect(button).toBeDisabled());
  });

  it('exports subscriber CSV via dynamic papaparse import', async () => {
    render(<ReportsPage />);

    const buttons = screen.getAllByRole('button', { name: 'Export CSV' });
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(unparseMock).toHaveBeenCalled();
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(clickMock).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:test-url');
    });
  });
});
