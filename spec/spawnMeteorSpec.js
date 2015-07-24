describe('spawnMeteor', function () {
  var proxyquire = require('proxyquire');
  var spawnMeteor;
  var childProcessStub;

  beforeEach(function () {
    spyOn(process.stdin, 'pipe');
    childProcessStub = {
      spawn: jasmine.createSpy('spawn').and.returnValue({
        stdout: {
          pipe: jasmine.createSpy('child.stdout.pipe')
        },
        stderr: {
          pipe: jasmine.createSpy('child.stderr.pipe')
        },
        on: jasmine.createSpy('child.on')
      }),
      '@noCallThru': true
    };
    spawnMeteor = proxyquire('../lib/spawnMeteor', {
      'child_process': childProcessStub,
      './isWindows': function () {
        return false;
      }
    });
  })

  it('spawns meteor', function () {
    var args = [];
    var env = {};

    spawnMeteor({
      args: args,
      env: env
    });

    expect(childProcessStub.spawn).toHaveBeenCalledWith('meteor', args, {
      cwd: process.cwd,
      env: env,
      stdio: 'pipe'
    });
  })
})
