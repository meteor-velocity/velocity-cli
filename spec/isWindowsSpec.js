describe('isWindows', function () {
  var isWindows = require('../lib/isWindows');

  beforeEach(function () {
    this.originalPlatform = process.platform;
  })

  afterEach(function () {
    process.platform = this.originalPlatform;
  })

  describe('when the platform name starts with "win"', function () {
    beforeEach(function () {
      process.platform = 'win32';
    })

    it('returns true', function () {
      expect(isWindows()).toBe(true);
    })
  })

  describe('when the platform name does not start with "win"', function () {
    beforeEach(function () {
      process.platform = 'linux';
    })

    it('returns false', function () {
      expect(isWindows()).toBe(false);
    })
  })
})
