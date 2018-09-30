const { buildCases } = require('../core');
const where = require('../../../lib/query/where');

const evenValues = {
  suiteName: 'even values',
  testNameProvider: name => `should filter values of ${name} by even values`,
  testCases: buildCases({
    init: [1, 2, 3, 4],
    args: [i => i % 2 === 0],
    keyValueArgs: [([k]) => k % 2 === 0],
    result: [2, 4]
  })
};
const evenIndexes = {
  suiteName: 'even indexes',
  testNameProvider: name => `should filter values of ${name} by even indexes`,
  testCases: buildCases({
    init: [1, 2, 3, 4],
    args: [(v, i) => i % 2 === 0],
    result: [1, 3]
  })
};

module.exports = exports = {
  method: where,
  suites: [
    evenValues,
    evenIndexes
  ]
};
