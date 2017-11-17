const { is } = require('describe-type');

module.exports = function normalizePort(port) {
  const value = parseInt(port, 10);
  return is.nan(value) ? port : (value >= 0 ? value : false);
}
