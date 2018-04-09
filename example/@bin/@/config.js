const Git = require('git-revision-webpack-plugin');
const { readJsonSync } = require('fs-extra');
const { resolve, parse } = require('path');
const { as } = require('describe-type');
const { parseArgv, parseEnv, fsystem } = require('webpack-cfg/tools');
const banner = require('./banner');

exports.pack = readJsonSync('package.json', { throws: false });

exports.source = parse(as(String, exports.pack.module, 'source/index.js'));

exports.source.origin = resolve(exports.source.dir);

exports.aliases = fsystem.aliases(exports.source.origin);

exports.env = parseEnv.params(process.env);

exports.argv = parseArgv(process.argv);

exports.git = new Git({ lightweightTags: true, branch: true });

exports.git.commithash = as(String, exports.git.commithash, exports.git) || '';

exports.git.version = as(String, exports.git.version, exports.git) || exports.pack.version;

exports.flag = banner(exports.pack, exports.git);

exports.vars = {
  __ENV__: exports.env.NODE_ENV || 'development',
  __COMMIT__: exports.git.commithash,
  __VERSION__: exports.pack.version,
};
