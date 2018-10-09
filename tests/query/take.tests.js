const { expect } = require('chai');
const { expectIterator } = require('../test-help');
const take = require('../../lib/query/take');

describe('take items', function () {
  it('should not iterate parent more than count', function () {
    let i = 0;
    const iterator = { next: () => ({ value: ++i, done: i > 10 }) };
    const takeIterator = take(iterator, 3);
    expectIterator(takeIterator, [1, 2, 3]);
    expect(i).to.be.equal(3);
  });
});
