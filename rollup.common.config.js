const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'lib/index.js',
  external: ['react'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve(),
  ],
};