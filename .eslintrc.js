module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },

  plugins: ['react'],

  extends: ['airbnb', 'standard-jsx', 'plugin:prettier/recommended'],

  rules: {
    'react/no-did-update-set-state': 'error',
    'react/react-in-jsx-scope': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prop-types': 'off',
    'react/no-unknown-property': [2, { ignore: ['class', 'for'] }],
  },

  env: {
    browser: true,
    jest: true,
  },
};
