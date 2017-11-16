const { Router } = require('express');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const { is } = require('describe-type');
const reporter = require('./reporter');

module.exports = (compiler, options) => {
	options.reporter = options.reporter || reporter(options);
	options.reporter.observe(compiler);

	const app = Router();
	const outputPublicPath = compiler.options.output.publicPath;
	const hasOutputPublicPath = is.string(outputPublicPath);
	const publicPath = hasOutputPublicPath ? outputPublicPath : '/';

	const dev = webpackDev(compiler, { publicPath, quiet: true, hot: true, historyApiFallback: true, stats: { colors: true } });
	dev.waitUntilValid(options.waitUntilValid);
	app.use(dev);

	const hot = webpackHot(compiler, { log: console.log, heartbeat: 10 * 1000, path: '/__webpack_hmr' });
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('html-webpack-plugin-after-emit', (data, next) => {
			hot.publish({ action: 'reload' });
			next();
		});
	});
	app.use(hot);
	return app;
};
