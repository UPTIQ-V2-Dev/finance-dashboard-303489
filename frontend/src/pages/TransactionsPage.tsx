import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, Filter } from 'lucide-react';

export const TransactionsPage = () => {
    return (
        <div className='flex-1 space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Transactions</h1>
                    <p className='text-muted-foreground mt-1'>View and manage your transaction history</p>
                </div>
                <div className='flex gap-2'>
                    <Button
                        variant='outline'
                        className='flex items-center gap-2'
                    >
                        <Filter className='h-4 w-4' />
                        Filter
                    </Button>
                    <Button className='flex items-center gap-2'>
                        <Plus className='h-4 w-4' />
                        Add Transaction
                    </Button>
                </div>
            </div>

            <Card className='text-center py-12'>
                <CardContent className='flex flex-col items-center gap-4'>
                    <div className='rounded-full bg-muted p-4'>
                        <CreditCard className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>Transactions Coming Soon</h3>
                        <p className='text-muted-foreground'>
                            Complete transaction management features will be available here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
