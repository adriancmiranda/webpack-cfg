const {baseTemplate} = require('../../templates');

module.exports = get => baseTemplate(get).cfg({
	name: 'common:config',
	context: get('context'),
	output: {
		publicPath: get('path.public'),
		path: get('cwd', get('path.output'))
	},
	resolve: {
		alias: get('alias'),
		mainFields: ['module', 'main'],
		mainFiles: ['index'],
		modules: [get('path.source'), 'node_modules']
	}
});
