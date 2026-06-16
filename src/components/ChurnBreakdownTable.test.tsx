import { fireEvent, render, screen } from '@testing-library/react';

import { ChurnBreakdownTable } from '@/components/ChurnBreakdownTable';

const sample = [
  { reason: 'Price sensitivity', percentage: 24.5, affectedSubscribers: 1300 },
  { reason: 'Low content relevance', percentage: 31.2, affectedSubscribers: 1800 },
  { reason: 'Competitor migration', percentage: 14.1, affectedSubscribers: 850 },
];

describe('ChurnBreakdownTable', () => {
  it('renders loading state', () => {
    render(<ChurnBreakdownTable data={[]} isLoading={true} isError={false} />);
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<ChurnBreakdownTable data={[]} isLoading={false} isError={false} />);
    expect(screen.getByText('No churn breakdown data')).toBeInTheDocument();
  });

  it('sorts by reason when header is clicked', () => {
    render(<ChurnBreakdownTable data={sample} isLoading={false} isError={false} />);

    fireEvent.click(screen.getByRole('button', { name: /sort by reason/i }));

    const cells = screen.getAllByRole('cell').map((cell) => cell.textContent);
    expect(cells.join(' ')).toContain('Competitor migration');
    expect(cells.join(' ')).toContain('Low content relevance');
    expect(cells.join(' ')).toContain('Price sensitivity');
  });
});
