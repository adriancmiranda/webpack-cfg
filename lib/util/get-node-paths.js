const { resolve, delimiter, isAbsolute } = require('path');
const { as } = require('describe-type');

module.exports = (cwd, getAsList) => {
	const nodePaths = as(String, process.env.NODE_PATH, '')
		.split(delimiter)
		.filter(dir => dir && isAbsolute(dir) === false)
		.map(dir => resolve(cwd, dir));
	return getAsList ? nodePaths : nodePaths.join(delimiter);
};
