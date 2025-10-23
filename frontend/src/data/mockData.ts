import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { PortfolioSummary, Holding, PerformanceData, AllocationData } from '@/types/portfolio';
import type { Transaction } from '@/types/transaction';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockPortfolioSummary: PortfolioSummary = {
    id: '1',
    totalValue: 125000.5,
    totalGainLoss: 15000.5,
    totalGainLossPercentage: 13.64,
    dayChange: 750.25,
    dayChangePercentage: 0.6,
    totalInvested: 110000.0,
    availableCash: 5000.0,
    lastUpdated: new Date().toISOString()
};

export const mockHoldings: Holding[] = [
    {
        id: '1',
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 100,
        currentPrice: 185.5,
        totalValue: 18550.0,
        gainLoss: 2550.0,
        gainLossPercentage: 15.94,
        dayChange: 125.0,
        dayChangePercentage: 0.68,
        sector: 'Technology',
        lastUpdated: new Date().toISOString()
    },
    {
        id: '2',
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        shares: 50,
        currentPrice: 142.3,
        totalValue: 7115.0,
        gainLoss: 615.0,
        gainLossPercentage: 9.47,
        dayChange: -75.5,
        dayChangePercentage: -1.05,
        sector: 'Technology',
        lastUpdated: new Date().toISOString()
    },
    {
        id: '3',
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        shares: 75,
        currentPrice: 415.75,
        totalValue: 31181.25,
        gainLoss: 3181.25,
        gainLossPercentage: 11.36,
        dayChange: 200.0,
        dayChangePercentage: 0.65,
        sector: 'Technology',
        lastUpdated: new Date().toISOString()
    },
    {
        id: '4',
        symbol: 'TSLA',
        name: 'Tesla, Inc.',
        shares: 25,
        currentPrice: 248.5,
        totalValue: 6212.5,
        gainLoss: -787.5,
        gainLossPercentage: -11.25,
        dayChange: -125.0,
        dayChangePercentage: -1.97,
        sector: 'Consumer Discretionary',
        lastUpdated: new Date().toISOString()
    },
    {
        id: '5',
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        shares: 30,
        currentPrice: 875.25,
        totalValue: 26257.5,
        gainLoss: 6257.5,
        gainLossPercentage: 31.29,
        dayChange: 450.0,
        dayChangePercentage: 1.74,
        sector: 'Technology',
        lastUpdated: new Date().toISOString()
    }
];

export const mockPerformanceData: PerformanceData[] = [
    { date: '2024-01-01', value: 110000, benchmark: 110000 },
    { date: '2024-02-01', value: 112500, benchmark: 111000 },
    { date: '2024-03-01', value: 108000, benchmark: 109500 },
    { date: '2024-04-01', value: 115000, benchmark: 112000 },
    { date: '2024-05-01', value: 118500, benchmark: 114500 },
    { date: '2024-06-01', value: 122000, benchmark: 116000 },
    { date: '2024-07-01', value: 119500, benchmark: 117500 },
    { date: '2024-08-01', value: 123000, benchmark: 118000 },
    { date: '2024-09-01', value: 125500, benchmark: 119500 },
    { date: '2024-10-01', value: 127000, benchmark: 121000 },
    { date: '2024-11-01', value: 125000, benchmark: 122000 },
    { date: '2024-12-01', value: 125000.5, benchmark: 122500 }
];

export const mockAllocationData: AllocationData[] = [
    { sector: 'Technology', value: 83103.75, percentage: 66.48, color: 'hsl(var(--chart-1))' },
    { sector: 'Consumer Discretionary', value: 6212.5, percentage: 4.97, color: 'hsl(var(--chart-2))' },
    { sector: 'Cash', value: 5000.0, percentage: 4.0, color: 'hsl(var(--chart-3))' },
    { sector: 'Other', value: 30684.25, percentage: 24.55, color: 'hsl(var(--chart-4))' }
];

export const mockRecentTransactions: Transaction[] = [
    {
        id: '1',
        type: 'buy',
        symbol: 'AAPL',
        shares: 10,
        price: 185.5,
        amount: -1855.0,
        date: '2024-12-20',
        description: 'Bought 10 shares of AAPL',
        category: 'Investment',
        tags: ['technology', 'blue-chip'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '2',
        type: 'dividend',
        symbol: 'MSFT',
        amount: 56.25,
        date: '2024-12-15',
        description: 'Quarterly dividend from MSFT',
        category: 'Income',
        tags: ['dividend', 'technology'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '3',
        type: 'sell',
        symbol: 'TSLA',
        shares: 5,
        price: 248.5,
        amount: 1242.5,
        date: '2024-12-10',
        description: 'Sold 5 shares of TSLA',
        category: 'Investment',
        tags: ['rebalancing'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '4',
        type: 'deposit',
        amount: 2000.0,
        date: '2024-12-05',
        description: 'Monthly deposit',
        category: 'Deposit',
        tags: ['savings'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: '5',
        type: 'buy',
        symbol: 'NVDA',
        shares: 2,
        price: 875.25,
        amount: -1750.5,
        date: '2024-12-01',
        description: 'Bought 2 shares of NVDA',
        category: 'Investment',
        tags: ['technology', 'growth'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
