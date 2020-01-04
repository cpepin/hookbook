const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: 'lib/index.js',
  external: ['react'],
  plugins: [commonjs(), resolve(), babel({ exclude: 'node_modules/**' }), terser()],
  output: {
    file: 'dist/bundle.umd.js',
    format: 'umd',
    name: 'hookbook',
    globals: {
      react: 'React',
    },
  },
};
