module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
    '.eslint-todo.json'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  ignorePatterns: [
    'vue.config.js'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['error', 'always'],
    'import/order': ['error', {
      alphabetize: {
        order: 'asc'
      }
    }],
    'accessor-pairs': ['error', {
      enforceForClassMembers: false
    }],
    'vue/component-name-in-template-casing': 'error',
    'vue/component-tags-order': ['error', {
      order: ['template', 'script', 'style']
    }],
    '@typescript-eslint/no-unused-vars': ['error', {
      vars: 'all',
      args: 'all',
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_'
    }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', {
      typedefs: false
    }]
  }
};
