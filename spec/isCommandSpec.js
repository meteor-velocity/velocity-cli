describe('isCommand', function () {
  var isCommand = require('../lib/isCommand');

  beforeEach(function () {
    this.arguments = ['test-packages', '--arg', 'value'];
  })

  describe('when the first argument is the command', function () {
    it('returns true', function () {
      expect(isCommand(this.arguments, 'test-packages')).toBe(true);
    })
  })

  describe('when the first argument is not the command', function () {
    it('returns false', function () {
      expect(isCommand(this.arguments, 'something')).toBe(false);
    })
  })
})
