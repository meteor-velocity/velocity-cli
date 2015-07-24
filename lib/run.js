'use strict';

var hasArgument = require('./hasArgument');
var isCommand = require('./isCommand');
var replaceArgument = require('./replaceArgument');
var replaceCommand = require('./replaceCommand');
var spawnTestPackagesMeteor = require('./spawnTestPackagesMeteor');

module.exports = function run(options) {
  var meteorArguments = options.args;
  var meteorEnvironment = options.env;

  if (!hasArgument(meteorArguments, '--release')) {
    meteorArguments.push('--release', 'velocity:METEOR@1.1.0.2_3');
  }

  meteorArguments = replaceCommand(meteorArguments, 'test-package', 'test-packages');

  if (isCommand(meteorArguments, 'test-packages')) {
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
    console.log('  * velocity test-package my-package');
  }
}
