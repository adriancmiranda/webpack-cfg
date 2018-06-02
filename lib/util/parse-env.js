/* eslint-disable no-restricted-syntax */
const { keys } = require('describe-type/ponyfill');
const { is, as } = require('describe-type');

const multi = /,/;
const falsy = /^false$/i;
const truthy = /^true$/i;
const numeric = /^([0-9]+|NaN|Infinity)$/;

exports.param = (val) => {
	if (is.string(val)) {
		if (multi.test(val)) val = val.split(multi);
		if (falsy.test(val)) return false;
		if (truthy.test(val)) return true;
		if (numeric.test(val)) return Number(val);
	}
	return val;
};

exports.params = (object, initialValue, getAsEnv) => {
	const data = as(Object, object, Object.create(null));
	return keys(data).reduce((accumulator, key) => {
		if (getAsEnv) accumulator[key] = JSON.stringify(data[key]);
		else accumulator[key] = exports.param(data[key]);
		return accumulator;
	}, as(Object, initialValue, Object.create(null)));
};

exports.stringify = (object, initialValue) => {
	const data = as(Object, object, Object.create(null));
	return keys(data).reduce((accumulator, key) => {
		accumulator[key] = JSON.stringify(data[key]);
		return accumulator;
	}, as(Object, initialValue, Object.create(null)));
};
