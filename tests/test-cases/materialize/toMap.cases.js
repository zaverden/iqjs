const { buildCases, toKeyValueArray } = require('../core');
const toMap = require('../../../lib/materialize/toMap');

const baseOptions = {
  init: [1, 2],
  result: new Map(toKeyValueArray([1, 2])),
};

const withoutSelector = {
  suiteName: 'without selector',
  testNameProvider: name => `should build Map from ${name}`,
  testCases: buildCases({
    init: toKeyValueArray([1, 2]),
    keyValueInit: toKeyValueArray([1, 2]),
    result: new Map(toKeyValueArray([1, 2])),
    keyValueResult: new Map(toKeyValueArray([1, 2])),
    args: [],
    overrides: ({ name }) => {
      switch (name) {
        case 'Set.entries()':
          return { valueFn: () => new Set([1, 2]).entries() };
        case 'Map.keys()':
          return { valueFn: () => new Map([[[1, 1], 1], [[2, 2], 2]]).keys() };
        case 'Map.values()':
          return { valueFn: () => new Map([[1, [1, 1]], [2, [2, 2]]]).values() };
        default:
          return {};
      }
    }
  })
};

const withKeySelector = {
  suiteName: 'with key selector',
  testNameProvider: name => `should build Map from ${name} by key selector`,
  testCases: buildCases(Object.assign({}, baseOptions, {
    args: [i => i],
    keyValueArgs: [([i]) => i],
    keyValueResult: new Map([[1, [1, 1]], [2, [2, 2]]])
  }))
};

const withKeyValueSelectors = {
  suiteName: 'with key and value selector',
  testNameProvider: name => `should build Map from ${name} by key and value selectors`,
  testCases: buildCases(Object.assign({}, baseOptions, {
    args: [i => i, i => i * 2],
    keyValueArgs: [([i]) => i, ([, i]) => i * 2],
    result: new Map([[1, 2], [2, 4]]),
    keyValueResult: new Map([[1, 2], [2, 4]])
  }))
};

module.exports = exports = {
  method: toMap,
  suites: [
    withoutSelector,
    withKeySelector,
    withKeyValueSelectors
  ]
};
