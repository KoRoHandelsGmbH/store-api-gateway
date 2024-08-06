import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...compat.extends('prettier'),
    {
        plugins: {
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            ecmaVersion: 2021,
            sourceType: 'module',

            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },

        rules: {
            'prettier/prettier': ['error'],
        },
    },
];