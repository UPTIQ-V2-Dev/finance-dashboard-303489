import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, DollarSign, ArrowRightLeft } from 'lucide-react';
import { formatCurrency } from '@/utils/formatCurrency';
import { format } from 'date-fns';
import type { Transaction } from '@/types/transaction';

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
    const getTransactionIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'buy':
                return <ArrowDownRight className='h-4 w-4 text-red-600' />;
            case 'sell':
                return <ArrowUpRight className='h-4 w-4 text-green-600' />;
            case 'dividend':
                return <DollarSign className='h-4 w-4 text-blue-600' />;
            case 'deposit':
                return <ArrowUpRight className='h-4 w-4 text-green-600' />;
            case 'withdrawal':
                return <ArrowDownRight className='h-4 w-4 text-red-600' />;
            default:
                return <ArrowRightLeft className='h-4 w-4 text-gray-600' />;
        }
    };

    const getTransactionColor = (type: Transaction['type'], amount: number) => {
        if (type === 'dividend' || type === 'deposit' || (type === 'sell' && amount > 0)) {
            return 'text-green-600';
        }
        if (type === 'buy' || type === 'withdrawal' || (type === 'sell' && amount < 0)) {
            return 'text-red-600';
        }
        return '';
    };

    const getBadgeVariant = (type: Transaction['type']) => {
        switch (type) {
            case 'buy':
            case 'withdrawal':
                return 'destructive' as const;
            case 'sell':
            case 'dividend':
            case 'deposit':
                return 'default' as const;
            default:
                return 'secondary' as const;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-lg font-semibold'>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    {transactions.length === 0 ? (
                        <p className='text-muted-foreground text-center py-4'>No recent transactions</p>
                    ) : (
                        transactions.map(transaction => (
                            <div
                                key={transaction.id}
                                className='flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors'
                            >
                                <div className='flex items-center gap-3'>
                                    {getTransactionIcon(transaction.type)}
                                    <div className='flex flex-col'>
                                        <div className='flex items-center gap-2'>
                                            <span className='font-medium'>{transaction.description}</span>
                                            <Badge
                                                variant={getBadgeVariant(transaction.type)}
                                                className='text-xs'
                                            >
                                                {transaction.type.toUpperCase()}
                                            </Badge>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                            {transaction.symbol && (
                                                <>
                                                    <span className='font-mono'>{transaction.symbol}</span>
                                                    {transaction.shares && <span>• {transaction.shares} shares</span>}
                                                    {transaction.price && (
                                                        <span>• {formatCurrency(transaction.price)}/share</span>
                                                    )}
                                                    <span>•</span>
                                                </>
                                            )}
                                            <span>{format(new Date(transaction.date), 'MMM d, yyyy')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <div
                                        className={`font-semibold ${getTransactionColor(
                                            transaction.type,
                                            transaction.amount
                                        )}`}
                                    >
                                        {transaction.amount > 0 ? '+' : ''}
                                        {formatCurrency(Math.abs(transaction.amount))}
                                    </div>
                                    {transaction.category && (
                                        <div className='text-xs text-muted-foreground'>{transaction.category}</div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
