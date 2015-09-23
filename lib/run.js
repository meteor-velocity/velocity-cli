'use strict';

var hasArgument = require('./hasArgument');
var isCommand = require('./isCommand');
var replaceArgument = require('./replaceArgument');
var replaceCommand = require('./replaceCommand');
var spawnMeteor = require('./spawnMeteor');
var spawnTestPackagesMeteor = require('./spawnTestPackagesMeteor');

module.exports = function run(options) {
  var meteorArguments = options.args;
  var meteorEnvironment = options.env;

  if (isCommand(meteorArguments, 'test-app')) {
    meteorArguments = replaceCommand(meteorArguments, 'test-app', 'run');
    meteorArguments = replaceArgument(meteorArguments, '--ci', '--test');

    spawnMeteor({
      args: meteorArguments,
      env: meteorEnvironment
    });
  } else if (isCommand(meteorArguments, 'test-package') ||
             isCommand(meteorArguments, 'test-packages')
  ) {
    meteorArguments = replaceCommand(meteorArguments, 'test-package', 'test-packages');

    if (!meteorEnvironment.VELOCITY_USE_CHECKED_OUT_METEOR && !hasArgument(meteorArguments, '--release')) {
      meteorArguments.push('--release', 'velocity:METEOR@1.2.0.1_1');
    }

    if (!hasArgument(meteorArguments, '--driver-package')) {
      meteorArguments.push('--driver-package', 'velocity:html-reporter');
    }

    meteorArguments = replaceArgument(meteorArguments, '--ci', '--velocity');

    spawnTestPackagesMeteor({
      args: meteorArguments,
      env: meteorEnvironment
    });
  } else {
    console.error('Velocity does not support this command.');
    console.log('Supported commands:');
    console.log('  * velocity test-app');
    console.log('  * velocity test-package my-package');
  }
}
