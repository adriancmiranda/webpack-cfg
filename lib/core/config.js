/* eslint-disable no-restricted-syntax */
const { is } = require('describe-type');
const dotcfg = require('dotcfg');
const strategy = require('./strategy');
const Command = require('./command');

module.exports = class Config {
	constructor(self, argv, settings, tasks) {
		self = Config.parse(self, argv, settings, tasks);
		if (self) {
			return self;
		}
		throw new TypeError([
			'Could not configure your webpack with this settings.',
			'Please, define the "run" property with any task filename previously registered to get a setting.',
		].join(' '));
	}

	static parse(self, argv, settings, tasks) {
		for (let kind of ['empty', 'callable']) {
			if (is.callable(is[kind]) && is[kind](settings)) {
				return Config[kind](self, argv, settings, tasks);
			}
		}
		return undefined;
	}

	static createArguments(common, tasks) {
		const args = [common];
		if (!is.empty(tasks)) {
			Object.keys(tasks).forEach(key => {
				var cp = common.cfg(true);
				var target = dotcfg(cp, strategy);
				target.cfg('name', key);
				args.push(target);
			});
		}
		return args;
	}

	static defineArguments(self, tasks) {
		const common = tasks.shift();
		const args = [common];
		if (!is.empty(tasks)) {
			tasks.forEach(task => {
				const cp = common.cfg(true);
				const name = task.name;
				const config = task.cfg();
				const target = dotcfg.assign(cp, config);
				args[args.length] = dotcfg(target);
				self[name] = args[args.length - 1];
			});
		}
		return args;
	}

	static empty(self) {
		return self;
	}

	static callable(self, argv, settings, tasks) {
		const common = dotcfg(self.common.cfg(), strategy);
		let args = Config.createArguments(common, tasks);
		settings(...args);
		settings = Config.defineArguments(self, args);
		let cmd = new Command(self, settings, tasks);
		if (is.undef(argv)) {
			for (let config of settings) {
				cmd[config.name] = config;
			}
			return cmd;
		}
		return cmd(argv);
	}
};
