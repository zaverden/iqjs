const { expect } = require('chai');
const { expectIterator, Iterable } = require('./test-help');
const embed = require('../lib/embed');

const iqTests = [
  require('./test-cases/query/distinct.cases'),
  require('./test-cases/query/select.cases'),
  require('./test-cases/query/where.cases'),
  require('./test-cases/query/concat.cases'),
];

describe('Queries', function () {
  for (const cases of iqTests) {
    describeMethod(cases);
  }
});

function describeMethod(cases) {
  describe(cases.method.name, function () {
    it('should have a symbol key', function () {
      const { method } = cases;
      expect(method).to.have.property('key');
      expect(method.key).to.be.a('symbol');
      expect(Symbol.keyFor(method.key)).to.be.equal(`IQ.${method.name}`);
    });
    describeBasicUsage(cases);
    describeEmbeddedUsage(cases);
  });
}

function describeBasicUsage({ method, suites }) {
  describe('basic usage', function () {
    for (const { testCases, suiteName, testNameProvider } of suites) {
      describeBasicUsageSuite({
        method,
        testCases,
        suiteName, testNameProvider
      });
    }
  });
}

function describeBasicUsageSuite({ method, testCases, suiteName, testNameProvider }) {
  describe(suiteName, function () {
    for (let { name, get, args, result } of testCases) {
      it(testNameProvider(name), function () {
        const iterator = method(get(), ...args());
        expectIterator(iterator, result);
      });
    }
  });
}

function describeEmbeddedUsage({ method, suites }) {
  describe('embedded usage', function () {
    afterEach(function () {
      embed.revert();
    });
    describeEmbeddedCheck({ method, suite: suites[0] });
    for (const { testCases, suiteName, testNameProvider } of suites) {
      describeEmbeddedUsageSuite({
        method,
        testCases,
        suiteName, testNameProvider,
        embedFn: () => {
          embed();
          embed.toIterableClass(Iterable);
        }
      });
    }
  });
}

function describeEmbeddedCheck({ method, suite }) {
  describeEmbeddedToAll({
    method,
    suite,
    suiteName: 'native embed',
    embedFn: embed,
    filterFn: ({ group }) => group !== 'custom'
  });
  describeEmbeddedToAll({
    method,
    suite,
    suiteName: 'embed to generators',
    embedFn: embed.toGenerators,
    filterFn: ({ group }) => group === 'generator'
  });
  describeEmbeddedToAll({
    method,
    suite,
    suiteName: 'embed to array',
    embedFn: embed.toIterableClass.bind(null, Array),
    filterFn: ({ group }) => group === 'array'
  });
  describeEmbeddedToAll({
    method,
    suite,
    suiteName: 'embed to set',
    embedFn: embed.toIterableClass.bind(null, Set),
    filterFn: ({ group }) => group === 'set'
  });
  describeEmbeddedToAll({
    method,
    suite,
    suiteName: 'embed to map',
    embedFn: embed.toIterableClass.bind(null, Map),
    filterFn: ({ group }) => group === 'map'
  });
  describeEmbeddedToAll({
    method,
    suite,
    suiteName: 'embed to custom iterables and iterators',
    embedFn: embed.toIterableClass.bind(null, Iterable),
    filterFn: ({ group }) => group === 'custom'
  });
}

function describeEmbeddedToAll({ method, suite, suiteName, embedFn, filterFn }) {
  describe(suiteName, function () {
    const testCases = suite.testCases.filter(filterFn);
    for (const { name, get } of testCases) {
      it(`${method.name} should be in ${name}`, function () {
        const obj = get();
        expect(obj).to.not.respondTo(method.name);
        embedFn();
        expect(obj).to.respondTo(method.name);
        expect(obj[method.name]).to.have.property(embed.iqKey, method.key);
      });
    }
  });
}

function describeEmbeddedUsageSuite({ method, testCases, suiteName, testNameProvider, embedFn }) {
  describe(suiteName, function () {
    for (let { name, get, args, result } of testCases) {
      it(testNameProvider(name), function () {
        embedFn();
        const iterator = get()[method.name](...args());
        expectIterator(iterator, result);
      });
    }
  });
}
