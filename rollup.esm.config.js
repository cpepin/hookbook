const common = require('./rollup.common.config');

export default Object.assign({}, common, {
  output: {
    file: 'bundle.esm.js',
    format: 'esm',
    globals: {
      'react': 'React',
    },
  },
});
