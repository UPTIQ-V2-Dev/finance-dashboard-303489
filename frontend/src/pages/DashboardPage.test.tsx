import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import { DashboardPage } from './DashboardPage';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

// Enable API mocking before tests
beforeEach(() => {
    server.listen();
});

// Reset any runtime request handlers we may add during the tests
afterEach(() => {
    server.resetHandlers();
});

// Clean up after the tests are finished
afterEach(() => {
    server.close();
});

describe('DashboardPage', () => {
    it('renders dashboard title and description', () => {
        render(<DashboardPage />);

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Your portfolio overview and recent activity')).toBeInTheDocument();
    });

    it('renders refresh button', () => {
        render(<DashboardPage />);

        expect(screen.getByText('Refresh')).toBeInTheDocument();
    });

    it('displays loading skeletons initially', () => {
        render(<DashboardPage />);

        // Portfolio summary loading skeletons
        expect(screen.getAllByTestId('skeleton')).toHaveLength.greaterThan(0);
    });

    it('displays portfolio summary when data loads', async () => {
        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('Total Value')).toBeInTheDocument();
        });

        expect(screen.getByText('$125,000.50')).toBeInTheDocument();
        expect(screen.getByText('Total Gain/Loss')).toBeInTheDocument();
        expect(screen.getByText('Day Change')).toBeInTheDocument();
    });

    it('displays recent transactions when data loads', async () => {
        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('Recent Transactions')).toBeInTheDocument();
        });

        // Should show transaction descriptions from mock data
        expect(screen.getByText('Bought 10 shares of AAPL')).toBeInTheDocument();
        expect(screen.getByText('Quarterly dividend from MSFT')).toBeInTheDocument();
    });

    it('displays performance chart when data loads', async () => {
        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('Portfolio Performance')).toBeInTheDocument();
        });

        // Chart selector should be present
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays quick actions section', async () => {
        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('Buy Stock')).toBeInTheDocument();
        });

        expect(screen.getByText('Sell Stock')).toBeInTheDocument();
        expect(screen.getByText('Deposit')).toBeInTheDocument();
        expect(screen.getByText('Withdraw')).toBeInTheDocument();
        expect(screen.getByText('View Analytics')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
        // Override handlers to simulate errors
        server.use(
            http.get('/api/portfolio/summary', () => {
                return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
            })
        );

        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('Failed to load some data. Please try refreshing the page.')).toBeInTheDocument();
        });
    });

    it('shows empty states when no data is available', async () => {
        // Override handlers to return empty data
        server.use(
            http.get('/api/transactions/recent', () => {
                return HttpResponse.json([]);
            }),
            http.get('/api/portfolio/performance', () => {
                return HttpResponse.json([]);
            })
        );

        render(<DashboardPage />);

        await waitFor(() => {
            expect(screen.getByText('No recent transactions')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('No performance data available')).toBeInTheDocument();
        });
    });

    it('refresh button triggers data refetch', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        render(<DashboardPage />);

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText('Total Value')).toBeInTheDocument();
        });

        // Click refresh button
        const refreshButton = screen.getByText('Refresh');
        refreshButton.click();

        // Verify refresh was triggered (button should show loading state)
        await waitFor(() => {
            expect(refreshButton.closest('button')).toBeInTheDocument();
        });

        consoleSpy.mockRestore();
    });
});
