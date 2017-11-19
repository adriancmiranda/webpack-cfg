const { parse } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { prependEntries } = require('webpack-cfg/tools');
const clientBase = require('../templates/client-base');
const skinBase = require('../utilities/skin-base');

module.exports = $ => clientBase($).cfg('entry', $('react') ? [
	'react-hot-loader/patch',
] : [
	'webpack-hot-middleware/client?noInfo=true&reload=true',
], prependEntries).cfg({
	name: '[client:dev]',
	devtool: '#cheap-module-eval-source-map',
	devServer: $('dev.server'),
	performance: {
		hints: false,
	},
	output: {
		publicPath: $('dev.assetsPublicPath'),
	},
	module: {
		rules: skinBase.rules($),
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': $('dev.env'),
			'process.type': '"renderer"',
		}),
		new HtmlWebpackPlugin(Object.assign({}, $('view.data'), {
			minify: false,
			title: `${$('package.name')} // ${$('package.description')}`,
			template: `!!pug-loader!${$('path.entry.view.index', $('view.entry'))}`,
			filename: $('path.output.view.index', `${parse($('view.entry')).name}.html`),
			env: Object.assign.apply(Object, Object.keys($('dev.env')).map(key => ({
				[key]: JSON.parse($(`dev.env.${key}`))
			}))),
		})),
		new HtmlWebpackInlineSourcePlugin(),
		new webpack.HotModuleReplacementPlugin({ quiet: true }),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new FriendlyErrorsPlugin({
			onErrors: undefined,
			compilationSuccessInfo: {
				messages: [`Your application is running here: https://${$('dev.host')}:${$('dev.port')}`],
			},
		}),
	],
})

// --------------------------------------------------------------------------
// *OFFLine support: https://www.npmjs.com/package/offline-plugin
// --------------------------------------------------------------------------
.cfg('plugins', $('offline.support') ? [(() => {
	const OfflinePlugin = require('offline-plugin');
	return new OfflinePlugin(Object.assign({
		safeToUseOptionalCaches: true,
		updateStrategy: 'changed',
	}, $('offline.data')));
})()] : []);
