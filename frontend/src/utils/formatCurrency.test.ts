import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercentage, formatCompactCurrency } from './formatCurrency';

describe('formatCurrency', () => {
    it('formats currency with default options', () => {
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });

    it('formats currency without symbol', () => {
        expect(formatCurrency(1234.56, { showSymbol: false })).toBe('1,234.56');
    });

    it('formats currency with different locale', () => {
        const result = formatCurrency(1234.56, { locale: 'de-DE', currency: 'EUR' });
        // Accept any valid EUR format due to system differences
        expect(result).toMatch(/1[.,]234[.,]56.*€/);
    });

    it('formats currency with custom fraction digits', () => {
        expect(formatCurrency(1234.5, { minimumFractionDigits: 0, maximumFractionDigits: 0 })).toBe('$1,235');
    });

    it('handles negative amounts', () => {
        expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('handles zero', () => {
        expect(formatCurrency(0)).toBe('$0.00');
    });

    it('handles large numbers', () => {
        expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
    });
});

describe('formatPercentage', () => {
    it('formats percentage with default options', () => {
        expect(formatPercentage(15.75)).toBe('15.75%');
    });

    it('formats percentage with sign for positive values', () => {
        expect(formatPercentage(15.75, { showSign: true })).toBe('+15.75%');
    });

    it('formats negative percentage', () => {
        expect(formatPercentage(-5.25)).toBe('-5.25%');
    });

    it('formats percentage with custom fraction digits', () => {
        expect(formatPercentage(15.7566, { minimumFractionDigits: 1, maximumFractionDigits: 1 })).toBe('15.8%');
    });

    it('handles zero percentage', () => {
        expect(formatPercentage(0)).toBe('0.00%');
    });

    it('handles small percentages', () => {
        expect(formatPercentage(0.01)).toBe('0.01%');
    });
});

describe('formatCompactCurrency', () => {
    it('formats small amounts normally', () => {
        expect(formatCompactCurrency(999)).toBe('$999.00');
    });

    it('formats thousands with K suffix', () => {
        expect(formatCompactCurrency(1500)).toBe('$1.5K');
        expect(formatCompactCurrency(12345)).toBe('$12.3K');
    });

    it('formats millions with M suffix', () => {
        expect(formatCompactCurrency(1500000)).toBe('$1.5M');
        expect(formatCompactCurrency(12345000)).toBe('$12.3M');
    });

    it('formats billions with B suffix', () => {
        expect(formatCompactCurrency(1500000000)).toBe('$1.5B');
        expect(formatCompactCurrency(12345000000)).toBe('$12.3B');
    });

    it('handles negative amounts', () => {
        expect(formatCompactCurrency(-1500000)).toBe('-$1.5M');
    });

    it('handles zero', () => {
        expect(formatCompactCurrency(0)).toBe('$0.00');
    });

    it('formats exact thousands/millions/billions', () => {
        expect(formatCompactCurrency(1000)).toBe('$1.0K');
        expect(formatCompactCurrency(1000000)).toBe('$1.0M');
        expect(formatCompactCurrency(1000000000)).toBe('$1.0B');
    });
});
