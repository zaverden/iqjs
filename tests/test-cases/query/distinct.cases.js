const { buildCases } = require('../core');
const distinct = require('../../../lib/query/distinct');

const withoutSelector = {
  suiteName: 'without selector',
  testNameProvider: name => `should distinct values of ${name}`,
  testCases: buildCases({
    init: [1, 1, 2, 2],
    result: [1, 2],
    args: []
  })
};

const withSelector = {
  suiteName: 'with selector',
  testNameProvider: name => `should distinct values of ${name} by selector`,
  testCases: buildCases({
    init: [1, 2, 3, 4],
    args: [i => i % 2],
    keyValueArgs: [([k]) => k % 2],
    result: [1, 2]
  })
};

module.exports = exports = {
  method: distinct,
  suites: [
    withoutSelector,
    withSelector
  ]
};
