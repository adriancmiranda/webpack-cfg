const portfinder = require('portfinder');
const createConfig = require('./');

// Saddly, Promises only works in directly calls.
module.exports = (argv) => portfinder.getPortPromise().then((port) => {
  process.env.PORT = argv.port = port;
  return createConfig(argv);
});
