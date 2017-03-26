const is = require('is');
const dotcfg = require('dotcfg');

module.exports = (value, target, uid, keys) => {
	if (Array.isArray(target)) {
		return target.concat(value);
	}
	if (is.object(target) && is.object(value)) {
		return dotcfg.assign(target, value);
	}
	return value;
};
