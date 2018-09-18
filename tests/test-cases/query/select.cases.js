const { buildCases } = require('../core');
const select = require('../../../lib/query/select');


const doublingValue = {
  suiteName: 'doubling value',
  testNameProvider: name => `should convert values of ${name}`,
  testCases: buildCases({
    init: [1, 2, 3, 4],
    args: [i => i * 2],
    keyValueArgs: [([k, v]) => [k * 2, v * 2]],
    result: [2, 4, 6, 8]
  })
};

module.exports = exports = {
  method: select,
  suites: [
    doublingValue
  ]
};
