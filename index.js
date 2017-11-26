const path = require('path');
const { is, as } = require('describe-type');
const WebpackCfg = require('./lib');

module.exports = (pattern, settings, parentFilename) => {
	if (is.string(settings)) {
		parentFilename = settings;
		settings = undefined;
	}
	return new WebpackCfg(path.parse(as(String, parentFilename) || module.parent.filename), pattern, settings);
};
