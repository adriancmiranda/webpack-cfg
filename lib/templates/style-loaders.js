module.exports = get => {
	const isDev = get('argv.dev');
	const action = isDev ? 'watch' : 'build';
	const sourceMap = get(`${action}.sourceMap`);
	const publicPath = get(`${action}.publicPath`);
	const minimize = !isDev;
	const extract = !isDev;
	return {
		extract,
		publicPath,
		loaders: {
			scss: {
				loader: 'sass-loader',
				options: Object.assign({}, get('style.scss'), {
					sourceMap
				})
			},
			sass: {
				loader: 'sass-loader',
				options: Object.assign({}, get('style.sass'), {
					indentedSyntax: true,
					sourceMap
				})
			},
			stylus: {
				loader: 'stylus-loader',
				options: Object.assign({}, get('style.stylus'), {
					sourceMap
				})
			},
			styl: {
				loader: 'stylus-loader',
				options: Object.assign({}, get('style.styl'), {
					sourceMap
				})
			},
			less: {
				loader: 'less-loader',
				options: Object.assign({}, get('style.less'), {
					sourceMap
				})
			},
			css: {
				loader: 'css-loader',
				options: Object.assign({}, get('style.css'), {
					minimize,
					sourceMap
				})
			},
			postcss: {
				loader: 'css-loader',
				options: Object.assign({}, get('style.postcss'), {
					minimize,
					sourceMap
				})
			}
		}
	};
};
