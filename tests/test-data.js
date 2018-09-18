const { genArr, Iterable, Iterator } = require('./test-help');

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


function buildCases({ init, keyValueInit, args, keyValueResult, result, keyValueArgs, overrides = {} }) {
  const kvInit = keyValueInit || toKeyValueArray(init);
  const kvArgs = keyValueArgs || args;
  const kvResult = keyValueResult || toKeyValueArray(result);
  const cases = Object.entries(valueProviders)
    .reduce((res, [name, provider]) => {
      const isKeyValueInit = keyValueInitCases.has(name);
      const isKeyValueResult = keyValueResultCases.has(name);
      const overrideCase = overrides[name] || {};
      return [
        ...res,
        {
          name,
          value: overrideCase.value || provider(isKeyValueInit ? kvInit : init),
          args: overrideCase.args || isKeyValueResult ? kvArgs : args,
          result: overrideCase.result || isKeyValueResult ? kvResult : result
        }
      ];
    }, []);
  return cases;
}

module.exports = exports = {
  buildCases,
  toKeyValueArray
};
