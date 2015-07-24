var _ = require('lodash');
var spawnMeteor = require('./spawnMeteor');

module.exports = function spawnTestPackagesMeteor(options) {
  _.extend(options.env, {
    VELOCITY_TEST_PACKAGES: '1'
  });

  return spawnMeteor(options);
};
