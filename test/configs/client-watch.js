const {prependEntry} = require('../../tools');
const clientConfig = require('../templates/client-config');

module.exports = get => clientConfig(get).cfg('entry', [
	`webpack-dev-server/client?http://${get('watch.host')}:${get('watch.port')}`,
	'webpack/hot/only-dev-server',
], prependEntry).cfg({
	name: 'client:watch',
	devtool: '#cheap-module-eval-source-map',
	output: {
		publicPath: get('watch.publicPath')
	},
	devServer: {
		quiet: true,
		inline: true,
		compress: true,
		historyApiFallback: true,
		contentBase: get('cwd', get('path.output')),
		stats: 'errors-only',
		host: get('watch.host'),
		port: get('watch.port'),
		open: get('watch.autoOpenBrowser'),
		proxy: get('watch.proxyTable')
	}
});
