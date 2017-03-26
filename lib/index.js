const dotcfg = require('dotcfg');
const EventEmitter = require('events');
const strategy = require('./core/strategy');
const Config = require('./core/config');
const Tasks = require('./core/tasks');

module.exports = class WebpackCfg extends EventEmitter {
	constructor(parentFilename, pattern, settings) {
		super();
		this.common = dotcfg({ name: 'common' }, strategy);
		this.parent = this.parent(parentFilename);
		this.registerTasks(pattern);
		return this.setConfig(settings);
	}

	registerTasks(pattern) {
		return new Tasks(this, pattern);
	}

	setConfig(settings) {
		return new Config(this, settings, Tasks.hash);
	}

	parent(filename) {
		return () => filename;
	}
};
