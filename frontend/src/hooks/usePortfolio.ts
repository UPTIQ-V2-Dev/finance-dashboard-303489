import { useQuery } from '@tanstack/react-query';
import { portfolioService } from '@/services/portfolioService';
import { transactionService } from '@/services/transactionService';

export const usePortfolioSummary = () => {
    return useQuery({
        queryKey: ['portfolio', 'summary'],
        queryFn: portfolioService.getSummary,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });
};

export const usePortfolioHoldings = () => {
    return useQuery({
        queryKey: ['portfolio', 'holdings'],
        queryFn: portfolioService.getHoldings,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });
};

export const usePortfolioPerformance = (timeframe: string = '1Y') => {
    return useQuery({
        queryKey: ['portfolio', 'performance', timeframe],
        queryFn: () => portfolioService.getPerformanceData(timeframe),
        staleTime: 1000 * 60 * 5 // 5 minutes
    });
};

export const usePortfolioAllocation = () => {
    return useQuery({
        queryKey: ['portfolio', 'allocation'],
        queryFn: portfolioService.getAllocationData,
        staleTime: 1000 * 60 * 5 // 5 minutes
    });
};

export const useRecentTransactions = (limit: number = 5) => {
    return useQuery({
        queryKey: ['transactions', 'recent', limit],
        queryFn: () => transactionService.getRecentTransactions(limit),
        staleTime: 1000 * 60 * 2 // 2 minutes
    });
};
