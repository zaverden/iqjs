const { expect } = require('chai');
const iq = require('../../lib/iq');
const embed = require('../../lib/embed');
const SelfIterable = require('../../lib/selfIterable');
const { gen } = require('../test-help');

describe('embed', function () {
  describe('generators', function () {
    it('should be embedded to generators', function () {
      embed.toGenerators();
      const g = gen(1);
      expectAllMethods(g);
    });

    it('should correctly process repeated embed', function () {
      embed.toGenerators();
      expect(embed.toGenerators()).to.be.false;
      expect(() => embed.toGenerators(false)).to.throw(/Duplicated embedding/);
    });
  });

  describe('inner iterators', function () {
    it('should be embedded to inner iterators', function () {
      embed.self();
      const it = new SelfIterable();
      expectAllMethods(it);
    });

    it('should correctly process repeated embed', function () {
      embed.self();
      expect(embed.self()).to.be.false;
      expect(() => embed.self(false)).to.throw(/Duplicated embedding/);
    });
  });

  describe('collections', function () {
    it('should be embedded to Array', function () {
      embed.toIterableClass(Array);
      const arr = [];
      expectAllMethods(arr);
      expectAllMethods(arr[Symbol.iterator]());
    });

    it('should be embedded to Set', function () {
      embed.toIterableClass(Set);
      const set = new Set();
      expectAllMethods(set);
      expectAllMethods(set[Symbol.iterator]());
      expectAllMethods(set.values());
      expectAllMethods(set.keys());
      expectAllMethods(set.entries());
    });

    it('should be embedded to Map', function () {
      embed.toIterableClass(Map);
      const map = new Map();
      expectAllMethods(map);
      expectAllMethods(map[Symbol.iterator]());
      expectAllMethods(map.values());
      expectAllMethods(map.keys());
      expectAllMethods(map.entries());
    });

    it('should correctly process repeated embed', function () {
      embed.toIterableClass(Array);
      expect(embed.toIterableClass(Array)).to.be.false;
      expect(() => embed.toIterableClass(Array, false)).to.throw(/Duplicated embedding/);
    });
  });
});

function expectAllMethods(obj) {
  for (let method of Object.keys(iq)) {
    expect(obj).has.property(method);
    expect(obj[method]).to.be.a('function');
  }
}
