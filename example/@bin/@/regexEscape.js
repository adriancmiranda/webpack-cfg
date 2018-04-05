const { as } = require('describe-type');

module.exports = (str) => {
	return as(String, str, '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
