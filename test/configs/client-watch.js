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
	}
});
