const { relative } = require('path');
const is = require('is');

module.exports = (context, entry) => {
	if (is.empty(context)) return entry;
	const entries = is.array(entry) ? entry : entry ? [entry] : [];
	if (is.object(entry)) {
		Object.keys(entry).forEach(key => {
			if (is.array(entry[key])){
				entry[key] = module.exports(context, entry[key]);
			} else if (is.string(entry[key])) {
				entry[key] = relative(context, entry[key]);
			}
		});
		return entry;
	} else if (is.string(entry)) {
		return relative(context, entry);
	}
	return entries.map(key => relative(context, key));
};
