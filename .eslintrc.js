module.exports = {
  env: {
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-expressions': 'off',
    'arrow-body-style': 'off',
    camelcase: 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    is_disabled: 'off',
    'jest/no-focused-tests': 'error',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'prefer-destructuring': 'off',
    strict: 'off',
    'object-shorthand': 'off',
  },
  // Disable 'no-undef' for ts files: typescript can already check undef variables with more accuracy than
  // eslint, and newer eslint version doesn't support some global configs well (issues with undefined NodeJS namespace)
  overrides: [
    {
      files: ['**.ts'],
      rules: { 'no-undef': 'off' },
    },
  ],
};
