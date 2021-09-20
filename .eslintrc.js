module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    Product: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': 'off',
    'lines-between-class-members': 'off',
    'no-restricted-syntax': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'consistent-return': 'off',
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'arrow-body-style': 'off',
    'import/no-cycle': 'off',
    'prefer-destructuring': 'off',
    'no-useless-return': 'off',
    'no-else-return': 'off',
  },
};
