const { is } = require('describe-type');
const interpolate = require('../util/interpolate');

module.exports = class CustomError extends Error {
	constructor(error, code, data) {
		if (is.instanceOf(Object, error)) {
			data = error;
			code = data.code;
			error = data.message;
		} else if (is.instanceOf(Object, code)) {
			data = code;
			code = data.code;
		} else if (data == null) {
			data = Object.create(null);
		}
		data.code = is.uint(code) ? code : 500;
		data.message = is.string(error) ? error : 'Unknown Error';
		super(interpolate(data.message, { data }));
		this.data = data;
		this.code = data.code;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
};
