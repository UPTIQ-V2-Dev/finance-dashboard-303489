export const formatCurrency = (
    amount: number,
    options: {
        currency?: string;
        locale?: string;
        showSymbol?: boolean;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
    } = {}
): string => {
    const {
        currency = 'USD',
        locale = 'en-US',
        showSymbol = true,
        minimumFractionDigits = 2,
        maximumFractionDigits = 2
    } = options;

    const formatter = new Intl.NumberFormat(locale, {
        style: showSymbol ? 'currency' : 'decimal',
        currency: showSymbol ? currency : undefined,
        minimumFractionDigits,
        maximumFractionDigits
    });

    return formatter.format(amount);
};

export const formatPercentage = (
    value: number,
    options: {
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
        showSign?: boolean;
    } = {}
): string => {
    const { minimumFractionDigits = 2, maximumFractionDigits = 2, showSign = false } = options;

    const formatted = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits,
        maximumFractionDigits
    }).format(value / 100);

    if (showSign && value > 0) {
        return `+${formatted}`;
    }

    return formatted;
};

export const formatCompactCurrency = (amount: number): string => {
    const absAmount = Math.abs(amount);

    if (absAmount >= 1e9) {
        return formatCurrency(amount / 1e9, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'B';
    }

    if (absAmount >= 1e6) {
        return formatCurrency(amount / 1e6, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'M';
    }

    if (absAmount >= 1e3) {
        return formatCurrency(amount / 1e3, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'K';
    }

    return formatCurrency(amount);
};
