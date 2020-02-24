const typescript = require('rollup-plugin-typescript2')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')

const common = require('./rollup.common.config')

export default Object.assign({}, common, {
  preserveModules: true,
  output: {
    dir: 'lib',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    resolve(),
    typescript({ useTsconfigDeclarationDir: true, clean: true }),
  ],
})
