import { render, screen } from '@testing-library/react';

import { KPICard } from '@/components/KPICard';

describe('KPICard', () => {
  it('renders KPI label and value', () => {
    render(<KPICard label="Total Revenue" value="$120,000" helperText="Latest period" />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$120,000')).toBeInTheDocument();
    expect(screen.getByText('Latest period')).toBeInTheDocument();
  });

  it('renders loading state when isLoading is true', () => {
    render(<KPICard label="Avg RPM" value="..." isLoading={true} />);

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading Avg RPM')).toBeInTheDocument();
  });

  it('renders trend indicator', () => {
    render(<KPICard label="Growth" value="5.2%" trendValue={5.2} />);

    expect(screen.getByText(/\+5.20%/)).toBeInTheDocument();
  });
});
