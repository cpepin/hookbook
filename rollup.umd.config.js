const common = require('./rollup.common.config');

export default Object.assign({}, common, {
  output: {
    file: 'bundle.umd.js',
    format: 'umd',
    name: 'hookbook',
    globals: {
      'react': 'React',
    },
  },
});
