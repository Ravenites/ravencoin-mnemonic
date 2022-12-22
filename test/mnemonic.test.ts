import Mnemonic from '../src';

describe('Mnemonic', () => {
  describe('Defaults', () => {
    const mnemonic =
      'job shop small once merit ethics enhance direct lobster else copper cotton';

    const code = new Mnemonic({
      mnemonic,
    });

    it('should initialize the class', function() {
      expect(code).toBeInstanceOf(Mnemonic);
    });

    it('should have the same words', () => {
      expect(code.mnemonic).toEqual(mnemonic);
    });
  });
});
