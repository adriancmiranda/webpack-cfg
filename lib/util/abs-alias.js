const { normalize, join } = require('path');
const WebpackCfgError = require('../errors/webpack-cfg-error');

module.exports = cwd => (...args) => {
	try {
		return normalize(join(cwd, ...args));
	} catch (err) {
		throw new WebpackCfgError({
			message: `${err.message}.\nCheck "{cwd}/{args}" path.`,
			code: err.code,
			cwd: cwd,
			args: args.join(','),
		});
	}
};
