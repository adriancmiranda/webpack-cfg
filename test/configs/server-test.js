const serverConfig = require('../templates/server-config');

module.exports = get => serverConfig(get).cfg({
	name: 'server:test',
	externals: [],
	entry: undefined,
	output: {
		publicPath: get(`${get('argv.dev') ? 'watch' : 'build'}.host`)
	}
});
