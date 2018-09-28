const { buildCases, toKeyValueArray } = require('../core');
const toSet = require('../../../lib/materialize/toSet');

const withoutSelector = {
  suiteName: 'without selector',
  testNameProvider: name => `should build Set from ${name}`,
  testCases: buildCases({
    init: [1, 2],
    result: new Set([1, 2]),
    keyValueResult: new Set(toKeyValueArray([1, 2])),
    args: []
  })
};


module.exports = exports = {
  method: toSet,
  suites: [
    withoutSelector
  ]
};
