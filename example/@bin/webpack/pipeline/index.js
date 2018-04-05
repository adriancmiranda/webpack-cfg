const DEV = /^(dev(elopment)?|test(ing)?)$/gi.test(process.env.NODE_ENV);
let config;

if (DEV) {
	config = require('..');
	const { NODE_ENV = JSON.parse(config.common.resolve('dev.env.NODE_ENV')) } = process.env;
	const { NODE_PATH = config.common.resolve('path.output.bundle') } = process.env;
	const { PORT = config.common.resolve('dev.port') } = process.env;
	const { HOST = config.common.resolve('dev.host') } = process.env;
	exports.env = { NODE_PATH, NODE_ENV, HOST, PORT };
} else {
	const { NODE_PATH, NODE_ENV, HOST = '0.0.0.0', PORT = 3000 } = process.env;
	exports.env = { NODE_PATH, NODE_ENV, HOST, PORT };
}

exports.serve = (argv) => {
	if (DEV === false) return (req, res, next) => next();
	const webpack = require('webpack');
	const error = require('debug')('pipeline:error');
	const middleware = require('./middleware');
	const outputStatic = config.common.resolve('path.output.static');
	const proxy = config.common.resolve('dev.proxy');
	const autoOpenBrowser = config.common.resolve('dev.autoOpenBrowser');
	const testing = /^testing$/i.test(exports.env.NODE_ENV);
	const webpackConfig = config({ dev: !testing, run: argv.run, lifecycle: 'dev' });
	const multiCompiler = webpack(webpackConfig);
	return middleware(multiCompiler, { log: argv.log, notify: argv.notify, waitUntilValid() {
		const opn = require('opn');
		const url = `http://${exports.env.HOST}:${exports.env.PORT}/?debug=1`;
		if (autoOpenBrowser && !testing) {
			opn(url);
		} else error(`${url}`);
	}, proxy, static: outputStatic });
};
