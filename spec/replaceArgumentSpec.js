describe('replaceArgument', function () {
  var replaceArgument = require('../lib/replaceArgument');

  it('replaces the argument occurrences', function () {
    var args = ['--old', '--other', '--old'];
    expect(replaceArgument(args, '--old', '--new')).toEqual(['--new', '--other', '--new']);
  })
})
