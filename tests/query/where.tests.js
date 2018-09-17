const { gen, expectIterator } = require('../test-help');
const where = require('../../lib/query/where');

describe('where', function () {
  it('should filter generator values', function () {
    const iterator = where(gen(4), i => i % 2 === 0);
    expectIterator(iterator, [2, 4]);
  });

  it('should filter Array values', function () {
    const iterator = where([1, 2, 3, 4], i => i % 2 === 0);
    expectIterator(iterator, [2, 4]);
  });

  it('should filter Array iterator values', function () {
    const iterator = where([1, 2, 3, 4][Symbol.iterator](), i => i % 2 === 0);
    expectIterator(iterator, [2, 4]);
  });

  it('should filter Set values', function () {
    const iterator = where(new Set([1, 2, 3, 4]), i => i % 2 === 0);
    expectIterator(iterator, [2, 4]);
  });

  it('should filter Set.values() values', function () {
    const iterator = where(new Set([1, 2, 3, 4]).values(), i => i % 2 === 0);
    expectIterator(iterator, [2, 4]);
  });

  it('should complete from finished iterator', function () {
    const iterator = where(gen(0), i => i % 2 === 0);
    expectIterator(iterator, []);
  });
});
