import type { PortfolioSummary, Holding, PerformanceData } from '@/types/portfolio';
import type { Transaction } from '@/types/transaction';

export const testPortfolioSummary: PortfolioSummary = {
    id: 'test-portfolio-1',
    totalValue: 50000,
    totalGainLoss: 5000,
    totalGainLossPercentage: 11.11,
    dayChange: 250,
    dayChangePercentage: 0.5,
    totalInvested: 45000,
    availableCash: 2500,
    lastUpdated: '2024-12-20T10:00:00Z'
};

export const testHoldings: Holding[] = [
    {
        id: 'holding-1',
        symbol: 'TEST',
        name: 'Test Company Inc.',
        shares: 100,
        currentPrice: 100,
        totalValue: 10000,
        gainLoss: 1000,
        gainLossPercentage: 11.11,
        dayChange: 50,
        dayChangePercentage: 0.5,
        sector: 'Technology',
        lastUpdated: '2024-12-20T10:00:00Z'
    }
];

export const testPerformanceData: PerformanceData[] = [
    { date: '2024-01-01', value: 45000, benchmark: 45000 },
    { date: '2024-02-01', value: 47000, benchmark: 46000 },
    { date: '2024-03-01', value: 50000, benchmark: 47500 }
];

export const testTransactions: Transaction[] = [
    {
        id: 'tx-1',
        type: 'buy',
        symbol: 'TEST',
        shares: 10,
        price: 100,
        amount: -1000,
        date: '2024-12-20',
        description: 'Bought 10 shares of TEST',
        category: 'Investment',
        createdAt: '2024-12-20T10:00:00Z',
        updatedAt: '2024-12-20T10:00:00Z'
    }
];
