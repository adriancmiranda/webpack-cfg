const path = require('path');

module.exports = cwd => {
	return (...args) => path.normalize(path.join(cwd, ...args));
};
