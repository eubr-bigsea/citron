module.exports = {
  root: true,
  plugins: [
    'ember'
  ],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    'no-console': 0,
    'ember/no-old-shims': 'error'
  }
};
