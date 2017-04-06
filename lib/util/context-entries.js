const {isAbsolute, join} = require('path');
const is = require('is');

module.exports = (context, entry) => {
	if (!is.string(context)) {
		return entry;
	}
	const entries = is.array(entry) ? entry : entry ? [entry] : [];
	if (is.object(entry)) {
		Object.keys(entry).forEach(key => {
			if (is.array(entry[key])) {
				entry[key] = module.exports(context, entry[key]);
			} else if (is.string(entry[key])) {
				const prefix = isAbsolute(context) ? '' : './';
				entry[key] = `${prefix}${join(context, entry[key])}`;
			}
		});
		return entry;
	} else if (is.string(entry)) {
		return `${isAbsolute(context) ? '' : './'}${join(context, entry)}`;
	}
	const list = entries.map(key => {
		return `${isAbsolute(context) ? '' : './'}${join(context, key)}`;
	});
	return list.length >= 1 ? list : list[0];
};
