module.exports = {
  extends: [
    'taro/react',
    'eslint-config-ali/typescript/react',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  env: {
    browser: true,
    es6: true
  },
  globals: {
    ReactDom: false
  },
  plugins: ['react', '@babel', 'react-hooks', '@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: 'detect' // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
    }
  },
  rules: {
    strict: 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'require-yield': 'off',
    'no-param-reassign': ['warn', { props: false }],
    'no-return-assign': 'warn',
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    // 如果是开发环境，no-unused-vars 改为警告
    'no-debugger': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'warn',
    'react/no-this-in-sfc': 'error',
    'react/self-closing-comp': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off'
  }
};
