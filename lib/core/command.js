const {relative} = require('path');
const parseArgv = require('../util/parse-argv');
const {run} = require('./tasks');

const config = (self, argv, settings, tasks) => {
	const parent = self.parent();
	const cwd = relative(process.cwd(), parent.dir);
	const webpackConfig = run(parent, cwd, tasks, settings, argv.run);
	self.emit('config', webpackConfig);
	return webpackConfig;
};

module.exports = class Command {
	constructor(self, cfgArgv, settings, tasks) {
		if (cfgArgv) {
			parseArgv.params(cfgArgv);
			return config(self, cfgArgv, settings, tasks);
		}
		return ((wpArgv = {}) => {
			parseArgv.params(wpArgv);
			for (let dot of settings) {
				dot.cfg('argv', wpArgv);
			}
			return config(self, wpArgv, settings, tasks);
		});
	}
};
