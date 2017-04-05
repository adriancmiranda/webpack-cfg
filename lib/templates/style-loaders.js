const is = require('is');

function loader(name, query, force) {
	const use = {loader: `${name.replace(/-loader$/, '')}-loader`};
	if (is.object(query) || is.object(force)) {
		use.options = Object.assign({}, query, force);
	}
	return use;
}

module.exports = (get, fallback = 'style-loader', plugins = () => {}) => {
	const isDev = get('argv.dev');
	const minimize = !isDev;
	const action = isDev ? 'watch' : 'build';
	const sourceMap = get(`${action}.sourceMap`);
	const publicPath = get(`${action}.publicPath`);
	const style = loader(fallback, get(`style[${fallback}]`));
	const css = [style, loader('css', get('style.css'), {minimize, sourceMap})];
	const postcss = [style, loader('css', get('style.postcss'), {minimize, sourceMap, plugins})];
	const use = Object.assign.apply(Object, ['scss', 'sass', 'stylus', 'styl', 'less'].map(ext => {
		const meta = {};
		const options = ext === 'sass' ? {sourceMap, indentedSyntax: true} : {sourceMap};
		const name = ext === 'scss' ? 'sass' : ext === 'styl' ? 'stylus' : ext;
		meta[ext] = css.concat(loader(name, get(`style.${ext}`), options));
		return meta;
	}).concat([{css}, {postcss}]));
	return {use, publicPath, extract: !isDev};
};

module.exports.loader = loader;
