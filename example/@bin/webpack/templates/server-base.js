const webpack = require('webpack');
const { contextEntries } = require('webpack-cfg/tools');
const commonBase = require('./');

module.exports = $ => commonBase($)
.cfg('entry', $('path.server'), contextEntries)
.cfg({
  name: 'server:base',
  target: 'async-node',
  devtool: 'sourcemap',
  recordsPath: $('cwd', $('path.output.bundle', 'records')),
  output: {
    libraryTarget: 'commonjs2',
  },
  node: Object.assign({
    crypto: 'empty',
    global: true,
    process: true,
    Buffer: true,
    console: false,
    module: false,
    __dirname: true,
    __filename: true,
    setImmediate: true,
    clearImmediate: true,
  }, $('node')),
  module: {
    exprContextCritical: false,
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx?$/,
      options: Object.assign({
        comments: false,
        plugins: ['transform-runtime'],
        presets: [['env', { targets: { node: 'current' } }], 'stage-2'],
      }, $('script.babel')),
      exclude: [$('cwd', $('path.client'))],
      include: [
        $('cwd', $('path.server')),
        $('cwd', $('path.test')),
      ],
    }]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `try { require('source-map-support').install(); } catch(err) { /* ! */ }`,
      entryOnly: false,
      raw: true,
    }),
  ],
});
