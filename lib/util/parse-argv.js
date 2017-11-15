/* eslint-disable no-restricted-syntax */
const { is } = require('describe-type');

exports.param = arg => {
	const multi = /,/;
	if (is.string(arg) && multi.test(arg)) {
		arg = arg.split(multi);
	}
	if (/^false$/i.test(arg)) {
		return false;
	}
	if (/^true$/i.test(arg)) {
		return true;
	}
	if (/^([0-9]+|NaN|Infinity)$/.test(arg)) {
		return Number(arg);
	}
	return arg;
};

exports.params = (argv = {}) => {
	for (const arg in argv) {
		if (Object.prototype.hasOwnProperty.call(argv, arg)) {
			argv[arg] = exports.param(argv[arg]);
		}
	}
	return is.primitive(argv) ? {} : argv;
};
