import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Save } from 'lucide-react';

export const SettingsPage = () => {
    return (
        <div className='flex-1 space-y-6 p-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold tracking-tight'>Settings</h1>
                    <p className='text-muted-foreground mt-1'>Manage your account and preferences</p>
                </div>
                <Button className='flex items-center gap-2'>
                    <Save className='h-4 w-4' />
                    Save Changes
                </Button>
            </div>

            <Card className='text-center py-12'>
                <CardContent className='flex flex-col items-center gap-4'>
                    <div className='rounded-full bg-muted p-4'>
                        <Settings className='h-8 w-8 text-muted-foreground' />
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>Settings Coming Soon</h3>
                        <p className='text-muted-foreground'>User settings and preferences will be available here.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
