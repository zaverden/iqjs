const { buildCases } = require('../core');
const where = require('../../../lib/query/where');

const evenValues = {
  suiteName: 'even values',
  testNameProvider: name => `should filter values of ${name}`,
  testCases: buildCases({
    init: [1, 2, 3, 4],
    args: [i => i % 2 === 0],
    keyValueArgs: [([k]) => k % 2 === 0],
    result: [2, 4]
  })
};

module.exports = exports = {
  method: where,
  suites: [
    evenValues
  ]
};
