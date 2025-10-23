import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Download } from 'lucide-react';

export const AnalyticsPage = () => {
    return (
        <div className='flex-1 space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Analytics</h1>
                    <p className='text-muted-foreground mt-1'>Detailed performance insights and reports</p>
                </div>
                <Button
                    variant='outline'
                    className='flex items-center gap-2'
                >
                    <Download className='h-4 w-4' />
                    Export Report
                </Button>
            </div>

            <Card className='text-center py-12'>
                <CardContent className='flex flex-col items-center gap-4'>
                    <div className='rounded-full bg-muted p-4'>
                        <BarChart3 className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>Analytics Coming Soon</h3>
                        <p className='text-muted-foreground'>
                            Advanced analytics and reporting features will be available here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
