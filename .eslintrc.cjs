module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'standard',
  overrides: [],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
  },
};
