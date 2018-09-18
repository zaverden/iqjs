const { genArr, Iterable, Iterator } = require('../test-help');

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

module.exports = exports = {
  buildCases,
  toKeyValueArray
};
