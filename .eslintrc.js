module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react-hooks/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-hooks', '@typescript-eslint'],
  rules: {
    semi: 'off',
    'consistent-return': 'off',
    'no-var': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
  env: {
    browser: true,
    node: true,
  },
  globals: {},
}
