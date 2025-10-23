import { describe, it, expect, vi, afterEach } from 'vitest';
import { portfolioService } from './portfolioService';
import { mockPortfolioSummary, mockHoldings, mockPerformanceData, mockAllocationData } from '@/data/mockData';

// Mock the API module
vi.mock('@/lib/api', () => ({
    api: {
        get: vi.fn()
    }
}));

// Mock the utils module
vi.mock('@/lib/utils', () => ({
    mockApiDelay: vi.fn().mockResolvedValue(undefined)
}));

describe('portfolioService', () => {
    const originalEnv = import.meta.env.VITE_USE_MOCK_DATA;

    afterEach(() => {
        vi.clearAllMocks();
        import.meta.env.VITE_USE_MOCK_DATA = originalEnv;
    });

    describe('getSummary', () => {
        it('returns mock data when VITE_USE_MOCK_DATA is true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'true';

            const result = await portfolioService.getSummary();

            expect(result).toEqual(mockPortfolioSummary);
        });

        it('calls API when VITE_USE_MOCK_DATA is not true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'false';

            const { api } = await import('@/lib/api');
            const mockApi = vi.mocked(api);
            mockApi.get.mockResolvedValue({ data: mockPortfolioSummary });

            const result = await portfolioService.getSummary();

            expect(mockApi.get).toHaveBeenCalledWith('/api/portfolio/summary');
            expect(result).toEqual(mockPortfolioSummary);
        });
    });

    describe('getHoldings', () => {
        it('returns mock data when VITE_USE_MOCK_DATA is true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'true';

            const result = await portfolioService.getHoldings();

            expect(result).toEqual(mockHoldings);
        });

        it('calls API when VITE_USE_MOCK_DATA is not true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'false';

            const { api } = await import('@/lib/api');
            const mockApi = vi.mocked(api);
            mockApi.get.mockResolvedValue({ data: mockHoldings });

            const result = await portfolioService.getHoldings();

            expect(mockApi.get).toHaveBeenCalledWith('/api/portfolio/holdings');
            expect(result).toEqual(mockHoldings);
        });
    });

    describe('getPerformanceData', () => {
        it('returns mock data when VITE_USE_MOCK_DATA is true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'true';

            const result = await portfolioService.getPerformanceData('1Y');

            expect(result).toEqual(mockPerformanceData);
        });

        it('calls API with timeframe parameter', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'false';

            const { api } = await import('@/lib/api');
            const mockApi = vi.mocked(api);
            mockApi.get.mockResolvedValue({ data: mockPerformanceData });

            const result = await portfolioService.getPerformanceData('6M');

            expect(mockApi.get).toHaveBeenCalledWith('/api/portfolio/performance?timeframe=6M');
            expect(result).toEqual(mockPerformanceData);
        });

        it('uses default timeframe when not provided', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'false';

            const { api } = await import('@/lib/api');
            const mockApi = vi.mocked(api);
            mockApi.get.mockResolvedValue({ data: mockPerformanceData });

            await portfolioService.getPerformanceData();

            expect(mockApi.get).toHaveBeenCalledWith('/api/portfolio/performance?timeframe=1Y');
        });
    });

    describe('getAllocationData', () => {
        it('returns mock data when VITE_USE_MOCK_DATA is true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'true';

            const result = await portfolioService.getAllocationData();

            expect(result).toEqual(mockAllocationData);
        });

        it('calls API when VITE_USE_MOCK_DATA is not true', async () => {
            import.meta.env.VITE_USE_MOCK_DATA = 'false';

            const { api } = await import('@/lib/api');
            const mockApi = vi.mocked(api);
            mockApi.get.mockResolvedValue({ data: mockAllocationData });

            const result = await portfolioService.getAllocationData();

            expect(mockApi.get).toHaveBeenCalledWith('/api/portfolio/allocation');
            expect(result).toEqual(mockAllocationData);
        });
    });
});
