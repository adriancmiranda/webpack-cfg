const is = require('is');
const dotcfg = require('dotcfg');

module.exports = (value, target) => {
	if (is.array(target)) {
		return target.concat(value);
	} else if (is.fn(target)) {
		return value;
	} else if (is.object(target)) {
		return dotcfg.assign(target, value);
	}
	return value;
};
