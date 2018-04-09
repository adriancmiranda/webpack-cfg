/* eslint-disable no-nested-ternary */
const { is, internal } = require('describe-type');

module.exports = (modules, entry) => {
	const entries = is.array(modules) ? modules : (modules ? [modules] : []);
	if (is.object(entry)) {
		internal.keys(entry).forEach(key => {
			entry[key] = entries.concat(entry[key]);
		});
		return entry;
	}
	return entries.concat(entry);
};
