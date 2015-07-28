describe('index', function () {
  var proxyquire = require('proxyquire');
  var _ = require('lodash');
  var spawnMeteor;
  var spawnTestPackagesMeteor;
  var run;

  beforeEach(function () {
    spawnMeteor = jasmine.createSpy('spawnMeteor');
    spawnTestPackagesMeteor = jasmine.createSpy('spawnTestPackagesMeteor');
    run = proxyquire('../lib/run', {
      './spawnMeteor': spawnMeteor,
      './spawnTestPackagesMeteor': spawnTestPackagesMeteor
    });
  })

  describe('when no --release is specified', function () {
    it('adds the latest Velocity Meteor release as argument', function () {
      var args = ['test-packages'];
      var env = {};

      run({
        args: args,
        env: env
      });

      expect(spawnTestPackagesMeteor).toHaveBeenCalled();
      var spawnOptions = spawnTestPackagesMeteor.calls.argsFor(0)[0];
      var expectedArguments = ['--release', 'velocity:METEOR@1.1.0.2_3'];
      expect(_.intersection(spawnOptions.args.slice(1), expectedArguments)).toEqual(expectedArguments);
    })
  })

  describe('when no --driver-package is specified', function () {
    it('adds the velocity:html-reporter as driver-package', function () {
      var args = ['test-packages'];
      var env = {};

      run({
        args: args,
        env: env
      });

      expect(spawnTestPackagesMeteor).toHaveBeenCalled();
      var spawnOptions = spawnTestPackagesMeteor.calls.argsFor(0)[0];
      var expectedArguments = ['--driver-package', 'velocity:html-reporter'];
      expect(_.intersection(spawnOptions.args.slice(1), expectedArguments)).toEqual(expectedArguments);
    })
  })

  describe('test-packages command', function () {
    describe('when --ci is passed as argument', function () {
      it('it calls meteor with --velocity (CI mode)', function () {
        var args = ['test-packages', 'foo', '--ci'];
        var env = {};

        run({
          args: args,
          env: env
        });

        expect(spawnTestPackagesMeteor).toHaveBeenCalled();
        var spawnOptions = spawnTestPackagesMeteor.calls.argsFor(0)[0];
        var meteorArgs = spawnOptions.args.slice(1);
        expect(_.contains(meteorArgs, '--velocity')).toBe(true);
        expect(_.contains(meteorArgs, '--ci')).toBe(false);
      })
    })
  })

  describe('test-app command', function () {
    it('it executes `meteor run --test`', function () {
      var args = ['test-app'];
      var env = {};

      run({
        args: args,
        env: env
      });

      expect(spawnMeteor).toHaveBeenCalled();
      var spawnOptions = spawnMeteor.calls.argsFor(0)[0];
      var command = spawnOptions.args[0];
      var meteorArgs = spawnOptions.args.slice(1);
      expect(command).toBe('run');
      expect(meteorArgs).toEqual([]);
    })

    describe('when --ci is passed as argument', function () {
      it('it executes `meteor run --test --ci`', function () {
        var args = ['test-app', '--ci'];
        var env = {};

        run({
          args: args,
          env: env
        });

        expect(spawnMeteor).toHaveBeenCalled();
        var spawnOptions = spawnMeteor.calls.argsFor(0)[0];
        var command = spawnOptions.args[0];
        var meteorArgs = spawnOptions.args.slice(1);
        expect(command).toBe('run');
        expect(meteorArgs).toEqual(['--test']);
      })
    })
  })
})
