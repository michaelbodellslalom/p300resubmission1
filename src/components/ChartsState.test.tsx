import { render, screen } from '@testing-library/react';

import { ContentEngagementScatter } from '@/components/ContentEngagementScatter';
import { RevenueTrendChart } from '@/components/RevenueTrendChart';
import { SubscriberTrendChart } from '@/components/SubscriberTrendChart';

describe('chart component states', () => {
  it('renders subscriber trend loading state', () => {
    render(<SubscriberTrendChart data={[]} isLoading={true} isError={false} />);
    expect(screen.getByLabelText('Loading subscriber trend')).toBeInTheDocument();
  });

  it('renders revenue trend empty state', () => {
    render(<RevenueTrendChart data={[]} isLoading={false} isError={false} />);
    expect(screen.getByText('No revenue trend data')).toBeInTheDocument();
  });

  it('renders content scatter error state', () => {
    render(<ContentEngagementScatter data={[]} isLoading={false} isError={true} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load correlation data.');
  });
});
