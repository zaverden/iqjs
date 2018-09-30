const { buildCases } = require('../core');
const skip = require('../../../lib/query/skip');

const evenValues = {
  suiteName: 'first two',
  testNameProvider: name => `should skip first 2 values of ${name}`,
  testCases: buildCases({
    init: [1, 2, 3, 4, 5],
    args: [2],
    result: [3, 4, 5]
  })
};

module.exports = exports = {
  method: skip,
  suites: [
    evenValues
  ]
};
