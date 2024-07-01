/*
 * Copyright (c) TerrorByte 2024.
 * This program is free software: You can redistribute it and/or modify it under the terms of the
 * Mozilla Public License 2.0 as published by the Mozilla under the Mozilla Foundation.
 *
 * This program is distributed in the hope that it will be useful, but provided on an "as is" basis,
 * without warranty of any kind, either expressed, implied, or statutory, including,
 * without limitation, warranties that the Covered Software is free of defects, merchantable,
 * fit for a particular purpose or non-infringing. See the MPL 2.0 license for more details.
 *
 * For a full copy of the license in its entirety, please visit <https://www.mozilla.org/en-US/MPL/2.0/>
 */

import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import tsParser from '@typescript-eslint/parser'

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    {
        ignores: ['dist/*', 'eslint.config.mjs', '**/*.d.ts', 'tsup.config.js', '**/*.js', 'test/*'],
    },
    {
        files: ['**/*.ts'],
        plugins: {
            '@stylistic/ts': stylisticTs,
        },
        rules: {
            '@stylistic/ts/indent': ['error', 4],
            '@stylistic/ts/no-extra-semi': ['error'],
            '@stylistic/ts/quotes': ['error', 'single', {
                'avoidEscape': true,
                'allowTemplateLiterals': true,
                'ignoreStringLiterals': true,
            }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 'latest',
                ecmaFeatures: { modules: true },

            },
        },
    },
]