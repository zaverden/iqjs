const { expect } = require('chai');
const iq = require('../../lib/iq');
const embed = require('../../lib/embed');
const { IterableIterator, valueProviders } = require('../test-help');

describe('embed', function () {
  afterEach(function () {
    embed.revert();
  });

  describe('all', function () {
    describe('should embed to native', function () {
      const { custom, ...native } = valueProviders;
      buildExpectAllMethodsExistSuite(embed, getAllValueProviders(native));
      buildExpectAllMethodsMissedSuite(embed, custom);
    });

    describe('should revert', function () {
      buildExpectAllMethodsMissedSuite(() => {
        embed();
        embed.toIterableClass(IterableIterator);
        embed.revert();
      }, getAllValueProviders());
    });
  });

  describe('generators', function () {
    buildExpectAllMethodsExistSuite(embed.toGenerators, valueProviders.gen);
  });

  describe('inner IQ iterators', function () {
    buildExpectAllMethodsExistSuite(embed.self, valueProviders.inner);
  });

  describe('Arrays', function () {
    buildExpectAllMethodsExistSuite(embed.toIterableClass.bind(null, Array), valueProviders.array);
  });

  describe('Set', function () {
    buildExpectAllMethodsExistSuite(embed.toIterableClass.bind(null, Set), valueProviders.set);
  });

  describe('Map', function () {
    buildExpectAllMethodsExistSuite(embed.toIterableClass.bind(null, Map), valueProviders.map);

  });

  describe('Custom IterableIterator', function () {
    buildExpectAllMethodsExistSuite(embed.toIterableClass.bind(null, IterableIterator), valueProviders.custom);
  });
});

function buildExpectAllMethodsExistSuite(embedFn, getFns, prefix = '') {
  for (let { name: method, key } of Object.values(iq)) {
    for (let [title, getFn] of Object.entries(getFns)) {
      it(`${prefix}IQ.${method} should be in ${title}`, function () {
        embedFn();
        const obj = getFn();
        expect(obj).has.property(method);
        expect(obj[method]).to.be.a('function');
        expect(obj[method]).has.property(embed.iqKey, key);
      });
    }
  }
  it('should correctly process repeated embed', checkRepeatedEmbed(embedFn));
}


function buildExpectAllMethodsMissedSuite(embedFn, getFns) {
  for (let { name: method } of Object.values(iq)) {
    for (let [title, getFn] of Object.entries(getFns)) {
      it(`IQ.${method} should not be in ${title}`, function () {
        this.timeout(100000);
        embedFn();
        const obj = getFn();
        if (obj[method]) {
          expect(obj[method]).does.not.have.property(embed.iqKey);
        }
      });
    }
  }
}

function checkRepeatedEmbed(embedFn) {
  return () => {
    expect(embedFn()).to.be.true;
    expect(embedFn()).to.be.false;
    expect(() => embedFn(false)).to.throw(/Duplicated embedding/);
  };
}

function getAllValueProviders(vp) {
  return Object.assign({}, ...Object.values(vp || valueProviders));
}
