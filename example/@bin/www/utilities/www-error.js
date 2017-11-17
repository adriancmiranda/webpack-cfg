const debug = require('debug');
const { is } = require('describe-type');

const fault = debug('www:fault');

module.exports = function wwwError(port, error) {
	if (!is.error(error)) throw new Error('invalid call to wwwError');
	if (error.syscall !== 'listen') throw error;
  const bind = is.string(port) ? `Pipe ${port}` : `Port ${port}`;
	switch (error.code) {
    case 'EACCES':
      fault(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      fault(`${bind} is already in use`);
      process.exit(1);
      break;
    default: throw error;
  }
}
