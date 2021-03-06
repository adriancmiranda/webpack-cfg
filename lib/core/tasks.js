/* eslint-disable no-restricted-syntax, global-require, object-curly-newline */
const { resolve, relative, parse, format } = require('path');
const { is } = require('describe-type');
const glob = require('glob');

module.exports = class Tasks {
	constructor(self, pattern) {
		const tasks = Tasks.parse(self, pattern);
		if (tasks) {
			this.hash = Object.assign({}, this.hash, tasks);
			Tasks.hash = this.hash;
			return tasks;
		}
		throw new TypeError('Could not configure your webpack with this pattern');
	}

	static parse(self, pattern) {
		for (let kind of ['empty', 'string', 'object']) {
			if (is.callable(is[kind]) && is[kind](pattern)) {
				return Tasks[kind](self, pattern, 'common');
			}
		}
		return undefined;
	}

	static eachFile(tasks, next) {
		Object.keys(tasks).forEach(key => {
			tasks[key].forEach(task => {
				next(task, key);
			});
		});
	}

	static findDemandFile(tasks, next, demand) {
		for (let cmd of demand) {
			Tasks.eachFile(tasks, task => {
				if (task.name === cmd) {
					next(task, cmd);
				}
			});
		}
	}

	static run(parent, cwd, tasks, settings, demand) { // eslint-disable-line max-params
		const configs = [];
		Tasks.findDemandFile(tasks, task => {
			const taskPath = format(task);
			const scriptPath = relative(__dirname, resolve(cwd, taskPath));
			const scriptFriendlyPath = relative(parent.dir, taskPath);
			let script = Tasks.load(parent, cwd, scriptPath, scriptFriendlyPath);
			if (is.callable(script)) {
				const dot = settings.find(type => type.cfg('name') === task.type) || settings[0];
				script = script(dot.resolve.bind(dot), dot.cfg.bind(dot));
			}
			if (script && is.callable(script.resolve) && is.callable(script.cfg)) {
				script = script.cfg();
			}
			configs.push(script);
		}, demand);
		return configs.length > 1 ? configs : configs[0];
	}

	static load(parent, cwd, taskPath, friendlyPath) {
		try {
			return require(taskPath);
		} catch (err) {
			friendlyPath = is.string(friendlyPath) ? friendlyPath : taskPath;
			process.stdout.write(`${cwd}: ${err.message.replace(taskPath, friendlyPath)}\n\n${err.stack}\n`);
			process.exit(1); // eslint-disable-line unicorn/no-process-exit
			return undefined;
		}
	}

	static empty() {
		return {};
	}

	static string(self, pattern, type) {
		const patternPath = resolve(self.parent().dir, pattern);
		const common = glob.sync(patternPath, { realpath: true }).map(task => {
			task = parse(task);
			task.type = type;
			return task;
		});
		if (common.length === 0) {
			throw new Error(`Nothing was found on "${pattern}" pattern.`);
		}
		return { common };
	}

	static object(self, pattern) {
		const tasks = Object.assign({}, pattern);
		for (let key in tasks) {
			if (Object.prototype.hasOwnProperty.call(tasks, key)) {
				tasks[key] = Tasks.string(self, tasks[key], key).common;
			}
		}
		return tasks;
	}
};
