const { join, sep } = require('path');

module.exports = (...shortcuts) => {
	return (...args) => join(...shortcuts, ...args).split(sep).join('/');
};
