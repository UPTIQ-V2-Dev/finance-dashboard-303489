export interface PortfolioSummary {
    id: string;
    totalValue: number;
    totalGainLoss: number;
    totalGainLossPercentage: number;
    dayChange: number;
    dayChangePercentage: number;
    totalInvested: number;
    availableCash: number;
    lastUpdated: string;
}

export interface Holding {
    id: string;
    symbol: string;
    name: string;
    shares: number;
    currentPrice: number;
    totalValue: number;
    gainLoss: number;
    gainLossPercentage: number;
    dayChange: number;
    dayChangePercentage: number;
    sector: string;
    logo?: string;
    lastUpdated: string;
}

export interface PerformanceData {
    date: string;
    value: number;
    benchmark?: number;
}

export interface AllocationData {
    sector: string;
    value: number;
    percentage: number;
    color: string;
}

export interface CreateHoldingInput {
    symbol: string;
    shares: number;
    purchasePrice: number;
    purchaseDate: string;
}

export interface UpdateHoldingInput {
    shares?: number;
    purchasePrice?: number;
}
