/* eslint-disable no-restricted-syntax */
const { as, internal } = require('describe-type');

const reArg = /^--?(.+)/;
const reParam = /=/;

module.exports = (argv, initialValue) => {
	argv = internal.slice(argv, 2);
	return argv.reduce((keys, key, index) => {
		if (reArg.test(key)) {
			const argvalues = key.split(reParam);
			let argname = key.replace(reArg, '$1');
			let argvalue = argv[index + 1];
			if (argvalues.length === 1) {
				argvalue = true;
			} else if (argvalues.length === 2) {
				argname = argvalues[0].replace(reArg, '$1');
				argvalue = argvalues[1];
			}
			if (argname in keys) {
				keys[argname] = [keys[argname]].concat([argvalue]);
			} else {
				keys[argname] = argvalue;
			}
		}
		return keys;
	}, as(Object, initialValue, Object.create(null)));
};
