const is = require('is');
const { relative } = require('path');
const { run } = require('./tasks');
const parseArgv = require('../util/parse-argv');

module.exports = class Command {
	constructor(self, argv, settings, tasks) {
		const parent = self.parent();
		const cwd = relative(process.cwd(), parent.dir);
		return ((wpArgv = {}) => {
			parseArgv.params(wpArgv);
			for (let dot of settings) {
				dot.cfg('argv', wpArgv);
			}
			const webpackConfig = run(parent, cwd, tasks, settings, wpArgv.run);
			self.emit('compile', webpackConfig);
			return webpackConfig;
		});
	}
};
