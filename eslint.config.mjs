import js from '@eslint/js';
import tseslint, { config as defineConfig } from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default defineConfig(
    {
        // Artefak build & dependensi tidak pernah di-lint.
        ignores: [
            'dist/**',
            'node_modules/**',
            '.astro/**',
            'src/content/**',
            'public/**',
            'coverage/**',
            'test-results/**',
            'playwright-report/**',
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...astro.configs.recommended,
    // Aturan aksesibilitas (WCAG) untuk komponen React/JSX.
    ...astro.configs['jsx-a11y-recommended'],

    {
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            // Variabel tak terpakai = dead code; izinkan prefix `_` untuk yang disengaja.
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' },
            ],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            eqeqeq: ['error', 'always'],
            'prefer-const': 'error',
            'no-var': 'error',
        },
    },

    {
        files: ['**/*.tsx', '**/*.jsx'],
        plugins: { 'jsx-a11y': jsxA11y },
        rules: jsxA11y.configs.recommended.rules,
    },
);
