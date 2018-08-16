const dotcfg = require('dotcfg');
const strategy = require('./base-strategy');

// @see https://webpack.js.org/configuration/#options
module.exports = () => dotcfg({}, strategy).cfg({
	// just 4 debug
	name: 'base-template',
	
	// lets you precisely control what bundle information gets displayed
	stats: {
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false,
	},
	
	// options related to how webpack emits results
	output: {
		// the filename template for entry chunks
		filename: '[name].js', // for multiple entry points
	},
	
	// options for resolving module requests
	// (does not apply to resolving to loaders)
	resolve: {
		// follow symlinks to new location
		symlinks: true,
		
		// if true request must not include an extensions
    // if false request may already include an extension
		enforceExtension: false,
		
		// like extensions/enforceExtension but for module names instead of files
		enforceModuleExtension: false,
		
		// files that are read for package description
		descriptionFiles: ['package.json'],
		
		// extensions that are used
		extensions: ['.js', '.json', '.jsx', '.css'],
		
		// auto suffixr loaders
		moduleExtensions: ['-loader'],
	},
	
	// configuration regarding modules
	module: {
		// rules for modules (configure loaders, parser options, etc.)
		rules: [
		],
	},
	
	// additional plugins applied to the resolver
	plugins: [
	],
});
