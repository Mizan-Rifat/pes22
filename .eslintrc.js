/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'react/jsx-key': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }]
  }
};
