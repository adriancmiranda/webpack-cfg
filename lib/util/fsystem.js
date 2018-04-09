/* eslint-disable object-curly-newline */
const { lstatSync, readdirSync } = require('fs');
const { join, sep } = require('path');
const { as } = require('describe-type');
const flatten = require('./flatten');

exports.moduleExists = (srcpath) => {
	try {
		return !!require.resolve(srcpath);
	} catch (err) {
		return false;
	}
};

exports.isDirectory = (srcpath) => {
	try {
		return lstatSync(srcpath).isDirectory();
	} catch (err) {
		return false;
	}
};

exports.isFile = (srcpath) => {
	try {
		return lstatSync(srcpath).isFile();
	} catch (err) {
		return false;
	}
};

exports.dirs = (srcpath, options) => {
	const opts = as(Object, options, { includeOwn: true });
	const readdir = readdirSync(srcpath);
	const content = readdir.map(name => join(srcpath, name));
	const dirs = content.filter(exports.isDirectory);
	return opts.includeOwn ? [srcpath, ...dirs] : dirs;
};

exports.tree = (srcpath, options) => {
	const opts = as(Object, options, { includeOwn: false });
	const dirs = exports.dirs(srcpath, { includeOwn: false });
	const tree = flatten(dirs.map(src => exports.tree(src, opts)));
	return opts.includeOwn ? [srcpath, ...tree] : tree;
};

exports.aliases = (srcpath, options) => {
	const opts = Object.assign({ includeOwn: true, recursively: false, main: '', prefix: '' }, options);
	return exports[opts.recursively ? 'tree' : 'dirs'](srcpath, opts).reduce((aliases, path) => {
		const slug = path.slice(srcpath.length + 1).replace(new RegExp(`\\${sep}`), '-');
		const key = opts.prefix ? opts.prefix + slug.replace(new RegExp(`^\\${opts.prefix}`), '') : slug;
		aliases[`${key}` || '~'] = opts.main ? join(path, opts.main) : path;
		return aliases;
	}, Object.create(null));
};
