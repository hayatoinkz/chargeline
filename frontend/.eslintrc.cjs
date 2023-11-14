/** @type {import("eslint").Linter.Config} */

const config = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'tailwindcss', 'unused-imports'],
  ignorePatterns: ['node_modules/*', 'tailwind.config.ts'],
  rules: {
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'newline-before-return': 2,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'tailwindcss/no-custom-classname': 0,
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': [
      2,
      {
        allow: ['warn', 'error'],
      },
    ],
    'prettier/prettier': 'off',
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      rules: {
        '@next/next/no-html-link-for-pages': ['off'],
        '@next/next/no-img-element': 'off',
      },
      settings: {},
    },
  ],
};

module.exports = config;
