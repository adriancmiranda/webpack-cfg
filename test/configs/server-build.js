const serverConfig = require('../templates/server-config');

module.exports = get => serverConfig(get).cfg({
	name: 'server:build',
	devtool: '#source-map',
	externals: [],
	output: {
		publicPath: get('build.host'),
	}
});
