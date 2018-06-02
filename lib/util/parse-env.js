/* eslint-disable no-restricted-syntax */
const { create, keys } = require('describe-type/ponyfill');
const { is, as } = require('describe-type');
const { stringify } = JSON;

const multi = /,/;
const falsy = /^false$/i;
const truthy = /^true$/i;
const numeric = /^([0-9]+|NaN|Infinity)$/;

const param = (val) => {
	if (is.string(val)) {
		if (multi.test(val)) val = val.split(multi);
		if (falsy.test(val)) return false;
		if (truthy.test(val)) return true;
		if (numeric.test(val)) return Number(val);
	}
	return val;
};

const params = (object, initialValue) => {
	const data = as.instanceOf(Object, object, create(null));
	return keys(data).reduce((accumulator, key) => {
		accumulator[key] = param(data[key]);
		return accumulator;
	}, as(Object, initialValue, create(null)));
};

const definitions = (object, initialValue) => {
	if (initialValue) initialValue = definitions(initialValue);
	const data = as.instanceOf(Object, object, create(null));
	return keys(data).reduce((accumulator, key) => {
		accumulator[key] = stringify(data[key]);
		return accumulator;
	}, as(Object, initialValue, create(null)));
};

module.exports = params;
module.exports.params = params;
module.exports.param = param;
module.exports.stringify = definitions;
module.exports.definitions = definitions;
