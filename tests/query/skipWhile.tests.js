const { expect } = require('chai');
const { expectIterator, Iterable } = require('../test-help');
const skipWhile = require('../../lib/query/skipWhile');

describe('skip items (while)', function () {
  it('should not call predicate after first fails', function () {
    const counter = { calls: 0 };
    const iterator = skipWhile(new Iterable(5), v => {
      counter.calls++;
      return v < 4;
    });
    expectIterator(iterator, [4, 5]);
    expect(counter).to.be.deep.equal({ calls: 4 });
  });
});
