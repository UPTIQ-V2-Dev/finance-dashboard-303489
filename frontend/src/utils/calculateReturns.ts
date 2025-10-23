import type { PerformanceData } from '@/types/portfolio';

export const calculateTotalReturn = (
    initialValue: number,
    currentValue: number
): { absoluteReturn: number; percentageReturn: number } => {
    const absoluteReturn = currentValue - initialValue;
    const percentageReturn = initialValue > 0 ? (absoluteReturn / initialValue) * 100 : 0;

    return {
        absoluteReturn,
        percentageReturn
    };
};

export const calculateAnnualizedReturn = (initialValue: number, currentValue: number, years: number): number => {
    if (initialValue <= 0 || years <= 0) return 0;

    return (Math.pow(currentValue / initialValue, 1 / years) - 1) * 100;
};

export const calculateVolatility = (performanceData: PerformanceData[]): number => {
    if (performanceData.length < 2) return 0;

    const returns = [];
    for (let i = 1; i < performanceData.length; i++) {
        const currentValue = performanceData[i].value;
        const previousValue = performanceData[i - 1].value;
        if (previousValue > 0) {
            returns.push((currentValue - previousValue) / previousValue);
        }
    }

    if (returns.length === 0) return 0;

    const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / returns.length;

    return Math.sqrt(variance) * Math.sqrt(252) * 100; // Annualized volatility
};

export const calculateMaxDrawdown = (performanceData: PerformanceData[]): number => {
    if (performanceData.length === 0) return 0;

    let maxDrawdown = 0;
    let peak = performanceData[0].value;

    for (const data of performanceData) {
        if (data.value > peak) {
            peak = data.value;
        }

        const drawdown = (peak - data.value) / peak;
        maxDrawdown = Math.max(maxDrawdown, drawdown);
    }

    return maxDrawdown * 100;
};

export const calculateSharpeRatio = (performanceData: PerformanceData[], riskFreeRate: number = 0.02): number => {
    if (performanceData.length < 2) return 0;

    const returns = [];
    for (let i = 1; i < performanceData.length; i++) {
        const currentValue = performanceData[i].value;
        const previousValue = performanceData[i - 1].value;
        if (previousValue > 0) {
            returns.push((currentValue - previousValue) / previousValue);
        }
    }

    if (returns.length === 0) return 0;

    const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / returns.length;
    const standardDeviation = Math.sqrt(variance);

    if (standardDeviation === 0) return 0;

    const annualizedReturn = meanReturn * 252;
    const annualizedVolatility = standardDeviation * Math.sqrt(252);

    return (annualizedReturn - riskFreeRate) / annualizedVolatility;
};
