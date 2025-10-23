import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { PortfolioSummaryComponent } from './PortfolioSummary';
import { testPortfolioSummary } from '@/test/fixtures/portfolioData';

describe('PortfolioSummaryComponent', () => {
    it('displays portfolio summary cards with correct values', () => {
        render(<PortfolioSummaryComponent summary={testPortfolioSummary} />);

        expect(screen.getByText('Total Value')).toBeInTheDocument();
        expect(screen.getByText('$50,000.00')).toBeInTheDocument();

        expect(screen.getByText('Total Gain/Loss')).toBeInTheDocument();
        expect(screen.getByText('$5,000.00')).toBeInTheDocument();
        expect(screen.getByText('11.11%')).toBeInTheDocument();

        expect(screen.getByText('Day Change')).toBeInTheDocument();
        expect(screen.getByText('$250.00')).toBeInTheDocument();
        expect(screen.getByText('0.50%')).toBeInTheDocument();

        expect(screen.getByText('Total Invested')).toBeInTheDocument();
        expect(screen.getByText('$45,000.00')).toBeInTheDocument();

        expect(screen.getByText('Available Cash')).toBeInTheDocument();
        expect(screen.getByText('$2,500.00')).toBeInTheDocument();
    });

    it('applies positive styling for gains', () => {
        render(<PortfolioSummaryComponent summary={testPortfolioSummary} />);

        const gainLossValue = screen.getByText('$5,000.00');
        expect(gainLossValue).toHaveClass('text-green-600');
    });

    it('applies negative styling for losses', () => {
        const lossPortfolio = {
            ...testPortfolioSummary,
            totalGainLoss: -2000,
            totalGainLossPercentage: -4.44,
            dayChange: -100,
            dayChangePercentage: -0.2
        };

        render(<PortfolioSummaryComponent summary={lossPortfolio} />);

        const gainLossValue = screen.getByText('$-2,000.00');
        expect(gainLossValue).toHaveClass('text-red-600');

        const dayChangeValue = screen.getByText('$-100.00');
        expect(dayChangeValue).toHaveClass('text-red-600');
    });

    it('displays all card descriptions', () => {
        render(<PortfolioSummaryComponent summary={testPortfolioSummary} />);

        expect(screen.getByText('Portfolio value')).toBeInTheDocument();
        expect(screen.getByText('All-time performance')).toBeInTheDocument();
        expect(screen.getByText("Today's performance")).toBeInTheDocument();
        expect(screen.getByText('Amount invested')).toBeInTheDocument();
        expect(screen.getByText('Ready to invest')).toBeInTheDocument();
    });
});
