import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { RecentTransactions } from './RecentTransactions';
import { testTransactions } from '@/test/fixtures/portfolioData';

describe('RecentTransactions', () => {
    it('displays transaction list when transactions are provided', () => {
        render(<RecentTransactions transactions={testTransactions} />);

        expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
        expect(screen.getByText('Bought 10 shares of TEST')).toBeInTheDocument();
        expect(screen.getByText('TEST')).toBeInTheDocument();
        expect(screen.getByText('10 shares')).toBeInTheDocument();
        expect(screen.getByText('$100.00/share')).toBeInTheDocument();
    });

    it('displays empty state when no transactions', () => {
        render(<RecentTransactions transactions={[]} />);

        expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
        expect(screen.getByText('No recent transactions')).toBeInTheDocument();
    });

    it('displays transaction badge with correct type', () => {
        render(<RecentTransactions transactions={testTransactions} />);

        expect(screen.getByText('BUY')).toBeInTheDocument();
    });

    it('formats transaction amount correctly', () => {
        render(<RecentTransactions transactions={testTransactions} />);

        expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    it('displays transaction date in correct format', () => {
        render(<RecentTransactions transactions={testTransactions} />);

        expect(screen.getByText('Dec 20, 2024')).toBeInTheDocument();
    });

    it('shows investment category', () => {
        render(<RecentTransactions transactions={testTransactions} />);

        expect(screen.getByText('Investment')).toBeInTheDocument();
    });
});
