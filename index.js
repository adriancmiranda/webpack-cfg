const path = require('path');
const glob = require('glob');
const WebpackCfg = require('./lib');

module.exports = (pattern, settings) => {
	return new WebpackCfg(path.parse(module.parent.filename), pattern, settings);
};
