const dotcfg = require('dotcfg');
const strategy = require('./base-strategy');

module.exports = get => dotcfg({}, strategy).cfg({
	name: 'base-template',
	stats: {
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	},
	output: {
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
		],
	},
	plugins: [
	],
});
