const { expect } = require('chai');
const { gen } = require('../test-help');
const where = require('../../lib/query/where');

describe('where', function () {
  it('should filter generator values', function () {
    const iterator = where(gen(4), i => i % 2 === 0);

    expect(iterator).has.property(Symbol.iterator);
    expect(iterator[Symbol.iterator]).to.be.a('function');
    expect(iterator[Symbol.iterator]()).to.be.equal(iterator);

    expect(iterator).has.property('next');
    expect(iterator.next).to.be.a('function');

    expect(iterator.next()).is.deep.equal({ value: 2, done: false });
    expect(iterator.next()).is.deep.equal({ value: 4, done: false });
    expect(iterator.next()).is.deep.equal({ done: true });
  });

  it('should complete from finished iterator', function () {
    const iterator = where(gen(0), i => i % 2 === 0);
    expect(iterator).has.property('next');
    expect(iterator.next).to.be.a('function');
    expect(iterator.next()).is.deep.equal({ done: true });
  });
});
