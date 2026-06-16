import { render, screen } from '@testing-library/react';

import { LoadingState } from '@/components/LoadingState';

describe('LoadingState', () => {
  it('renders default loading label', () => {
    render(<LoadingState />);
    expect(screen.getByLabelText('Loading data')).toBeInTheDocument();
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders a custom label for kpi variant', () => {
    render(<LoadingState label="Loading KPI" variant="kpi" />);
    expect(screen.getByLabelText('Loading KPI')).toBeInTheDocument();
  });
});
