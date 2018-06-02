const CustomError = require('./custom-error');

module.exports = class WebpackCfgError extends CustomError {
	constructor(...args) {
		super(...args);
	}
};
