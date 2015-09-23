var _ = require('lodash');
var getPlatform = require('./getPlatform');

module.exports = function isWindows() {
  return _.startsWith(getPlatform(), 'win');
};
