const { is } = require('describe-type');
const flatten = require('flatten');

module.exports = (...args) => {
	const list = flatten(args.filter(entry => is.array(entry) || is.string(entry)));
	const hash = args.filter(entry => is.object(entry));
	if (hash.length > 0) {
		let entries = {};
		let main = list.length ? hash.concat({ main: list }) : hash;
		main.forEach(entry => {
			Object.keys(entry).forEach(key => {
				if (Object.prototype.hasOwnProperty.call(entries, key)) {
					if (is.string(entries[key])) {
						entries[key] = [entries[key]];
					}
					entries[key] = entries[key].concat(entry[key]);
				} else if (is.array(entry[key]) || is.string(entry[key])) {
					entries[key] = entry[key];
				} else {
					throw new TypeError('An entry has a invalid type.');
				}
			});
		});
		return entries;
	}
	return list.length === 1 ? list[0] : list;
};
