import { useState } from 'react';
import { PortfolioSummaryComponent } from '@/components/dashboard/PortfolioSummary';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { usePortfolioSummary, usePortfolioPerformance, useRecentTransactions } from '@/hooks/usePortfolio';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DashboardPage = () => {
    const [performanceTimeframe, setPerformanceTimeframe] = useState('1Y');

    const {
        data: portfolioSummary,
        isLoading: isSummaryLoading,
        error: summaryError,
        refetch: refetchSummary
    } = usePortfolioSummary();

    const {
        data: performanceData,
        isLoading: isPerformanceLoading,
        error: performanceError,
        refetch: refetchPerformance
    } = usePortfolioPerformance(performanceTimeframe);

    const {
        data: recentTransactions,
        isLoading: isTransactionsLoading,
        error: transactionsError,
        refetch: refetchTransactions
    } = useRecentTransactions(5);

    const handleTimeframeChange = (timeframe: string) => {
        setPerformanceTimeframe(timeframe);
    };

    const handleRefreshAll = () => {
        refetchSummary();
        refetchPerformance();
        refetchTransactions();
    };

    const handleQuickAction = (action: string) => {
        console.log(`Quick action: ${action}`);
        // These would typically open modals or navigate to specific pages
    };

    const isAnyLoading = isSummaryLoading || isPerformanceLoading || isTransactionsLoading;
    const hasAnyError = summaryError || performanceError || transactionsError;

    return (
        <div className='flex-1 space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                    <p className='text-muted-foreground mt-1'>Your portfolio overview and recent activity</p>
                </div>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={handleRefreshAll}
                    disabled={isAnyLoading}
                    className='flex items-center gap-2'
                >
                    <RefreshCw className={`h-4 w-4 ${isAnyLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {hasAnyError && (
                <Alert variant='destructive'>
                    <AlertCircle className='h-4 w-4' />
                    <AlertDescription>Failed to load some data. Please try refreshing the page.</AlertDescription>
                </Alert>
            )}

            {/* Portfolio Summary Section */}
            <section>
                {isSummaryLoading ? (
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className='rounded-lg border p-4'
                            >
                                <Skeleton className='h-4 w-24 mb-2' />
                                <Skeleton className='h-8 w-32 mb-1' />
                                <Skeleton className='h-3 w-20' />
                            </div>
                        ))}
                    </div>
                ) : portfolioSummary ? (
                    <PortfolioSummaryComponent summary={portfolioSummary} />
                ) : (
                    <Alert>
                        <AlertCircle className='h-4 w-4' />
                        <AlertDescription>Portfolio summary data is not available.</AlertDescription>
                    </Alert>
                )}
            </section>

            {/* Charts and Transactions Section */}
            <div className='grid gap-6 lg:grid-cols-2'>
                <section className='lg:col-span-1'>
                    {isPerformanceLoading ? (
                        <div className='rounded-lg border p-6'>
                            <Skeleton className='h-6 w-48 mb-4' />
                            <Skeleton className='h-80 w-full' />
                        </div>
                    ) : performanceData ? (
                        <PerformanceChart
                            data={performanceData}
                            onTimeframeChange={handleTimeframeChange}
                        />
                    ) : (
                        <Alert>
                            <AlertCircle className='h-4 w-4' />
                            <AlertDescription>Performance chart data is not available.</AlertDescription>
                        </Alert>
                    )}
                </section>

                <section className='lg:col-span-1'>
                    {isTransactionsLoading ? (
                        <div className='rounded-lg border p-6'>
                            <Skeleton className='h-6 w-48 mb-4' />
                            <div className='space-y-4'>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className='flex items-center justify-between'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <Skeleton className='h-8 w-8 rounded' />
                                            <div>
                                                <Skeleton className='h-4 w-32 mb-1' />
                                                <Skeleton className='h-3 w-24' />
                                            </div>
                                        </div>
                                        <Skeleton className='h-4 w-20' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : recentTransactions ? (
                        <RecentTransactions transactions={recentTransactions} />
                    ) : (
                        <Alert>
                            <AlertCircle className='h-4 w-4' />
                            <AlertDescription>Recent transactions data is not available.</AlertDescription>
                        </Alert>
                    )}
                </section>
            </div>

            {/* Quick Actions Section */}
            <section>
                <QuickActions
                    onBuyStock={() => handleQuickAction('buy')}
                    onSellStock={() => handleQuickAction('sell')}
                    onDeposit={() => handleQuickAction('deposit')}
                    onWithdraw={() => handleQuickAction('withdraw')}
                />
            </section>
        </div>
    );
};
