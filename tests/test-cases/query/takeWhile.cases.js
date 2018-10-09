const { buildCases } = require('../core');
const takeWhile = require('../../../lib/query/takeWhile');

const untilFirstOdd = {
  suiteName: 'until first odd',
  testNameProvider: name => `should take values of ${name} before first odd`,
  testCases: buildCases({
    init: [2, 4, 3, 4, 5],
    args: [v => v % 2 === 0],
    keyValueArgs: [([v]) => v % 2 === 0],
    result: [2, 4]
  })
};

module.exports = exports = {
  method: takeWhile,
  suites: [
    untilFirstOdd
  ]
};
