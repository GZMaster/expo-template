// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const reactNative = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/*',
      'build/*',
      '.expo/*',
      '.expo-shared/*',
      'node_modules/*',
      'ios/*',
      'android/*',
      'coverage/*',
      '*.config.js',
      'metro.config.js',
    ],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        __DEV__: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-native': reactNative,
    },
    rules: {
      // Disable problematic import rule that conflicts with path aliases
      'import/namespace': 'off',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      // React Hooks rules (expo config already includes the plugin)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Native rules
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off',
      'react-native/no-raw-text': 'off',

      // General rules
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // Disable formatting rules handled by Biome
      'indent': 'off',
      'linebreak-style': 'off',
      'quotes': 'off',
      'semi': 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        __DEV__: 'readonly',
      },
    },
    plugins: {
      'react-native': reactNative,
    },
    rules: {
      // React Hooks rules (expo config already includes the plugin)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Native rules
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'warn',

      // General rules
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

      // Disable formatting rules handled by Biome
      'indent': 'off',
      'linebreak-style': 'off',
      'quotes': 'off',
      'semi': 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
    },
  },
]);
