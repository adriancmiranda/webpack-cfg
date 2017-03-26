const is = require('is');

module.exports = (modules, entry) => {
	const entries = is.array(modules) ? modules : modules ? [modules] : [];
	if (is.object(entry)) {
		Object.keys(entry).forEach(key => entry[key] = entries.concat(entry[key]));
		return entry;
	}
	return entries.concat(entry);
};
