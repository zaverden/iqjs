const { expect } = require('chai');
const { gen, Iterator } = require('../test-help');
const toArray = require('../../lib/materialize/toArray');

describe('toArray', function () {
  it('should convert generator to array', function () {
    const array = toArray(gen(3));
    expect(array).is.instanceOf(Array);
    expect(array).to.deep.equal([1, 2, 3]);
  });

  it('should convert Set to array', function () {
    const array = toArray(new Set([1, 2, 3]));
    expect(array).is.instanceOf(Array);
    expect(array).to.deep.equal([1, 2, 3]);
  });

  it('should convert SetIterator to array', function () {
    const array = toArray(new Set([1, 2, 3]).values());
    expect(array).is.instanceOf(Array);
    expect(array).to.deep.equal([1, 2, 3]);
  });

  it('should make empty array from finished iterator', function () {
    const array = toArray(new Iterator(0));
    expect(array).is.instanceOf(Array).with.lengthOf(0);
  });
});
