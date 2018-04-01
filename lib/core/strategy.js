const path = require('path');
const dotcfg = require('dotcfg');
const { is } = require('describe-type');
const alias = require('../util/alias');
const absAlias = require('../util/abs-alias');
const context = require('../util/context');

module.exports = (value, target, uid, keys) => {
	if (is.array(target)) {
		return target.concat(value);
	}
	if (is.object(target) && is.object(value)) {
		return dotcfg.assign(target, value);
	}
	if (keys[0] === 'cwd' && is.string(value)) {
		return absAlias(value);
	}
	if ((keys[0] === 'ctx' || keys[0] === 'context') && is.string(value)) {
		return context(value);
	}
	if (keys[0] === 'path' && is.string(value)) {
		return alias(value);
	}
	if (keys[0] === 'alias' && is.string(value) && !/\$$/.test(uid)) {
		return path.resolve(process.cwd(), value);
	}
	return dotcfg.strategy(value, target, uid, keys);
};
