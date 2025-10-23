import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Moon, Sun, User, LogOut, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

export const Header = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [notifications] = useState(3); // Mock notification count

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        // Handle logout logic here
    };

    return (
        <div className='flex items-center gap-2'>
            {/* Notifications */}
            <Button
                variant='ghost'
                size='sm'
                className='relative'
            >
                <Bell className='h-4 w-4' />
                {notifications > 0 && (
                    <Badge
                        variant='destructive'
                        className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0'
                    >
                        {notifications}
                    </Badge>
                )}
            </Button>

            {/* Theme Toggle */}
            <Button
                variant='ghost'
                size='sm'
                onClick={toggleTheme}
            >
                {theme === 'light' ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        className='relative h-8 w-8 rounded-full'
                    >
                        <Avatar className='h-8 w-8'>
                            <AvatarImage
                                src='/avatars/user.png'
                                alt='User'
                            />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className='w-56'
                    align='end'
                    forceMount
                >
                    <DropdownMenuLabel className='font-normal'>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-sm font-medium leading-none'>John Doe</p>
                            <p className='text-xs leading-none text-muted-foreground'>john.doe@example.com</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className='mr-2 h-4 w-4' />
                        <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
