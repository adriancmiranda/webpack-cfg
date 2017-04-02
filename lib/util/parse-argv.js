const is = require('is');

exports.param = arg => {
	const multi = /,/;
	if (is.string(arg) && multi.test(arg)) {
		arg = arg.split(multi);
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
