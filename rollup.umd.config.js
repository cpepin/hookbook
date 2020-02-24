const typescript = require('rollup-plugin-typescript2')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

const common = require('./rollup.common.config')

export default Object.assign({}, common, {
  output: {
    file: 'lib/bundle.umd.js',
    format: 'umd',
    name: 'hookbook',
    globals: {
      react: 'React',
    },
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript({ clean: true, tsConfigOverride: { declaration: false } }),
  ],
})
