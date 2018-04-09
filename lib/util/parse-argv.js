/* eslint-disable no-restricted-syntax */
const { as } = require('describe-type');

const reArg = /^--?(.+)/;
const reParam = /=/;

module.exports = (argv, initialValue) => {
	argv = as(Array, argv, []).slice(2);
	return argv.reduce((keys, key, index) => {
		if (reArg.test(key)) {
			const argvalues = key.split(reParam);
			let argname = key.replace(reArg, '$1');
			let argvalue = argv[index + 1];
			if (argvalues.length === 2) {
				argname = argvalues[0].replace(reArg, '$1');
				argvalue = argvalues[1];
			}
			keys[argname] = argname in keys ? [keys[argname]].concat([argvalue]) : argvalue;
		}
		return keys;
	}, as(Object, initialValue, Object.create(null)));
};
