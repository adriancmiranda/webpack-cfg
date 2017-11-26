const path = require('path');
const { is, as } = require('describe-type');
const WebpackCfg = require('./lib');

module.exports = (pattern, settings, parentFilename) => {
	if (is.string(settings)) {
		parentFilename = settings;
		settings = undefined;
	}
	parentFilename = as(String, parentFilename, module.parent.filename);
	return new WebpackCfg(path.parse(parentFilename), pattern, settings);
};
