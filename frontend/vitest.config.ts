import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/', '**/*.d.ts', '**/*.config.*', '**/mockData.ts', 'dist/']
        },
        env: {
            IS_REACT_ACT_ENVIRONMENT: 'true'
        },
        // Only include our source tests, exclude node_modules and React component tests
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        exclude: [
            'node_modules/',
            'src/test/',
            '**/components/**/*.test.tsx',
            '**/pages/**/*.test.tsx',
            '**/hooks/**/*.test.tsx',
            '**/App.test.tsx'
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
