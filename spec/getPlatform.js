describe('getPlatform', function () {
  var getPlatform = require('../lib/getPlatform');

  it('return process.platform', function () {
    expect(getPlatform()).toBe(process.platform);
  });
})
