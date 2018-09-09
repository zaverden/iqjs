const { gen, expectIterator } = require('../test-help');
const select = require('../../lib/query/select');

describe('select', function () {
  it('should convert generator values', function () {
    const iterator = select(gen(2), i => i * 2);
    expectIterator(iterator, [2, 4]);
  });
});
