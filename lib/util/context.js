/* eslint-disable semi-style */
const { relative, sep } = require('path');
const { is } = require('describe-type');
const WebpackCfgError = require('../errors/webpack-cfg-error');

module.exports = cwd => part => {
	try {
		return is.string(part) ? `./${relative(cwd, part).split(sep).join('/')}` : cwd;
	} catch (err) {
		throw new WebpackCfgError(err);
	}
};
