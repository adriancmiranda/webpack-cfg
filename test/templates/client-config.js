const {contextEntries, mergeEntries, prependEntries} = require('../../tools');
const commonConfig = require('./common-config');

module.exports = get => commonConfig(get)

.cfg('entry', contextEntries(get('path.public'), mergeEntries(
	get('script.entry'),
	get('style.entry')
)), val => val)

.cfg('resolve.mainFields', 'browser', prependEntries).cfg({
	name: 'client:config',
	target: 'web',
	resolve: {
		aliasFields: ['browser'],
		descriptionFiles: ['bower.json'],
		modules: [get('bower.directory')],
		extensions: ['.scss', '.pug']
	}
});
