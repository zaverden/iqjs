const { gen, expectIterator } = require('../test-help');
const select = require('../../lib/query/select');

describe('select', function () {
  it('should convert generator values', function () {
    const iterator = select(gen(2), i => i * 2);
    expectIterator(iterator, [2, 4]);
  });

  it('should convert Array values', function () {
    const iterator = select([1, 2], i => i * 2);
    expectIterator(iterator, [2, 4]);
  });

  it('should convert Array iterator values', function () {
    const iterator = select([1, 2][Symbol.iterator](), i => i * 2);
    expectIterator(iterator, [2, 4]);
  });

  it('should convert Set values', function () {
    const iterator = select(new Set([1, 2]), i => i * 2);
    expectIterator(iterator, [2, 4]);
  });

  it('should convert Set.values() values', function () {
    const iterator = select(new Set([1, 2]).values(), i => i * 2);
    expectIterator(iterator, [2, 4]);
  });
});
