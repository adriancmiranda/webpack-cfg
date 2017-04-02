const {relative} = require('path');
const parseArgv = require('../util/parse-argv');
const {run} = require('./tasks');

module.exports = class Command {
	constructor(self, cfgArgv, settings, tasks) {
		const parent = self.parent();
		const cwd = relative(process.cwd(), parent.dir);
		return ((argv = {}) => {
			parseArgv.params(argv);
			for (let dot of settings) {
				dot.cfg('argv', argv);
			}
			const webpackConfig = run(parent, cwd, tasks, settings, argv.run);
			self.emit('config', webpackConfig);
			return webpackConfig;
		});
	}
};
