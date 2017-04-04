module.exports = get => {
	const isDev = get('argv.dev');
	const action = isDev ? 'watch' : 'build';
	const sourceMap = get(`${action}.sourceMap`);
	const minimize = !isDev;
	return {
		scss: {
			loader: 'sass-loader',
			options: Object.assign({}, get('styles.scss'), {
				sourceMap,
			}),
		},
		sass: {
			loader: 'sass-loader',
			options: Object.assign({}, get('styles.sass'), {
				indentedSyntax: true,
				sourceMap,
			}),
		},
		stylus: {
			loader: 'stylus-loader',
			options: Object.assign({}, get('styles.stylus'), {
				sourceMap,
			}),
		},
		styl: {
			loader: 'stylus-loader',
			options: Object.assign({}, get('styles.styl'), {
				sourceMap,
			}),
		},
		less: {
			loader: 'less-loader',
			options: Object.assign({}, get('styles.less'), {
				sourceMap,
			}),
		},
		css: {
			loader: 'css-loader',
			options: Object.assign({}, get('styles.css'), {
				minimize,
				sourceMap,
			}),
		},
		postcss: {
			loader: 'css-loader',
			options: Object.assign({}, get('styles.postcss'), {
				minimize,
				sourceMap,
			}),
		},
	};
};
