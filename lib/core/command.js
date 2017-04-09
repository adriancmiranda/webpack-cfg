const {relative} = require('path');
const parseArgv = require('../util/parse-argv');
const {run} = require('./tasks');

module.exports = class Command {
	constructor(self, cfgArgv, settings, tasks) {
		const parent = self.parent();
		const cwd = relative(process.cwd(), parent.dir);
		let settingsFilled;
		let webpackConfig;
		return ((argv = {}) => {
			if (settingsFilled) {
				return webpackConfig;
			}
			parseArgv.params(argv);
			for (let dot of settings) {
				dot.cfg('argv', argv);
			}
			webpackConfig = run(parent, cwd, tasks, settings, argv.run);
			settingsFilled = true;
			self.emit('config', webpackConfig);
			return webpackConfig;
		});
	}
};
