# Financial Dashboard Implementation Plan

_React 19 + Vite + shadcn/ui + Tailwind v4_

## Project Overview

Simple financial dashboard with portfolio overview, transactions, analytics, and settings pages.

## Tech Stack Analysis

- **React 19** with concurrent features
- **Vite** for dev/build tooling
- **shadcn/ui** components already configured
- **Tailwind v4** via `@tailwindcss/vite`
- **Recharts** for data visualization
- **React Query** for data management
- **React Router DOM** for navigation
- **Vitest + RTL** for testing

## Page-by-Page Implementation

### 1. Layout & Navigation

**File**: `src/components/layout/AppLayout.tsx`

- Main layout with sidebar navigation
- Header with user profile and theme toggle
- Responsive design with mobile drawer

**Dependencies**:

- `src/components/ui/sidebar.tsx` (existing)
- `src/components/navigation/Sidebar.tsx`
- `src/components/header/Header.tsx`

**API**: None (static navigation)

### 2. Dashboard/Overview Page

**File**: `src/pages/Dashboard.tsx`

- Portfolio summary cards (total balance, gains/losses, allocation)
- Recent transactions list
- Performance charts (line/area charts)
- Quick action buttons

**Components**:

- `src/components/dashboard/PortfolioSummary.tsx`
- `src/components/dashboard/RecentTransactions.tsx`
- `src/components/dashboard/PerformanceChart.tsx`
- `src/components/dashboard/QuickActions.tsx`

**Utils**:

- `src/utils/formatCurrency.ts`
- `src/utils/calculateReturns.ts`

**Types**:

- `src/types/portfolio.ts`
- `src/types/transaction.ts`

**API Endpoints**:

- `GET /api/portfolio/summary`
- `GET /api/transactions/recent`
- `GET /api/portfolio/performance`

### 3. Portfolio Page

**File**: `src/pages/Portfolio.tsx`

- Holdings table with sorting/filtering
- Asset allocation pie chart
- Individual asset performance
- Add/remove holdings functionality

**Components**:

- `src/components/portfolio/HoldingsTable.tsx`
- `src/components/portfolio/AllocationChart.tsx`
- `src/components/portfolio/AssetCard.tsx`
- `src/components/portfolio/AddHoldingDialog.tsx`

**Utils**:

- `src/utils/portfolioCalculations.ts`
- `src/utils/sortHelpers.ts`

**API Endpoints**:

- `GET /api/portfolio/holdings`
- `POST /api/portfolio/holdings`
- `PUT /api/portfolio/holdings/:id`
- `DELETE /api/portfolio/holdings/:id`

### 4. Transactions Page

**File**: `src/pages/Transactions.tsx`

- Filterable transaction history
- Transaction categories and tags
- Import/export functionality
- Add manual transactions

**Components**:

- `src/components/transactions/TransactionList.tsx`
- `src/components/transactions/TransactionFilter.tsx`
- `src/components/transactions/AddTransactionDialog.tsx`
- `src/components/transactions/ImportDialog.tsx`

**Utils**:

- `src/utils/transactionFilters.ts`
- `src/utils/csvParser.ts`

**API Endpoints**:

- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `POST /api/transactions/import`

### 5. Analytics Page

**File**: `src/pages/Analytics.tsx`

- Performance metrics and KPIs
- Comparative charts (vs benchmarks)
- Risk analysis
- Tax reporting summaries

**Components**:

- `src/components/analytics/MetricsGrid.tsx`
- `src/components/analytics/ComparisonChart.tsx`
- `src/components/analytics/RiskMetrics.tsx`
- `src/components/analytics/TaxSummary.tsx`

**Utils**:

- `src/utils/metricsCalculations.ts`
- `src/utils/riskAnalysis.ts`

**API Endpoints**:

- `GET /api/analytics/metrics`
- `GET /api/analytics/benchmarks`
- `GET /api/analytics/risk-analysis`

### 6. Settings Page

**File**: `src/pages/Settings.tsx`

- User profile management
- Display preferences
- Data export/import
- Account security

**Components**:

- `src/components/settings/ProfileForm.tsx`
- `src/components/settings/PreferencesForm.tsx`
- `src/components/settings/DataManagement.tsx`
- `src/components/settings/SecuritySettings.tsx`

**Utils**:

- `src/utils/formValidation.ts`

**API Endpoints**:

- `GET /api/user/profile`
- `PUT /api/user/profile`
- `POST /api/user/export-data`

