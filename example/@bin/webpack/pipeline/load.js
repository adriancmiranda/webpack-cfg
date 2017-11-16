/* eslint-disable no-underscore-dangle */
const { dirname, join } = require('path');
const Module = require('module');

module.exports = function load(fs, filename) {
	const content = fs.readFileSync(filename).toString();
	if (filename.endsWith('json')) {
		return JSON.parse(content);
	}

	const filepath = dirname(filename);
	const ui = new Module(filename, module.parent);
	ui.filename = filename;
	ui.paths = Module._nodeModulePaths(filepath);
	ui.require = (file) => {
		if (/hot-update/.test(file)) {
			return load(fs, join(filepath, file));
		}
		return Module._load(file, this);
	};
	ui._compile(content, filename);
	return ui.exports.default ? ui.exports.default : ui.exports;
};
