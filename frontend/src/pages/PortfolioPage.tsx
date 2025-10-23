import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus } from 'lucide-react';

export const PortfolioPage = () => {
    return (
        <div className='flex-1 space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Portfolio</h1>
                    <p className='text-muted-foreground mt-1'>Manage your holdings and track performance</p>
                </div>
                <Button className='flex items-center gap-2'>
                    <Plus className='h-4 w-4' />
                    Add Holding
                </Button>
            </div>

            <Card className='text-center py-12'>
                <CardContent className='flex flex-col items-center gap-4'>
                    <div className='rounded-full bg-muted p-4'>
                        <Briefcase className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>Portfolio Coming Soon</h3>
                        <p className='text-muted-foreground'>
                            Detailed portfolio management features will be available here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
