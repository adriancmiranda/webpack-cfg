const is = require('is');
const { relative } = require('path');
const { run } = require('./tasks');
const parseArgv = require('../util/parse-argv');

module.exports = class Command {
	constructor(self, settings, tasks) {
		const parent = self.parent();
		const cwd = relative(process.cwd(), parent.dir);
		return ((argv = {}) => {
			parseArgv.params(argv);
			for (let dot of settings) {
				dot.cfg('argv', argv);
			}
			const webpackConfig = run(parent, cwd, tasks, settings, argv.run);
			self.emit('compile', webpackConfig);
			return webpackConfig;
		});
	}
};
