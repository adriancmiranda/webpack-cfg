const { is } = require('describe-type');
const dotcfg = require('dotcfg');

module.exports = (base, value) => {
	if (is.array(value)) {
		return value.concat(base);
	} else if (is.callable(value)) {
		return value;
	} else if (is.object(value)) {
		return dotcfg.assign(value, base);
	} else if (is.undef(base) && !is.undef(value)) {
		return value;
	} else if (is.undef(base)) {
		return value;
	}
	return base;
};
