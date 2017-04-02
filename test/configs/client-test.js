const clientConfig = require('../templates/client-config');

module.exports = get => clientConfig(get).cfg({
	name: 'client:test',
	devtool: '#inline-source-map',
	entry: undefined,
	output: {
		publicPath: get(`${get('argv.dev') ? 'watch' : 'build'}.host`)
	}
});
