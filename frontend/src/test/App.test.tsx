import { render, screen } from '@/test/test-utils';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App', () => {
    it('should render without crashing', () => {
        render(<App />);
        // Check if the dashboard content loads
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
});
