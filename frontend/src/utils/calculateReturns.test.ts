import { describe, it, expect } from 'vitest';
import {
    calculateTotalReturn,
    calculateAnnualizedReturn,
    calculateVolatility,
    calculateMaxDrawdown,
    calculateSharpeRatio
} from './calculateReturns';
import type { PerformanceData } from '@/types/portfolio';

describe('calculateTotalReturn', () => {
    it('calculates positive return correctly', () => {
        const result = calculateTotalReturn(1000, 1200);

        expect(result.absoluteReturn).toBe(200);
        expect(result.percentageReturn).toBe(20);
    });

    it('calculates negative return correctly', () => {
        const result = calculateTotalReturn(1000, 800);

        expect(result.absoluteReturn).toBe(-200);
        expect(result.percentageReturn).toBe(-20);
    });

    it('handles zero initial value', () => {
        const result = calculateTotalReturn(0, 100);

        expect(result.absoluteReturn).toBe(100);
        expect(result.percentageReturn).toBe(0);
    });

    it('handles zero return', () => {
        const result = calculateTotalReturn(1000, 1000);

        expect(result.absoluteReturn).toBe(0);
        expect(result.percentageReturn).toBe(0);
    });
});

describe('calculateAnnualizedReturn', () => {
    it('calculates annualized return correctly', () => {
        const result = calculateAnnualizedReturn(1000, 1200, 2);

        expect(result).toBeCloseTo(9.54, 1); // (1200/1000)^(1/2) - 1 = 0.0954 = 9.54%
    });

    it('handles single year', () => {
        const result = calculateAnnualizedReturn(1000, 1200, 1);

        expect(result).toBeCloseTo(20, 1);
    });

    it('handles zero years', () => {
        const result = calculateAnnualizedReturn(1000, 1200, 0);

        expect(result).toBe(0);
    });

    it('handles zero initial value', () => {
        const result = calculateAnnualizedReturn(0, 1200, 2);

        expect(result).toBe(0);
    });
});

describe('calculateVolatility', () => {
    const testData: PerformanceData[] = [
        { date: '2024-01-01', value: 1000 },
        { date: '2024-02-01', value: 1100 },
        { date: '2024-03-01', value: 900 },
        { date: '2024-04-01', value: 1050 }
    ];

    it('calculates volatility for valid data', () => {
        const result = calculateVolatility(testData);

        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThan(500); // Volatility can be high with test data
    });

    it('returns zero for insufficient data', () => {
        const singlePoint: PerformanceData[] = [{ date: '2024-01-01', value: 1000 }];

        expect(calculateVolatility(singlePoint)).toBe(0);
        expect(calculateVolatility([])).toBe(0);
    });

    it('handles zero values', () => {
        const dataWithZero: PerformanceData[] = [
            { date: '2024-01-01', value: 0 },
            { date: '2024-02-01', value: 1000 }
        ];

        const result = calculateVolatility(dataWithZero);
        expect(result).toBe(0);
    });
});

describe('calculateMaxDrawdown', () => {
    it('calculates max drawdown correctly', () => {
        const testData: PerformanceData[] = [
            { date: '2024-01-01', value: 1000 },
            { date: '2024-02-01', value: 1200 }, // Peak
            { date: '2024-03-01', value: 800 }, // 33.33% drawdown from peak
            { date: '2024-04-01', value: 1100 }
        ];

        const result = calculateMaxDrawdown(testData);

        expect(result).toBeCloseTo(33.33, 1);
    });

    it('returns zero for consistently increasing values', () => {
        const testData: PerformanceData[] = [
            { date: '2024-01-01', value: 1000 },
            { date: '2024-02-01', value: 1100 },
            { date: '2024-03-01', value: 1200 }
        ];

        const result = calculateMaxDrawdown(testData);

        expect(result).toBe(0);
    });

    it('handles empty data', () => {
        expect(calculateMaxDrawdown([])).toBe(0);
    });

    it('handles single data point', () => {
        const singlePoint: PerformanceData[] = [{ date: '2024-01-01', value: 1000 }];

        expect(calculateMaxDrawdown(singlePoint)).toBe(0);
    });
});

describe('calculateSharpeRatio', () => {
    const testData: PerformanceData[] = [
        { date: '2024-01-01', value: 1000 },
        { date: '2024-02-01', value: 1020 },
        { date: '2024-03-01', value: 1050 },
        { date: '2024-04-01', value: 1030 }
    ];

    it('calculates Sharpe ratio for valid data', () => {
        const result = calculateSharpeRatio(testData, 0.02);

        expect(typeof result).toBe('number');
        expect(result).not.toBeNaN();
    });

    it('handles custom risk-free rate', () => {
        const result1 = calculateSharpeRatio(testData, 0.01);
        const result2 = calculateSharpeRatio(testData, 0.05);

        expect(result1).toBeGreaterThan(result2);
    });

    it('returns zero for insufficient data', () => {
        const singlePoint: PerformanceData[] = [{ date: '2024-01-01', value: 1000 }];

        expect(calculateSharpeRatio(singlePoint)).toBe(0);
        expect(calculateSharpeRatio([])).toBe(0);
    });

    it('handles zero volatility', () => {
        const constantData: PerformanceData[] = [
            { date: '2024-01-01', value: 1000 },
            { date: '2024-02-01', value: 1000 },
            { date: '2024-03-01', value: 1000 }
        ];

        const result = calculateSharpeRatio(constantData);

        expect(result).toBe(0);
    });
});
