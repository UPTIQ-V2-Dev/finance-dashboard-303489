export type TransactionType = 'buy' | 'sell' | 'dividend' | 'deposit' | 'withdrawal';

export interface Transaction {
    id: string;
    type: TransactionType;
    symbol?: string;
    shares?: number;
    price?: number;
    amount: number;
    date: string;
    description: string;
    category?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateTransactionInput {
    type: TransactionType;
    symbol?: string;
    shares?: number;
    price?: number;
    amount: number;
    date: string;
    description: string;
    category?: string;
    tags?: string[];
}

export interface UpdateTransactionInput {
    type?: TransactionType;
    symbol?: string;
    shares?: number;
    price?: number;
    amount?: number;
    date?: string;
    description?: string;
    category?: string;
    tags?: string[];
}

export interface TransactionFilter {
    type?: TransactionType[];
    symbol?: string;
    dateFrom?: string;
    dateTo?: string;
    amountMin?: number;
    amountMax?: number;
    category?: string[];
    tags?: string[];
}
