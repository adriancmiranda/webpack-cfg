const portfinder = require('portfinder');
const createConfig = require('./');

// Sadly, Promises only works in cli calls from webpack (at least apparently).
module.exports = (argv) => portfinder.getPortPromise().then((port) => {
  process.env.PORT = argv.port = port;
  return createConfig(argv);
});
