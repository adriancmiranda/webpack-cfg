const is = require('is');

exports.param = arg => {
  if (is.string(arg)) {
    arg = arg.split(/\,/);
  }
  return arg;
};

exports.params = (argv = {}) => {
	for (const arg in argv) {
		argv[arg] = exports.param(argv[arg]);
	}
	return argv;
};
