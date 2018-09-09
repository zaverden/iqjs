const { gen, expectIterator } = require('../test-help');
const concat = require('../../lib/query/concat');

describe('concat', function () {
  it('should concat values of 2 generators', function () {
    expectIterator(
      concat(gen(2), gen(2)),
      [1, 2, 1, 2]
    );
  });
  it('should concat values of generator and array', function () {
    expectIterator(
      concat(gen(2), [1, 2]),
      [1, 2, 1, 2]
    );
  });
  it('should concat values of generator and set', function () {
    expectIterator(
      concat(gen(2), new Set([1, 2])),
      [1, 2, 1, 2]
    );
  });
  it('should concat values of generator and set.values()', function () {
    expectIterator(
      concat(gen(2), new Set([1, 2]).values()),
      [1, 2, 1, 2]
    );
  });
});
