describe('spawnTestPackagesMeteor', function () {
  var proxyquire = require('proxyquire');
  var spawnMeteor;
  var spawnTestPackagesMeteor;

  beforeEach(function () {
    spawnMeteor = jasmine.createSpy('spawnMeteor');
    spawnTestPackagesMeteor = proxyquire('../lib/spawnTestPackagesMeteor', {
      './spawnMeteor': spawnMeteor
    });
  })

  it('spawns meteor with the passed options', function () {
    var options = {};
    spawnTestPackagesMeteor(options);
    expect(spawnMeteor).toHaveBeenCalledWith(options);
  })

  it('adds the environment variable VELOCITY_TEST_PACKAGES=1', function () {
    var env = {};
    spawnTestPackagesMeteor({env: env});
    expect(env.VELOCITY_TEST_PACKAGES).toBe('1');
  })
})
