const { buildCases } = require('../core');
const skipWhile = require('../../../lib/query/skipWhile');

const untilFirstOdd = {
  suiteName: 'until first odd',
  testNameProvider: name => `should skip values of ${name} before first odd`,
  testCases: buildCases({
    init: [2, 4, 3, 6, 5],
    args: [v => v % 2 === 0],
    keyValueArgs: [([v]) => v % 2 === 0],
    result: [3, 6, 5]
  })
};

module.exports = exports = {
  method: skipWhile,
  suites: [
    untilFirstOdd
  ]
};
