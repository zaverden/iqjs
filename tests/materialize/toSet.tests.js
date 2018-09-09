const { expect } = require('chai');
const { gen, Iterator } = require('../test-help');
const toSet = require('../../lib/materialize/toSet');

describe('toSet', function () {
  it('should convert generator to set', function () {
    const set = toSet(gen(3));
    expect(set).is.instanceOf(Set);
    expect(set).to.deep.equal(new Set([1, 2, 3]));
  });

  it('should convert Array to set', function () {
    const set = toSet([1, 2, 3]);
    expect(set).is.instanceOf(Set);
    expect(set).to.deep.equal(new Set([1, 2, 3]));
  });

  it('should convert ArrayIterator to set', function () {
    const set = toSet([1, 2, 3][Symbol.iterator]());
    expect(set).is.instanceOf(Set);
    expect(set).to.deep.equal(new Set([1, 2, 3]));
  });

  it('should convert Iterator to set', function () {
    const set = toSet(new Iterator(3));
    expect(set).is.instanceOf(Set);
    expect(set).to.deep.equal(new Set([1, 2, 3]));
  });

  it('should make empty set from finished iterator', function () {
    const set = toSet(new Iterator(0));
    expect(set).is.instanceOf(Set).with.property('size', 0);
  });
});
