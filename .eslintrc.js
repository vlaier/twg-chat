module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  extends: ['universe/native'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
  },
  ignorePatterns: ['src/gql/**'],
};
