/* eslint-disable no-restricted-syntax */
const { relative } = require('path');
const { is } = require('describe-type');
const parseEnv = require('../util/parse-env');
const { run } = require('./tasks');

module.exports = class Command {
	constructor(self, settings, tasks) {
		const parent = self.parent();
		const cwd = relative(process.cwd(), parent.dir);
		let settingsFilled;
		let webpackConfig;
		return ((argv = {}) => {
			if (settingsFilled) {
				return webpackConfig;
			}
			argv = parseEnv(argv);
			for (let dot of settings) {
				dot.cfg('argv', argv);
			}
			const demand = is.array(argv.run) ? argv.run : [argv.run];
			webpackConfig = run(parent, cwd, tasks, settings, demand);
			settingsFilled = true;
			self.emit('config', webpackConfig);
			return webpackConfig;
		});
	}
};
