var _ = require('lodash');
var run = require('./lib/run');

run({
  args: process.argv.slice(2),
  env: _.clone(process.env)
});
