const { buildCases, toKeyValueArray } = require('../core');
const aggregate = require('../../../lib/materialize/aggregate');

const byFn = {
  suiteName: 'by fn',
  testNameProvider: name => `should aggregate values of ${name} by fn`,
  testCases: buildCases({
    init: [1, 2, 3],
    result: 6,
    keyValueResult: [6],
    args: [(r, i) => r + i],
    keyValueArgs: [([r], [i]) => [r + i]]
  })
};

const byFnAndResultSelector = {
  suiteName: 'by fn and result selector',
  testNameProvider: name => `should aggregate values of ${name} by fn and result selector`,
  testCases: buildCases({
    init: [1, 2, 3],
    result: 12,
    keyValueResult: 12,
    args: [(r, i) => r + i, r => r * 2],
    keyValueArgs: [([r], [i]) => [r + i], ([r]) => r * 2]
  })
};

const fromSeedByFnAndResultSelector = {
  suiteName: 'from seed by fn and result selector',
  testNameProvider: name => `should aggregate values of ${name} from seed by fn and result selector`,
  testCases: buildCases({
    init: [1, 2, 3],
    result: 32,
    keyValueResult: 32,
    args: [10, (r, i) => r + i, r => r * 2],
    keyValueArgs: [10, (r, [i]) => r + i, r => r * 2]
  })
};


module.exports = exports = {
  method: aggregate,
  suites: [
    byFn,
    byFnAndResultSelector,
    fromSeedByFnAndResultSelector
  ]
};
