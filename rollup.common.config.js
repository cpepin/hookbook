const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
  input: 'lib/index.js',
  external: ['react'],
  plugins: [
    commonjs(),
    resolve(),
    babel({ exclude: 'node_modules/**' }),
  ],
};