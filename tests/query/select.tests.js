const { expect } = require('chai');
const { gen } = require('../test-help');
const select = require('../../lib/query/select');

describe('select', function () {
  it('should convert generator values', function () {
    const iterator = select(gen(2), i => i * 2);

    expect(iterator).has.property(Symbol.iterator);
    expect(iterator[Symbol.iterator]).to.be.a('function');
    expect(iterator[Symbol.iterator]()).to.be.equal(iterator);

    expect(iterator).has.property('next');
    expect(iterator.next).to.be.a('function');

    expect(iterator.next()).is.deep.equal({ value: 2, done: false });
    expect(iterator.next()).is.deep.equal({ value: 4, done: false });
    expect(iterator.next()).is.deep.equal({ done: true });
  });
});
