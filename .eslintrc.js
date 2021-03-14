module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier', 'plugin:jest/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  rules: {
    'no-useless-constructor': 'off',
    'prettier/prettier': 'error',
  },
};
