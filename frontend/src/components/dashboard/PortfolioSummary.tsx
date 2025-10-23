import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/formatCurrency';
import type { PortfolioSummary } from '@/types/portfolio';

interface PortfolioSummaryProps {
    summary: PortfolioSummary;
}

export const PortfolioSummaryComponent = ({ summary }: PortfolioSummaryProps) => {
    const isGainPositive = summary.totalGainLoss >= 0;
    const isDayChangePositive = summary.dayChange >= 0;

    const summaryCards = [
        {
            title: 'Total Value',
            value: formatCurrency(summary.totalValue),
            icon: DollarSign,
            description: 'Portfolio value'
        },
        {
            title: 'Total Gain/Loss',
            value: formatCurrency(summary.totalGainLoss),
            percentage: formatPercentage(summary.totalGainLossPercentage),
            icon: isGainPositive ? TrendingUp : TrendingDown,
            description: 'All-time performance',
            isPositive: isGainPositive
        },
        {
            title: 'Day Change',
            value: formatCurrency(summary.dayChange),
            percentage: formatPercentage(summary.dayChangePercentage),
            icon: isDayChangePositive ? TrendingUp : TrendingDown,
            description: "Today's performance",
            isPositive: isDayChangePositive
        },
        {
            title: 'Total Invested',
            value: formatCurrency(summary.totalInvested),
            icon: Wallet,
            description: 'Amount invested'
        },
        {
            title: 'Available Cash',
            value: formatCurrency(summary.availableCash),
            icon: PiggyBank,
            description: 'Ready to invest'
        }
    ];

    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
            {summaryCards.map((card, index) => {
                const IconComponent = card.icon;
                const isPositive = card.isPositive;

                return (
                    <Card
                        key={index}
                        className='relative'
                    >
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium text-muted-foreground'>{card.title}</CardTitle>
                            <IconComponent
                                className={`h-4 w-4 ${
                                    isPositive === true
                                        ? 'text-green-600'
                                        : isPositive === false
                                          ? 'text-red-600'
                                          : 'text-muted-foreground'
                                }`}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col'>
                                <div
                                    className={`text-2xl font-bold ${
                                        isPositive === true
                                            ? 'text-green-600'
                                            : isPositive === false
                                              ? 'text-red-600'
                                              : ''
                                    }`}
                                >
                                    {card.value}
                                </div>
                                {card.percentage && (
                                    <div
                                        className={`text-xs flex items-center mt-1 ${
                                            isPositive === true
                                                ? 'text-green-600'
                                                : isPositive === false
                                                  ? 'text-red-600'
                                                  : 'text-muted-foreground'
                                        }`}
                                    >
                                        <span>{card.percentage}</span>
                                    </div>
                                )}
                                <p className='text-xs text-muted-foreground mt-1'>{card.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};
