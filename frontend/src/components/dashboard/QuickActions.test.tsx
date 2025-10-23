import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { QuickActions } from './QuickActions';

describe('QuickActions', () => {
    it('displays quick action buttons', () => {
        render(<QuickActions />);

        expect(screen.getByText('Buy Stock')).toBeInTheDocument();
        expect(screen.getByText('Sell Stock')).toBeInTheDocument();
        expect(screen.getByText('Deposit')).toBeInTheDocument();
        expect(screen.getByText('Withdraw')).toBeInTheDocument();
    });

    it('displays navigation actions', () => {
        render(<QuickActions />);

        expect(screen.getByText('View Analytics')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('displays action descriptions', () => {
        render(<QuickActions />);

        expect(screen.getByText('Purchase new shares')).toBeInTheDocument();
        expect(screen.getByText('Sell existing shares')).toBeInTheDocument();
        expect(screen.getByText('Add funds to account')).toBeInTheDocument();
        expect(screen.getByText('Remove funds from account')).toBeInTheDocument();
        expect(screen.getByText('Detailed performance insights')).toBeInTheDocument();
        expect(screen.getByText('Account and preferences')).toBeInTheDocument();
    });

    it('calls onClick handlers for action buttons', () => {
        const mockHandlers = {
            onBuyStock: vi.fn(),
            onSellStock: vi.fn(),
            onDeposit: vi.fn(),
            onWithdraw: vi.fn()
        };

        render(<QuickActions {...mockHandlers} />);

        fireEvent.click(screen.getByText('Buy Stock'));
        expect(mockHandlers.onBuyStock).toHaveBeenCalledOnce();

        fireEvent.click(screen.getByText('Sell Stock'));
        expect(mockHandlers.onSellStock).toHaveBeenCalledOnce();

        fireEvent.click(screen.getByText('Deposit'));
        expect(mockHandlers.onDeposit).toHaveBeenCalledOnce();

        fireEvent.click(screen.getByText('Withdraw'));
        expect(mockHandlers.onWithdraw).toHaveBeenCalledOnce();
    });

    it('has correct navigation links', () => {
        render(<QuickActions />);

        const analyticsLink = screen.getByText('View Analytics').closest('a');
        const settingsLink = screen.getByText('Settings').closest('a');

        expect(analyticsLink).toHaveAttribute('href', '/analytics');
        expect(settingsLink).toHaveAttribute('href', '/settings');
    });
});
