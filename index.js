'use strict';

var _ = require('lodash');
var spawn = require('child_process').spawn;

var meteorCommand = isWindows() ? 'meteor.bat' : 'meteor';
var meteorArguments = [];
var meteorProcess = spawn(meteorCommand, meteorArguments, {
  cwd: process.cwd,
  env: process.env,
  stdio: 'pipe'
})


function spawnTestPackagesMeteor(args, packages) {
  var env = _.defaults({
    VELOCITY_TEST_PACKAGES: '1'
  }, process.env);

  var options = {
    env: env,
    args: args
  }

  return spawnMeteor(options);
}

function spawnMeteor(options) {
  var meteorCommand = isWindows() ? 'meteor.bat' : 'meteor';
  var meteorArguments = options.args || [];
  var meteorProcess = spawn(meteorCommand, meteorArguments, {
    cwd: process.cwd,
    env: options.env || process.env,
    stdio: 'pipe'
  })

  process.stdin.pipe(meteorProcess.stdin);
  meteorProcess.stdout.pipe(process.stdout);
  meteorProcess.stderr.pipe(process.stderr);

  return meteorProcess;
}

function isWindows() {
  return process.platform === 'win32';
}
