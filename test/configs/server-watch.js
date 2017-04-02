const {prependEntry} = require('../../tools');
const serverConfig = require('../templates/server-config');

module.exports = get => serverConfig(get).cfg('entry', [
	'webpack/hot/poll?1000'
], prependEntry).cfg({
	name: 'server:watch',
	devtool: '#cheap-module-eval-source-map',
	externals: [],
	output: {
		publicPath: get('watch.host'),
		hotUpdateChunkFilename: '[id].[hash].hot-update.js',
		hotUpdateMainFilename: '[hash].hot-update.json',
		hotUpdateFunction: 'webpackHotUpdate'
	}
});