## Common Components & Utils

### Shared Components

- `src/components/common/LoadingSpinner.tsx`
- `src/components/common/ErrorBoundary.tsx`
- `src/components/common/DataTable.tsx`
- `src/components/common/ChartContainer.tsx`

### Services

- `src/services/portfolioService.ts`
- `src/services/transactionService.ts`
- `src/services/analyticsService.ts`
- `src/services/userService.ts`

### Hooks

- `src/hooks/usePortfolio.ts`
- `src/hooks/useTransactions.ts`
- `src/hooks/useAnalytics.ts`
- `src/hooks/useLocalStorage.ts`

### Context

- `src/context/ThemeContext.tsx`
- `src/context/UserContext.tsx`

## Routing Setup

**File**: `src/router/AppRouter.tsx`

```typescript
Routes:
- "/" → Dashboard
- "/portfolio" → Portfolio
- "/transactions" → Transactions
- "/analytics" → Analytics
- "/settings" → Settings
```

## Mock Data

**File**: `src/data/mockFinancialData.ts`

- Sample portfolio data
- Transaction history
- Performance metrics
- User profiles

## Testing Strategy

### Test Organization

- **Unit Tests**: `src/components/**/*.test.tsx`
- **Integration Tests**: `src/pages/**/*.test.tsx`
- **Service Tests**: `src/services/**/*.test.ts`
- **Hook Tests**: `src/hooks/**/*.test.ts`
- **Utility Tests**: `src/utils/**/*.test.ts`

### Test Setup Files

- `src/test/setup.ts` (existing - Vitest config)
- `src/test/test-utils.tsx` - Custom render with providers
- `src/test/mocks/handlers.ts` - MSW API handlers
- `src/test/mocks/server.ts` - MSW server setup
- `src/test/fixtures/` - Test data fixtures

### Testing Framework

- **Vitest** for test runner
- **React Testing Library** for component testing
- **MSW (Mock Service Worker)** for API mocking
- **@testing-library/user-event** for user interactions

### Key Test Patterns

#### Component Testing

```typescript
// Example: Portfolio component test
describe('Portfolio', () => {
  test('displays holdings table with data', async () => {
    renderWithProviders(<Portfolio />);
    expect(await screen.findByText('Holdings')).toBeInTheDocument();
  });
});
```

#### Hook Testing

```typescript
// Example: usePortfolio hook test
describe('usePortfolio', () => {
    test('fetches and returns portfolio data', async () => {
        const { result } = renderHook(() => usePortfolio());
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
    });
});
```

#### Service Testing

```typescript
// Example: portfolioService test
describe('portfolioService', () => {
    test('getSummary returns formatted data', async () => {
        const summary = await portfolioService.getSummary();
        expect(summary).toHaveProperty('totalValue');
    });
});
```

### Critical Test Cases

#### Form Validation

- Required field validation
- Input format validation (currency, dates)
- Form submission handling
- Error state display

#### State Management

- Loading states
- Error handling
- Cache invalidation
- Optimistic updates

#### User Interactions

- Navigation between pages
- Modal open/close
- Table sorting and filtering
- Chart interactions

#### API Integration

- Successful data fetching
- Error response handling
- Loading states
- Data transformation

### Coverage Targets

- **Components**: 80% coverage minimum
- **Services**: 90% coverage minimum
- **Utils**: 95% coverage minimum
- **Critical user flows**: 100% coverage

### Test Commands

- `npm test` - Run tests in watch mode
- `npm run test:ci` - Run tests once
- `npm run test:coverage` - Generate coverage report
- `npm run test:ui` - Open Vitest UI

## Implementation Phases

### Phase 1: Foundation (Week 1)

- Setup routing and layout
- Create shared components and utils
- Implement mock data services
- Setup testing infrastructure

### Phase 2: Core Pages (Week 2-3)

- Dashboard page with basic charts
- Portfolio page with holdings table
- Basic transaction management

### Phase 3: Advanced Features (Week 4)

- Analytics page with metrics
- Advanced filtering and sorting
- Settings and user management

### Phase 4: Polish & Testing (Week 5)

- Comprehensive test coverage
- Performance optimization
- Accessibility improvements
- Error handling refinement

## Development Notes

- Use TypeScript strict mode
- Follow existing code conventions from starter template
- Leverage existing shadcn/ui components
- Implement responsive design mobile-first
- Use React Query for all API calls
- Implement proper error boundaries
- Follow accessibility best practices (WCAG 2.1)
