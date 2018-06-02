/* eslint-disable no-nested-ternary */
const { isAbsolute, join, sep } = require('path');
const { keys } = require('describe-type/ponyfill');
const { is } = require('describe-type');

module.exports = (context, entry) => {
	if (is.string(context) === false) {
		return entry;
	}
	const entries = is.array(entry) ? entry : (entry ? [entry] : []);
	if (is.object(entry)) {
		keys(entry).forEach(key => {
			if (is.array(entry[key])) {
				entry[key] = module.exports(context, entry[key]);
			} else if (is.string(entry[key])) {
				const prefix = isAbsolute(context) ? '' : './';
				entry[key] = `${prefix}${join(context, entry[key])}`.split(sep).join('/');
			}
		});
		return entry;
	} else if (is.string(entry)) {
		return `${isAbsolute(context) ? '' : './'}${join(context, entry)}`.split(sep).join('/');
	}
	const list = entries.map(key => {
		return `${isAbsolute(context) ? '' : './'}${join(context, key)}`.split(sep).join('/');
	});
	return list.length >= 1 ? list : list[0];
};
