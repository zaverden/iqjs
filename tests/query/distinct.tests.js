const { gen, expectIterator } = require('../test-help');
const distinct = require('../../lib/query/distinct');

describe('distinct', function () {
  it('should distinct values of generator', function () {
    expectIterator(
      distinct(gen(2)),
      [1, 2]
    );
  });
  it('should distinct values by selector', function () {
    expectIterator(
      distinct(gen(4), i => i % 2),
      [1, 2]
    );
  });
  it('should distinct values of Array', function () {
    expectIterator(
      distinct([1, 1, 2, 2]),
      [1, 2]
    );
  });
  it('should distinct values of Array Iterator', function () {
    expectIterator(
      distinct([1, 1, 2, 2][Symbol.iterator]()),
      [1, 2]
    );
  });
});
