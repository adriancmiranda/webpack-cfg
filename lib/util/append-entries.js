const is = require('is');

module.exports = (modules, entry) => {
	const entries = is.array(modules) ? modules : modules ? [modules] : [];
	if (is.object(entry)) {
		Object.keys(entry).forEach((key) => {
			if (is.array(entry[key])) {
				entry[key] = entry[key].concat(entries);
			} else {
				entry[key] = [entry[key]].concat(entries);
			}
		});
		return entry;
	}
	return entries.concat(entry);
};
