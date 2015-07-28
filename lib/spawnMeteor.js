var spawn = require('child_process').spawn;
var isWindows = require('./isWindows');

module.exports = function spawnMeteor(options) {
  var meteorCommand = isWindows() ? 'meteor.bat' : 'meteor';
  var meteorArguments = options.args || [];
  var meteorProcess = spawn(meteorCommand, meteorArguments, {
    cwd: process.cwd(),
    env: options.env || process.env,
    stdio: 'pipe'
  });

  process.stdin.pipe(meteorProcess.stdin);
  meteorProcess.stdout.pipe(process.stdout);
  meteorProcess.stderr.pipe(process.stderr);

  meteorProcess.on('exit', function (code) {
    process.exit(code);
  })

  return meteorProcess;
};
