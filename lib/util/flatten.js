const { is, as } = require('describe-type');

module.exports = function flatten(lists, recursively) {
	const args = as(Array, lists, []);
	return args.reduce((a, b) => {
		if (is.array(b)) {
			return a.concat(flatten(b, recursively));
		}
		return a.concat(b);
	}, []);
};
