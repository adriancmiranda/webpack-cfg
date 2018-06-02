const { join, sep } = require('path');
const WebpackCfgError = require('../errors/webpack-cfg-error');

module.exports = (...shortcuts) => {
	return (...args) => {
		try {
			return join(...shortcuts, ...args).split(sep).join('/');
		} catch (err) {
			throw new WebpackCfgError(err);
		}
	};
};
