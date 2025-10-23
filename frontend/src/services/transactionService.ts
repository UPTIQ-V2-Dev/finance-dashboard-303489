import { api } from '@/lib/api';
import { mockRecentTransactions } from '@/data/mockData';
import { mockApiDelay } from '@/lib/utils';
import type {
    Transaction,
    CreateTransactionInput,
    UpdateTransactionInput,
    TransactionFilter
} from '@/types/transaction';

export const transactionService = {
    getRecentTransactions: async (limit: number = 5): Promise<Transaction[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: transactionService.getRecentTransactions ---', { limit });
            await mockApiDelay();
            return mockRecentTransactions.slice(0, limit);
        }
        const response = await api.get(`/api/transactions/recent?limit=${limit}`);
        return response.data;
    },

    getTransactions: async (filter?: TransactionFilter): Promise<Transaction[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: transactionService.getTransactions ---', filter);
            await mockApiDelay();
            return mockRecentTransactions;
        }
        const params = new URLSearchParams();
        if (filter) {
            Object.entries(filter).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    if (Array.isArray(value)) {
                        value.forEach(v => params.append(key, v));
                    } else {
                        params.append(key, value.toString());
                    }
                }
            });
        }
        const response = await api.get(`/api/transactions?${params.toString()}`);
        return response.data;
    },

    createTransaction: async (transaction: CreateTransactionInput): Promise<Transaction> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: transactionService.createTransaction ---', transaction);
            await mockApiDelay();
            return {
                ...transaction,
                id: Math.random().toString(36).substr(2, 9),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        }
        const response = await api.post('/api/transactions', transaction);
        return response.data;
    },

    updateTransaction: async (id: string, transaction: UpdateTransactionInput): Promise<Transaction> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: transactionService.updateTransaction ---', { id, transaction });
            await mockApiDelay();
            const existingTransaction = mockRecentTransactions.find(t => t.id === id);
            if (!existingTransaction) {
                throw new Error('Transaction not found');
            }
            return {
                ...existingTransaction,
                ...transaction,
                updatedAt: new Date().toISOString()
            };
        }
        const response = await api.put(`/api/transactions/${id}`, transaction);
        return response.data;
    },

    deleteTransaction: async (id: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: transactionService.deleteTransaction ---', { id });
            await mockApiDelay();
            return;
        }
        await api.delete(`/api/transactions/${id}`);
    }
};
