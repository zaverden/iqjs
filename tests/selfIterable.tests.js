const { expect } = require('chai');
const SelfIterable = require('../lib/selfIterable');

describe('SelfIterable', function () {
  it('should return self from Symbol.iterator', function () {
    const instance = new SelfIterable();
    const iterator = instance[Symbol.iterator]();
    expect(instance).to.be.equal(iterator);
  });
});
