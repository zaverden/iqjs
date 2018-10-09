const { expect } = require('chai');
const { expectIterator } = require('../test-help');
const takeWhile = require('../../lib/query/takeWhile');

describe('take items (while)', function () {
  it('should not iterate parent after predicate fails', function () {
    const counter = { iterations: 0 };
    const iterator = { next: () => ({ value: ++counter.iterations, done: false }) };
    const takeIterator = takeWhile(iterator, v => v != 4);
    expectIterator(takeIterator, [1, 2, 3]);
    expect(counter).to.be.deep.equal({ iterations: 4 });
  });
});
