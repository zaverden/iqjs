const { expect } = require('chai');
const { genArr, Iterable, Iterator } = require('../test-help');
const embed = require('../../lib/embed');

const toKeyValueArray = arr => arr.map(i => [i, i]);

const keyValueInitCases = new Set(['Map', 'Map[Symbol.iterator]()', 'Map.keys()', 'Map.values()', 'Map.entries()']);
const keyValueResultCases = new Set(['Set.entries()', 'Map', 'Map[Symbol.iterator]()', 'Map.entries()']);

const valueProviders = {
  'Custom Iterable': init => new Iterable(init),
  'Custom Iterator': init => new Iterator(init),
  'Generator': init => genArr(init),
  'Array': init => [...init],
  'Array[Symbol.iterator]()': init => [...init][Symbol.iterator](),
  'Set': init => new Set(init),
  'Set[Symbol.iterator]()': init => new Set(init)[Symbol.iterator](),
  'Set.keys()': init => new Set(init).keys(),
  'Set.values()': init => new Set(init).values(),
  'Set.entries()': init => new Set(init).entries(),
  'Map': init => new Map(init),
  'Map[Symbol.iterator]()': init => new Map(init)[Symbol.iterator](),
  'Map.keys()': init => new Map(init).keys(),
  'Map.values()': init => new Map(init).values(),
  'Map.entries()': init => new Map(init).entries(),
};

const groups = {
  'Custom Iterable': 'custom',
  'Custom Iterator': 'custom',
  'Generator': 'generator',
  'Array': 'array',
  'Array[Symbol.iterator]()': 'array',
  'Set': 'set',
  'Set[Symbol.iterator]()': 'set',
  'Set.keys()': 'set',
  'Set.values()': 'set',
  'Set.entries()': 'set',
  'Map': 'map',
  'Map[Symbol.iterator]()': 'map',
  'Map.keys()': 'map',
  'Map.values()': 'map',
  'Map.entries()': 'map'
};


function buildCases({ init, keyValueInit, args, keyValueResult, result, keyValueArgs, overrides, skip }) {
  const kvInit = keyValueInit || toKeyValueArray(init);
  const kvArgs = keyValueArgs || args;
  const kvResult = keyValueResult || toKeyValueArray(result);
  overrides = overrides || (() => ({}));
  skip = skip || (() => false);
  const cases = Object.entries(valueProviders)
    .reduce((res, [name, provider]) => {
      const group = groups[name];
      if (skip({ name, group })) {
        return res;
      }
      const isKeyValueInit = keyValueInitCases.has(name);
      const isKeyValueResult = keyValueResultCases.has(name);
      const overrideCase = overrides({
        name,
        group,
        provider,
        init: isKeyValueInit ? kvInit : init,
        args: isKeyValueResult ? kvArgs : args,
        result: isKeyValueResult ? kvResult : result
      });
      return [
        ...res,
        {
          name,
          group,
          get: () => {
            if (overrideCase.valueFn) {
              return overrideCase.valueFn();
            }
            if (overrideCase.value) {
              return overrideCase.value;
            }
            return provider(isKeyValueInit ? kvInit : init);
          },
          args: () => {
            if (overrideCase.argsFn) {
              return overrideCase.argsFn();
            }
            if (overrideCase.args) {
              return overrideCase.args;
            }
            return isKeyValueResult ? kvArgs : args;
          },
          result: overrideCase.result || (isKeyValueResult ? kvResult : result)
        }
      ];
    }, []);
  return cases;
}

function describeMethod(cases, checkResultFn) {
  describe(cases.method.name, function () {
    it('should have a symbol key', function () {
      const { method } = cases;
      expect(method).to.have.property('key');
      expect(method.key).to.be.a('symbol');
      expect(Symbol.keyFor(method.key)).to.be.equal(`IQ.${method.name}`);
    });
    describeBasicUsage(cases, checkResultFn);
    describeEmbeddedUsage(cases, checkResultFn);
  });
}

function describeBasicUsage({ method, suites }, checkResultFn) {
  describe('basic usage', function () {
    for (const { testCases, suiteName, testNameProvider } of suites) {
      describeBasicUsageSuite({
        method,
        testCases,
        suiteName,
        testNameProvider,
        checkResultFn
      });
    }
  });
}

function describeBasicUsageSuite({ method, testCases, suiteName, testNameProvider, checkResultFn }) {
  describe(suiteName, function () {
    for (let { name, get, args, result } of testCases) {
      it(testNameProvider(name), function () {
        const actual = method(get(), ...args());
        checkResultFn(actual, result);
      });
    }
  });
}

function describeEmbeddedUsage({ method, suites }, checkResultFn) {
  describe('embedded usage', function () {
    afterEach(function () {
      embed.revert();
    });
    describeEmbeddedCheck({ method, suite: suites[0] });
    for (const { testCases, suiteName, testNameProvider } of suites) {
      describeEmbeddedUsageSuite({
        method,
        testCases,
        suiteName,
        testNameProvider,
        checkResultFn,
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

function describeEmbeddedUsageSuite({ method, testCases, suiteName, testNameProvider, checkResultFn, embedFn }) {
  describe(suiteName, function () {
    for (let { name, get, args, result } of testCases) {
      it(testNameProvider(name), function () {
        embedFn();
        const actual = get()[method.name](...args());
        checkResultFn(actual, result);
      });
    }
  });
}

module.exports = exports = {
  buildCases,
  toKeyValueArray,
  describeMethod
};
