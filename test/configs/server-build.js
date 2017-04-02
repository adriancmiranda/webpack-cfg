const serverConfig = require('../templates/server-config');

module.exports = get => serverConfig(get).cfg({
	name: 'server:build'
});
