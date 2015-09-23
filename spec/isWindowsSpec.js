describe('isWindows', function () {
  var proxyquire = require('proxyquire');
  var isWindows;

  beforeEach(function () {
    this.getPlatformSpy = jasmine.createSpy('getPlatform');

    isWindows = proxyquire('../lib/isWindows', {
      './getPlatform': this.getPlatformSpy
    });
  });

  describe('when the platform name starts with "win"', function () {
    beforeEach(function () {
      this.getPlatformSpy.and.returnValue('win32');
    })

    it('returns true', function () {
      expect(isWindows()).toBe(true);
    })
  })

  describe('when the platform name does not start with "win"', function () {
    beforeEach(function () {
      this.getPlatformSpy.and.returnValue('linux');
    })

    it('returns false', function () {
      expect(isWindows()).toBe(false);
    })
  })
})
