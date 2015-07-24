var _ = require('lodash');

module.exports = function replaceArgument(args, oldArgument, newArgument) {
  return _.map(args, function (arg) {
    return arg === oldArgument ? newArgument : arg;
  })
}
