const { gen, expectIterator } = require('../test-help');
const where = require('../../lib/query/where');

describe('where', function () {
  it('should filter generator values', function () {
    const iterator = where(gen(4), i => i % 2 === 0);
    expectIterator(iterator, [2, 4]);
  });

  it('should complete from finished iterator', function () {
    const iterator = where(gen(0), i => i % 2 === 0);
    expectIterator(iterator, []);
  });
});
