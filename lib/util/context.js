/* eslint-disable semi-style */
const { relative, sep } = require('path');
const { is } = require('describe-type');

module.exports = cwd => part => is.string(part) ?
	`./${relative(cwd, part).split(sep).join('/')}` :
	cwd
;
