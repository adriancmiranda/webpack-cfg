const dotcfg = require('dotcfg');
const strategy = require('./base-strategy');

module.exports = () => dotcfg({}, strategy).cfg({
	name: 'base-template',
	stats: {
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	},
	output: {
		filename: '[name].js'
	},
	resolve: {
		symlinks: true,
		enforceExtension: false,
		enforceModuleExtension: false,
		moduleExtensions: ['-loader'],
		descriptionFiles: ['package.json'],
		extensions: ['.js', '.json']
	},
	module: {
		rules: [
		]
	},
	plugins: [
	]
});
