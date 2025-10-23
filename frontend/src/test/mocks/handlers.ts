import { http, HttpResponse } from 'msw';
import {
    mockPortfolioSummary,
    mockHoldings,
    mockPerformanceData,
    mockAllocationData,
    mockRecentTransactions
} from '@/data/mockData';

export const handlers = [
    // Portfolio endpoints
    http.get('/api/portfolio/summary', () => {
        return HttpResponse.json(mockPortfolioSummary);
    }),

    http.get('/api/portfolio/holdings', () => {
        return HttpResponse.json(mockHoldings);
    }),

    http.get('/api/portfolio/performance', ({ request }) => {
        const url = new URL(request.url);
        const timeframe = url.searchParams.get('timeframe');
        console.log('MSW: Performance data requested for timeframe:', timeframe);
        return HttpResponse.json(mockPerformanceData);
    }),

    http.get('/api/portfolio/allocation', () => {
        return HttpResponse.json(mockAllocationData);
    }),

    // Transaction endpoints
    http.get('/api/transactions/recent', ({ request }) => {
        const url = new URL(request.url);
        const limit = Number(url.searchParams.get('limit')) || 5;
        return HttpResponse.json(mockRecentTransactions.slice(0, limit));
    }),

    http.get('/api/transactions', ({ request }) => {
        const url = new URL(request.url);
        const type = url.searchParams.get('type');
        const symbol = url.searchParams.get('symbol');

        let filteredTransactions = [...mockRecentTransactions];

        if (type) {
            filteredTransactions = filteredTransactions.filter(t => t.type === type);
        }

        if (symbol) {
            filteredTransactions = filteredTransactions.filter(t => t.symbol === symbol);
        }

        return HttpResponse.json(filteredTransactions);
    }),

    // Error simulation endpoints for testing
    http.get('/api/portfolio/summary-error', () => {
        return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    })
];
