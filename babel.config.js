const presets = [
  [
    '@babel/env',
    {
      targets: {
        ie: '11',
      },
      useBuiltIns: 'usage',
      corejs: '3',
      modules: process.env.NODE_ENV !== 'test' ? false : 'auto',
    },
  ],
  '@babel/preset-react',
];

module.exports = { presets };
