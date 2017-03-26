const is = require('is');
const flatten = require('flatten');

module.exports = (...args) => {
	const list = flatten(args.filter(entry => is.array(entry) || is.string(entry)));
	const hash = args.filter(entry => is.object(entry));
	if (hash.length) {
		let entries = {};
		hash.concat(list).forEach(entry => {
			Object.keys(entry).forEach(key => {
				if (Object.prototype.hasOwnProperty.call(entries, key)) {
					entries[key] = [entries[key]].concat(entry[key]);
				} else {
					entries[key] = entry[key];
				}
			});
		});
		return entries;
	}
	return list.length === 1 ? list[0] : list;
};
