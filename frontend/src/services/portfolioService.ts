import { api } from '@/lib/api';
import { mockPortfolioSummary, mockHoldings, mockPerformanceData, mockAllocationData } from '@/data/mockData';
import { mockApiDelay } from '@/lib/utils';
import type { PortfolioSummary, Holding, PerformanceData, AllocationData } from '@/types/portfolio';

export const portfolioService = {
    getSummary: async (): Promise<PortfolioSummary> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: portfolioService.getSummary ---');
            await mockApiDelay();
            return mockPortfolioSummary;
        }
        const response = await api.get('/api/portfolio/summary');
        return response.data;
    },

    getHoldings: async (): Promise<Holding[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: portfolioService.getHoldings ---');
            await mockApiDelay();
            return mockHoldings;
        }
        const response = await api.get('/api/portfolio/holdings');
        return response.data;
    },

    getPerformanceData: async (timeframe: string = '1Y'): Promise<PerformanceData[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: portfolioService.getPerformanceData ---', { timeframe });
            await mockApiDelay();
            return mockPerformanceData;
        }
        const response = await api.get(`/api/portfolio/performance?timeframe=${timeframe}`);
        return response.data;
    },

    getAllocationData: async (): Promise<AllocationData[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: portfolioService.getAllocationData ---');
            await mockApiDelay();
            return mockAllocationData;
        }
        const response = await api.get('/api/portfolio/allocation');
        return response.data;
    }
};
