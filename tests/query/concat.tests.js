const { expectIterator } = require('../test-help');
const concat = require('../../lib/query/concat');

describe('concat arrays', function () {
  it('should concat values of 2 arrays', function () {
    expectIterator(
      concat([1, 2], [1, 2]),
      [1, 2, 1, 2]
    );
  });
});
