/* eslint-disable no-nested-ternary */
const { is, internal } = require('describe-type');

module.exports = (modules, entry) => {
	const entries = is.array(modules) ? modules : (modules ? [modules] : []);
	if (is.object(entry)) {
		internal.keys(entry).forEach(key => {
			if (is.array(entry[key])) {
				entry[key] = entry[key].concat(entries);
			} else {
				entry[key] = [entry[key]].concat(entries);
			}
		});
		return entry;
	} else if (is.array(entry)) {
		return entry.concat(entries);
	}
	return [entry].concat(entries);
};
