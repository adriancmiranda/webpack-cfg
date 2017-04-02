const commonConfig = require('./common-config');

module.exports = get => commonConfig(get).cfg({
	name: 'server:config',
	target: 'node',
	devtool: 'sourcemap',
	recordsPath: get('cwd', get('path.output', '_records')),
	output: {
		libraryTarget: 'commonjs2',
	},
	node: Object.assign({
		global: true,
		Buffer: true,
		process: true,
		console: false,
		__dirname: true,
		__filename: true,
		setImmediate: true,
	}, get('node')),
});
