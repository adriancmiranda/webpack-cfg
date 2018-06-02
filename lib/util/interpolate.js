const { as, has } = require('describe-type');
const escapeRegExp = require('./escape-regexp');

module.exports = (template, options) => {
	const opts = as(Object, options, {});
	const data = as(Object, opts.data, {});
	const o = escapeRegExp(as(String, opts.open, '{'));
	const f = escapeRegExp(as(String, opts.close, '}'));
	const reTags = new RegExp(`${o}([0-9a-zA-Z_]+)${f}`, 'g');
	const string = as(String, template, '');
	return string.replace(reTags, (match, key, index) => {
		if (string[index - 1] === o && string[index + match.length] === f) {
			return key;
		}
		return has.ownProperty(data, key) ? data[key] : '';
	});
};
