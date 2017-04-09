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
		new Tasks(this, pattern);
		return this.setConfig(settings);
	}

	setConfig(argv, settings) {
		if (arguments.length === 1) {
			settings = argv;
			argv = undefined;
		}
		return new Config(this, argv, settings, Tasks.hash);
	}

	parent(filename) {
		return () => filename;
	}
};
