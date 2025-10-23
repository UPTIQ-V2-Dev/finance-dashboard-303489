import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Area, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, ComposedChart } from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import type { PerformanceData } from '@/types/portfolio';

interface PerformanceChartProps {
    data: PerformanceData[];
    onTimeframeChange?: (timeframe: string) => void;
}

export const PerformanceChart = ({ data, onTimeframeChange }: PerformanceChartProps) => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

    const handleTimeframeChange = (value: string) => {
        setSelectedTimeframe(value);
        onTimeframeChange?.(value);
    };

    const formatTooltipDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), 'MMM d, yyyy');
        } catch {
            return dateString;
        }
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-background border border-border rounded-lg p-3 shadow-md'>
                    <p className='text-sm font-medium mb-2'>{formatTooltipDate(label)}</p>
                    {payload.map((entry: any, index: number) => (
                        <div
                            key={index}
                            className='flex items-center gap-2 text-sm'
                        >
                            <div
                                className='w-3 h-3 rounded-full'
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className='text-muted-foreground'>{entry.name}:</span>
                            <span className='font-medium'>{formatCurrency(entry.value)}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    const timeframeOptions = [
        { value: '1M', label: '1 Month' },
        { value: '3M', label: '3 Months' },
        { value: '6M', label: '6 Months' },
        { value: '1Y', label: '1 Year' },
        { value: 'YTD', label: 'Year to Date' },
        { value: 'ALL', label: 'All Time' }
    ];

    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <CardTitle className='text-lg font-semibold'>Portfolio Performance</CardTitle>
                    <Select
                        value={selectedTimeframe}
                        onValueChange={handleTimeframeChange}
                    >
                        <SelectTrigger className='w-40'>
                            <SelectValue placeholder='Select timeframe' />
                        </SelectTrigger>
                        <SelectContent>
                            {timeframeOptions.map(option => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <div className='h-80 w-full'>
                    {data.length === 0 ? (
                        <div className='flex items-center justify-center h-full text-muted-foreground'>
                            No performance data available
                        </div>
                    ) : (
                        <ResponsiveContainer
                            width='100%'
                            height='100%'
                        >
                            <ComposedChart data={data}>
                                <defs>
                                    <linearGradient
                                        id='portfolioGradient'
                                        x1='0'
                                        y1='0'
                                        x2='0'
                                        y2='1'
                                    >
                                        <stop
                                            offset='5%'
                                            stopColor='hsl(var(--primary))'
                                            stopOpacity={0.3}
                                        />
                                        <stop
                                            offset='95%'
                                            stopColor='hsl(var(--primary))'
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey='date'
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    tickFormatter={value => {
                                        try {
                                            return format(parseISO(value), 'MMM');
                                        } catch {
                                            return value;
                                        }
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                                    tickFormatter={value => formatCurrency(value, { showSymbol: false })}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type='monotone'
                                    dataKey='value'
                                    stroke='hsl(var(--primary))'
                                    strokeWidth={2}
                                    fill='url(#portfolioGradient)'
                                    name='Portfolio Value'
                                />
                                {data.some(d => d.benchmark !== undefined) && (
                                    <Line
                                        type='monotone'
                                        dataKey='benchmark'
                                        stroke='hsl(var(--muted-foreground))'
                                        strokeWidth={1}
                                        strokeDasharray='5 5'
                                        dot={false}
                                        name='Benchmark'
                                    />
                                )}
                            </ComposedChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
