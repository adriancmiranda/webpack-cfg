const clientConfig = require('../templates/client-config');

module.exports = get => clientConfig(get).cfg({
	name: 'client:build',
	devtool: get('build.sourceMap') ? '#source-map' : false,
	output: {
		publicPath: get('build.publicPath'),
		filename: get('path.scripts', '[name].[chunkhash].js'),
		chunkFilename: get('path.scripts', '[id].[chunkhash].js')
	}
});
