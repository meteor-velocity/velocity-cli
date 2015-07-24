'use strict';

var _ = require('lodash');
var spawn = require('child_process').spawn;

var args = process.argv;
var meteorArguments = args.slice(2);
var meteorEnvironment = _.clone(process.env);

if (!hasArgument(meteorArguments, '--release')) {
  meteorArguments.push('--release', 'velocity:METEOR@1.1.0.2_3');
}

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
  console.log('  * velocity test-packages my-package');
}


function isCommand(args, command) {
  return args[0] === command;
}

function hasArgument(args, argument) {
  return _.some(args.slice(1), function (arg) {
    return _.startsWith(arg, argument);
  });
}

function replaceArgument(args, oldArgument, newArgument) {
  return _.map(args, function (arg) {
    return arg === oldArgument ? newArgument : arg;
  })
}

function spawnTestPackagesMeteor(options) {
  _.extend(options.env, {
    VELOCITY_TEST_PACKAGES: '1'
  });

  return spawnMeteor(options);
}

function spawnMeteor(options) {
  var meteorCommand = isWindows() ? 'meteor.bat' : 'meteor';
  var meteorArguments = options.args || [];
  var meteorProcess = spawn(meteorCommand, meteorArguments, {
    cwd: process.cwd,
    env: options.env || process.env,
    stdio: 'pipe'
  });

  process.stdin.pipe(meteorProcess.stdin);
  meteorProcess.stdout.pipe(process.stdout);
  meteorProcess.stderr.pipe(process.stderr);

  return meteorProcess;
}

function isWindows() {
  return _.startsWith(process.platform, 'win');
}
