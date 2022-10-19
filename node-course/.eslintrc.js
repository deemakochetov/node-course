module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-plusplus': 'off',
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'no-param-reassign': 0
  }
};
