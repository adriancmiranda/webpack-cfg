const { baseTemplate } = require('webpack-cfg/templates');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = $ => baseTemplate($).cfg({
  name: 'common:template',
  context: $('context'),
  entry: $('script.entry'),
  output: {
    path: $('cwd', $('path.output.bundle')),
  },
  resolve: {
    alias: $('alias'),
    modules: [$('cwd', 'node_modules')],
    extensions: ['.jsx'],
  },
  module: {
    rules: [{
      enforce: 'pre',
      loader: 'eslint-loader',
      test: /\.jsx?$/,
      options: Object.assign({
        formatter: eslintFriendlyFormatter,
      }, $('script.eslint')),
      include: [
        $('cwd', $('path.client')),
        $('cwd', $('path.server')),
        $('cwd', $('path.test')),
      ],
    }, {
      enforce: 'pre',
      loader: 'remove-flow-types-loader',
      test: /\.jsx?$/,
      options: Object.assign({}, $('script.flow')),
      include: [
        $('cwd', $('path.client')),
        $('cwd', $('path.server')),
        $('cwd', $('path.test')),
      ],
    }, {
      loader: 'json-loader',
      test: /\.json$/,
    }],
  },
});
