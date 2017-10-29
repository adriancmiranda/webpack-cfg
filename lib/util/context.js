/* eslint-disable semi-style */
const path = require('path');
const is = require('is');

module.exports = cwd => part => is.string(part) ?
	`./${path.relative(cwd, part).split(path.sep).join('/')}` :
	cwd
;
