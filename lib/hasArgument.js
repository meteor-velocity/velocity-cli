var _ = require('lodash');

module.exports = function hasArgument(args, argument) {
  return _.some(args, function (arg) {
    return _.startsWith(arg, argument);
  });
};
