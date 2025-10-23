import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DashboardPage } from './pages/DashboardPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppLayout } from './components/layout/AppLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1
        }
    }
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={<AppLayout />}
                    >
                        <Route
                            index
                            element={<DashboardPage />}
                        />
                        <Route
                            path='portfolio'
                            element={<PortfolioPage />}
                        />
                        <Route
                            path='transactions'
                            element={<TransactionsPage />}
                        />
                        <Route
                            path='analytics'
                            element={<AnalyticsPage />}
                        />
                        <Route
                            path='settings'
                            element={<SettingsPage />}
                        />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
};
