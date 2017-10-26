const { extname } = require('path');
const is = require('is');

function parseEntry(get, tmpl, filename) {
	const filepath = get('path.entry.style', filename);
	const ext = extname(filepath);
	return tmpl.replace('%s', filepath.replace(ext, ''));
}

function parseEntries(get, tmpl) {
	const parse = parseEntry.bind(this, get, tmpl);
	let entry = get('style.entry') || [];
	if (is.string(entry)) {
		return parse(entry);
	} else if (is.object(entry)) {
		entry = Object.keys(entry).map(name => entry[name]);
	}
	if (is.array(entry)) {
		return entry.map(parse).join(' ');
	}
	throw new TypeError('Invalid style.entry');
}

function loader(name, query, force) {
	const use = { loader: `${name.replace(/-loader$/, '')}-loader` };
	if (is.object(query) || is.object(force)) {
		use.options = Object.assign({}, query, force);
	}
	return use;
}

module.exports = (get, fallback, plugins = () => {}) => {
	const isDev = get('argv.dev');
	const fallbackLoader = typeof fallback === 'string' ? fallback : 'style-loader';
	const lifecycle = (fallback != null && fallback.lifecycle) || get('lifecycle');
	const env = JSON.parse(get(`${lifecycle}.env.NODE_ENV`));
	const sourceMap = get(`${lifecycle}.sourceMap`);
	const publicPath = get(`${lifecycle}.publicPath`);
	const style = loader(fallbackLoader, get(`style[${fallbackLoader}]`));
	const minimize = !isDev;
	const css = [style, loader('css', get('style.css'), { minimize, sourceMap })];
	const postcss = [style, loader('css', get('style.postcss'), { minimize, sourceMap, plugins })];
	const use = Object.assign.apply(Object, ['scss', 'sass', 'stylus', 'styl', 'less'].map(ext => {
		const meta = {};
		let options = { sourceMap };
		let name;
		switch (ext) {
			case 'sass': {
				name = 'sass';
				options.indentedSyntax = true;
				options.data = [
					`$env: ${env || 'nil'};`,
				];
				if (get('style.sass.useDataEntries')) {
					options.data.push(parseEntries(get, '@import ~%s;'));
				}
				options.data = options.data.join(' ');
				break;
			}
			case 'scss': {
				name = 'sass';
				options.data = [
					`$env: ${env || 'nil'};`,
				];
				if (get('style.scss.useDataEntries')) {
					options.data.push(parseEntries(get, '@import "~%s";'));
				}
				options.data = options.data.join(' ');
				break;
			}
			case 'styl': {
				name = 'stylus';
				break;
			}
			default: {
				name = ext;
				break;
			}
		}
		meta[ext] = css.concat(loader(name, get(`style.${ext}`), options));
		return meta;
	}).concat([{ css }, { postcss }]));
	return { use, publicPath, extract: !isDev };
};

module.exports.loader = loader;
