const Git = require('git-revision-webpack-plugin');
const { resolve, parse } = require('path');
const { aliases } = require('./aliases');
const { params } = require('./env');
const { args } = require('./argv');
const banner = require('./banner');

exports.pack = require('../../package.json');

exports.source = parse(exports.pack.main);

exports.source.path = resolve(exports.source.dir);

exports.git = new Git({ lightweightTags: true, branch: true });

exports.env = params(process.env);

exports.argv = args(process.argv);

exports.flag = banner(exports.pack, exports.git);

exports.aliases = aliases(exports.source.path);

exports.vars = {
	__ENV__: exports.env.NODE_ENV || 'development',
	__COMMIT__: exports.git.commithash(),
	__VERSION__: exports.pack.version,
};
