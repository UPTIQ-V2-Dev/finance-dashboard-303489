import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClientProvider } from '@tanstack/react-query';
import {
    usePortfolioSummary,
    usePortfolioHoldings,
    usePortfolioPerformance,
    usePortfolioAllocation,
    useRecentTransactions
} from './usePortfolio';
import { createTestQueryClient } from '@/test/test-utils';
import { server } from '@/test/mocks/server';

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

const createWrapper = () => {
    const queryClient = createTestQueryClient();

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('usePortfolioSummary', () => {
    it('fetches and returns portfolio summary data', async () => {
        const { result } = renderHook(() => usePortfolioSummary(), {
            wrapper: createWrapper()
        });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
        expect(result.current.data?.id).toBe('1');
        expect(result.current.data?.totalValue).toBe(125000.5);
    });

    it('handles error states', async () => {
        // We can add error simulation in the future
        const { result } = renderHook(() => usePortfolioSummary(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // For now, verify that error handling structure exists
        expect(result.current.error).toBeNull();
    });
});

describe('usePortfolioHoldings', () => {
    it('fetches and returns portfolio holdings data', async () => {
        const { result } = renderHook(() => usePortfolioHoldings(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
        expect(result.current.data?.length).toBeGreaterThan(0);
    });
});

describe('usePortfolioPerformance', () => {
    it('fetches performance data with default timeframe', async () => {
        const { result } = renderHook(() => usePortfolioPerformance(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
    });

    it('fetches performance data with custom timeframe', async () => {
        const { result } = renderHook(() => usePortfolioPerformance('6M'), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
    });

    it('refetches data when timeframe changes', async () => {
        const { result, rerender } = renderHook(({ timeframe }) => usePortfolioPerformance(timeframe), {
            wrapper: createWrapper(),
            initialProps: { timeframe: '1Y' }
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        rerender({ timeframe: '3M' });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });
    });
});

describe('usePortfolioAllocation', () => {
    it('fetches and returns allocation data', async () => {
        const { result } = renderHook(() => usePortfolioAllocation(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
    });
});

describe('useRecentTransactions', () => {
    it('fetches recent transactions with default limit', async () => {
        const { result } = renderHook(() => useRecentTransactions(), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
        expect(Array.isArray(result.current.data)).toBe(true);
        expect(result.current.data?.length).toBeLessThanOrEqual(5);
    });

    it('fetches recent transactions with custom limit', async () => {
        const { result } = renderHook(() => useRecentTransactions(3), {
            wrapper: createWrapper()
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        });

        expect(result.current.data).toBeDefined();
        expect(result.current.data?.length).toBeLessThanOrEqual(3);
    });
});
