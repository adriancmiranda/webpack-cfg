const is = require('is');
const dotcfg = require('dotcfg');
const strategy = require('./strategy');
const Command = require('./command');

module.exports = class Config {
  constructor(self, settings, tasks) {
    self = Config.parse(self, settings, tasks);
    if (self) return self;
    else throw new TypeError('Could not configure your webpack with this settings');
  }

  static parse(self, settings, tasks) {
    for (let kind of ['empty', 'fn']) {
      if (is.fn(is[kind]) && is[kind](settings)) {
        return Config[kind](self, settings, tasks);
      }
    }
  }

  static createArguments(common, tasks) {
    const args = [common];
    !is.empty(tasks) && Object.keys(tasks).forEach(key => {
      var cp = common.cfg(true);
      var target = dotcfg(cp, strategy);
      target.cfg('name', key);
      args.push(target);
    });
    return args;
  }

  static defineArguments(self, tasks) {
    const common = tasks.shift();
    const args = [common];
    !is.empty(tasks) && tasks.forEach(task => {
      const cp = common.cfg(true);
      const name = task.name;
      const config = task.cfg();
      const target = dotcfg.assign(cp, config);
      self[name] = args[args.length] = dotcfg(target);
    });
    return args;
  }

  static empty(self) {
    return self;
  }

  static fn(self, settings, tasks) {
    const common = dotcfg(self.common.cfg(), strategy);
    let args = Config.createArguments(common, tasks);
    settings(...args);
    settings = Config.defineArguments(self, args);
    let cmd = new Command(self, settings, tasks);
    for (let config of settings) {
      cmd[config.name] = config;
    }
    return cmd;
  }
};
