module.exports = {
  env: {
    es6: true,
    browser: false,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  plugins: ['babel', 'import', 'node', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  rules: {
    'no-console': 'off', // airbnb is using warn
    'no-unused-vars': 'off',
    'node/exports-style': ['error', 'module.exports'],
    'node/no-unsupported-features/es-syntax': 'off',
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'prettier/prettier': ['warn'],
  },
};
