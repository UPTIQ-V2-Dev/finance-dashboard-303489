import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Upload, Download, BarChart3, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
    onBuyStock?: () => void;
    onSellStock?: () => void;
    onDeposit?: () => void;
    onWithdraw?: () => void;
}

export const QuickActions = ({ onBuyStock, onSellStock, onDeposit, onWithdraw }: QuickActionsProps) => {
    const actions = [
        {
            title: 'Buy Stock',
            description: 'Purchase new shares',
            icon: Plus,
            onClick: onBuyStock,
            variant: 'default' as const,
            className: 'bg-green-600 hover:bg-green-700 text-white'
        },
        {
            title: 'Sell Stock',
            description: 'Sell existing shares',
            icon: Minus,
            onClick: onSellStock,
            variant: 'outline' as const,
            className: 'border-red-600 text-red-600 hover:bg-red-50'
        },
        {
            title: 'Deposit',
            description: 'Add funds to account',
            icon: Upload,
            onClick: onDeposit,
            variant: 'outline' as const,
            className: 'border-blue-600 text-blue-600 hover:bg-blue-50'
        },
        {
            title: 'Withdraw',
            description: 'Remove funds from account',
            icon: Download,
            onClick: onWithdraw,
            variant: 'outline' as const,
            className: 'border-orange-600 text-orange-600 hover:bg-orange-50'
        }
    ];

    const navigationActions = [
        {
            title: 'View Analytics',
            description: 'Detailed performance insights',
            icon: BarChart3,
            to: '/analytics',
            variant: 'ghost' as const
        },
        {
            title: 'Settings',
            description: 'Account and preferences',
            icon: Settings,
            to: '/settings',
            variant: 'ghost' as const
        }
    ];

    return (
        <div className='grid gap-6 md:grid-cols-2'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid gap-3 sm:grid-cols-2'>
                        {actions.map((action, index) => {
                            const IconComponent = action.icon;
                            return (
                                <Button
                                    key={index}
                                    variant={action.variant}
                                    onClick={action.onClick}
                                    className={`h-auto p-4 flex flex-col items-start gap-2 ${action.className || ''}`}
                                >
                                    <div className='flex items-center gap-2'>
                                        <IconComponent className='h-5 w-5' />
                                        <span className='font-medium'>{action.title}</span>
                                    </div>
                                    <span className='text-xs opacity-80 font-normal'>{action.description}</span>
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className='text-lg font-semibold'>Explore</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='grid gap-3'>
                        {navigationActions.map((action, index) => {
                            const IconComponent = action.icon;
                            return (
                                <Link
                                    key={index}
                                    to={action.to}
                                >
                                    <Button
                                        variant={action.variant}
                                        className='w-full h-auto p-4 flex items-center justify-start gap-3 hover:bg-muted'
                                    >
                                        <IconComponent className='h-5 w-5' />
                                        <div className='flex flex-col items-start'>
                                            <span className='font-medium'>{action.title}</span>
                                            <span className='text-xs text-muted-foreground'>{action.description}</span>
                                        </div>
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
