const { expect } = require('chai');
const { gen } = require('../test-help');
const concat = require('../../lib/query/concat');

describe('concat', function () {
  it('should concat values of 2 generators', function () {
    expect1212Iterator(concat(gen(2), gen(2)));
  });
  it('should concat values of generator and array', function () {
    expect1212Iterator(concat(gen(2), [1,2]));
  });
  it('should concat values of generator and set', function () {
    expect1212Iterator(concat(gen(2), new Set([1,2])));
  });
  it('should concat values of generator and set.values()', function () {
    expect1212Iterator(concat(gen(2), new Set([1,2]).values()));
  });
});


function expect1212Iterator(iterator) {
  expect(iterator).has.property(Symbol.iterator);
  expect(iterator[Symbol.iterator]).to.be.a('function');
  expect(iterator[Symbol.iterator]()).to.be.equal(iterator);

  expect(iterator).has.property('next');
  expect(iterator.next).to.be.a('function');

  expect(iterator.next()).is.deep.equal({ value: 1, done: false });
  expect(iterator.next()).is.deep.equal({ value: 2, done: false });
  expect(iterator.next()).is.deep.equal({ value: 1, done: false });
  expect(iterator.next()).is.deep.equal({ value: 2, done: false });
  expect(iterator.next()).to.have.a.property('done', true);
}
