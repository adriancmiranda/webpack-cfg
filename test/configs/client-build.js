const clientConfig = require('../templates/client-config');

module.exports = get => clientConfig(get).cfg({
	name: 'client:build'
});
