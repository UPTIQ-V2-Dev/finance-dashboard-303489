import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar';
import { BarChart3, Briefcase, Home, Settings, CreditCard, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navigationItems = [
    { title: 'Dashboard', url: '/', icon: Home },
    { title: 'Portfolio', url: '/portfolio', icon: Briefcase },
    { title: 'Transactions', url: '/transactions', icon: CreditCard },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    { title: 'Settings', url: '/settings', icon: Settings }
];

export const AppSidebar = () => {
    const location = useLocation();
    const { state } = useSidebar();

    return (
        <Sidebar variant='inset'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size='lg'
                            asChild
                        >
                            <Link
                                to='/'
                                className='flex items-center gap-2'
                            >
                                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                                    <TrendingUp className='size-4' />
                                </div>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>FinanceDash</span>
                                    <span className='truncate text-xs'>Portfolio Manager</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map(item => {
                                const IconComponent = item.icon;
                                const isActive = location.pathname === item.url;

                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className='w-full'
                                        >
                                            <Link
                                                to={item.url}
                                                className='flex items-center gap-2'
                                            >
                                                <IconComponent className='size-4' />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <div className='flex items-center gap-2'>
                                <Avatar className='h-8 w-8'>
                                    <AvatarImage
                                        src='/avatars/user.png'
                                        alt='User'
                                    />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                {state === 'expanded' && (
                                    <div className='grid flex-1 text-left text-sm leading-tight'>
                                        <span className='truncate font-semibold'>John Doe</span>
                                        <span className='truncate text-xs text-muted-foreground'>
                                            john.doe@example.com
                                        </span>
                                    </div>
                                )}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
