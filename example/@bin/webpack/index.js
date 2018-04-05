const { join, dirname } = require('path');
const { alias } = require('webpack-cfg/tools');
const webpackCfg = require('webpack-cfg');
const moment = require('moment');
const ip = require('ip');
const config = require('../@/config');
const regexEscape = require('../@/regexEscape');

moment.locale();

const pipeline = webpackCfg({
  server: 'settings/server-*.js',
  client: 'settings/client-*.js',
});

pipeline.on('config', (settings) => {
  const tasks = Array.isArray(settings) ? settings : [settings];
  console.log('webpack tasks:', tasks.map((task) => task.name));
});

module.exports = pipeline.setConfig((all, api, cli) => {

  // --------------------------------------------------------------------------
  //
  // COMMON
  //
  // --------------------------------------------------------------------------

  // ~ metadata ~
  all.set('package', config.pack);
  all.set('bowerrc', config.bowerrc ? config.bowerrc : {});
  all.set('bowerrc.directory', config.bowerrc ? config.bowerrc.directory : 'bower_components');
  all.set('babelrc', config.babelrc);
  all.set('context', process.cwd());
  all.set('cwd', process.cwd());
  all.set('pwd', alias(__dirname));
  all.set('now', moment().format('LLLL'));
  all.set('git', config.git);
  all.set('lifecycle', process.env.npm_lifecycle_event);

  // ~ structure folders ~
  all.set('path.client', config.source.dir);
  all.set('path.server', 'routes');
  all.set('path.views', 'views');
  all.set('path.test', '@test');
  all.set('path.asset', '');

  // ~ entry ~
  all.set('path.entry.static', 'static');
  all.set('path.entry.media', all.resolve('path.asset'));
  all.set('path.entry.font', all.resolve('path.asset', '@components/typography'));
  all.set('path.entry.style', '');
  all.set('path.entry.script', '');
  all.set('path.entry.view.deps', all.resolve('path.views'));
  all.set('path.entry.view.index', all.resolve('path.views'));

  // ~ output ~
  all.set('path.output.bundle', 'bundle');
  all.set('path.output.static', '');
  all.set('path.output.media', 'media');
  all.set('path.output.font', 'fonts');
  all.set('path.output.style', 'styles');
  all.set('path.output.script', 'scripts');
  all.set('path.output.view.deps', 'views');
  all.set('path.output.view.index', '');

  // ~ common aliases ~
  all.set('alias.view', all.resolve('path.entry.view.deps'));

  // ~ common providers ~
  all.set('provide.$', 'jquery');
  all.set('provide.jQuery', 'jquery');

  // ~ dev lifecycle ~
  all.set('dev.env.NODE_ENV', '"development"');
  all.set('dev.host', ip.address());
  all.set('dev.port', process.env.PORT || 3000);
  all.set('dev.assetsPublicPath', '');
  all.set('dev.useRelativePath', true);
  all.set('dev.autoOpenBrowser', true);
  all.set('dev.sourceMap', false);
  all.set('dev.proxy[^/api].target', `https://${all.get('dev.host')}:${all.get('dev.port') + 1}`);
  all.set('dev.proxy[^/api].secure', true);

  // ~ test lifecycle ~
  all.set('test.env.NODE_ENV', '"testing"');

  // ~ build lifecycle ~
  all.set('build.env.NODE_ENV', '"production"');
  all.set('build.assetsPublicPath', '');
  all.set('build.useRelativePath', true);
  all.set('build.sourceMap', true);
  all.set('build.gzip', false);
  all.set('build.gzip.extensions', ['js', 'css']);
  all.set('build.bundleAnalyzer.report', process.env.npm_config_report);

  // ~ eslint ~
  all.set('eslint.emitWarning', true);

  // ~ build optimization: https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693 ~
  const reVendor = new RegExp(`[\\/](node_modules|${regexEscape(all.resolve('bowerrc.directory'))})[\\/]`);
  all.set('build.optimization.splitChunks.cacheGroups.commons.test', reVendor);
  all.set('build.optimization.splitChunks.cacheGroups.commons.name', 'vendor');
  all.set('build.optimization.splitChunks.cacheGroups.commons.chunks', 'all');


  // --------------------------------------------------------------------------
  //
  // DEV-SERVER
  //
  // --------------------------------------------------------------------------

  all.set('dev.server.contentBase', all.resolve('path.client'));
  all.set('dev.server.publicPath', all.resolve('dev.assetsPublicPath'));
  all.set('dev.server.proxy', all.resolve('dev.proxy'));
  all.set('dev.server.host', all.resolve('dev.host'));
  all.set('dev.server.port', all.resolve('dev.port'));
  all.set('dev.server.historyApiFallback', true);
  all.set('dev.server.hot', true);
  all.set('dev.server.quiet', false);
  all.set('dev.server.noInfo', false);
  all.set('dev.server.https', true);
  all.set('dev.server.open', true);
  all.set('dev.server.stats.hash', false);
  all.set('dev.server.stats.chunks', false);
  all.set('dev.server.stats.modules', false);
  all.set('dev.server.stats.chunkModules', false);
  all.set('dev.server.stats.colors', true);
  all.set('dev.server.stats.timings', true);


  // --------------------------------------------------------------------------
  //
  // SERVER
  //
  // --------------------------------------------------------------------------

  // ~ server static files ~
  // N/A yet.

  // ~ server aliases settings ~
  api.set('alias.~', all.resolve('path.server'));

  // ~ server script settings ~
  api.set('script.entry.server', './index.js');


  // --------------------------------------------------------------------------
  //
  // CLIENT
  //
  // --------------------------------------------------------------------------

  // ~ client aliases settings ~
  cli.set('alias.~', all.resolve('path.client'));
  cli.set('alias.data', all.resolve('path.client', 'data'));
  cli.set('alias.asset', all.resolve('path.client', all.resolve('path.asset')));
  cli.set('alias.@vendors', all.resolve('bowerrc.directory'));

  // ~ client providers settings ~
  cli.set('provide.Proto', 'Proto');
  cli.set('provide.Modernizr', 'Modernizr');
  cli.set('provide.trace', 'trace');

  // ~ client script settings ~
  cli.set('script.entry.index', './index.js');

  // ~ client style settings ~
  cli.set('style.entry', './_config.scss');
  cli.set('style.css.localIdentName', '[path]-[name]-[local]-[hash:base64:6]');
  cli.set('style.css.modules', true);
  cli.set('style.css.camelCase', true);
  cli.set('style.sass.useDataEntries', true);
  cli.set('style.scss.useDataEntries', true);

  // ~ client view settings ~
  cli.set('view.entry', './index.pug');
  cli.set('view.data.minify.removeAttributeQuotes', false);
  cli.set('view.data.minify.collapseWhitespace', false);
  cli.set('view.data.minify.removeComments', false);
  cli.set('view.data.inject', false);

  // ~ client cache settings ~
  cli.set('offline.support', false);
  cli.set('offline.data.caches.main', ['index.html']);
  cli.set('offline.data.caches.additional', ['*.woff2']);
  cli.set('offline.data.caches.optional', [':rest:']);
});
