const debug = require('debug')('www:error');
const { is } = require('describe-type');

module.exports = function wwwError(port, error) {
	if (!is.error(error)) throw new Error('invalid call to wwwError');
	if (error.syscall !== 'listen') throw error;
  const bind = is.string(port) ? `Pipe ${port}` : `Port ${port}`;
	switch (error.code) {
    case 'EACCES':
      debug(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug(`${bind} is already in use`);
      process.exit(1);
      break;
    default: throw error;
  }
}
