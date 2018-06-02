/* eslint-disable no-nested-ternary */
const { keys } = require('describe-type/ponyfill');
const { is } = require('describe-type');

module.exports = (modules, entry) => {
	const entries = is.array(modules) ? modules : (modules ? [modules] : []);
	if (is.object(entry)) {
		keys(entry).forEach(key => {
			entry[key] = entries.concat(entry[key]);
		});
		return entry;
	}
	return entries.concat(entry);
};
