const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

export default {
  input: 'lib/index.js',
  output: {
    file: 'bundle.umd.js',
    format: 'umd',
    name: 'hookbook',
    globals: {
      'react': 'React',
    },
  },
  external: ['react'],
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    resolve(),
  ],
};
