const { nan } = require('describe-type/is');

module.exports = function normalizePort(port) {
  const value = parseInt(port, 10);
  return nan(value) ? port : (value >= 0 ? value : false);
}
