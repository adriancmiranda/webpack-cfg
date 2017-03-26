const path = require('path');

module.exports = (...shortcuts) => {
	return (...args) => path.join(...shortcuts, ...args).split(path.sep).join('/');
};