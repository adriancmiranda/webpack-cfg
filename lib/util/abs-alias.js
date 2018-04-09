const { normalize, join } = require('path');

module.exports = cwd => {
	return (...args) => normalize(join(cwd, ...args));
};
