const pirateFlag = require('pirate-flag');
const moment = require('moment');

moment.locale();

module.exports = (pack, git, options) => pirateFlag(pack, {
	commit: git.commithash,
	moment: moment().format('LLLL'),
	homepage: pack.homepage,
	author: pack.author,
	license: `(c) ${+moment().format('GGGG')}-${+moment().format('GGGG') + 3}\n`,
}, Object.assign({ comment: true, image: [''] }, options));
