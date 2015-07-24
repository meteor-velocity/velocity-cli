describe('hasArgument', function () {
  var hasArgument = require('../lib/hasArgument.js');

  it('matches "--argument value"', function () {
    var args = ['--argument', 'value'];
    expect(hasArgument(args, '--argument')).toBe(true);
  })

  it('matches "--argument=value"', function () {
    var args = ['--argument=value'];
    expect(hasArgument(args, '--argument')).toBe(true);
  })
})
