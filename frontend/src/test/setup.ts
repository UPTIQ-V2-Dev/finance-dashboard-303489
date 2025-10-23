import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, afterAll, vi } from 'vitest';
import { server } from './mocks/server';
import { act } from 'react';

// Global setup for React 19 compatibility
Object.defineProperty(window, 'IS_REACT_ACT_ENVIRONMENT', {
    writable: true,
    value: true
});

// Override the act function in react-dom/test-utils to use React.act
vi.mock('react-dom/test-utils', () => ({
    act: act
}));

// Mock console.error to suppress act warnings in tests
const originalError = console.error;
beforeAll(() => {
    console.error = (...args: any[]) => {
        if (
            typeof args[0] === 'string' &&
            (args[0].includes('ReactDOMTestUtils.act is deprecated') ||
                (args[0].includes('act') && args[0].includes('deprecated')))
        ) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});

// Establish API mocking before all tests
beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});

// Reset any runtime request handlers we may add during the tests
afterEach(() => {
    server.resetHandlers();
    cleanup();
});

// Clean up after the tests are finished
afterAll(() => {
    server.close();
});
