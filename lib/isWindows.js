var _ = require('lodash');

module.exports = function isWindows() {
  return _.startsWith(process.platform, 'win');
};
