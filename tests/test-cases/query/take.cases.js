const { buildCases } = require('../core');
const take = require('../../../lib/query/take');

const evenValues = {
  suiteName: 'first two',
  testNameProvider: name => `should take first two values of ${name}`,
  testCases: buildCases({
    init: [1, 2, 3, 4, 5],
    args: [2],
    result: [1, 2]
  })
};

module.exports = exports = {
  method: take,
  suites: [
    evenValues
  ]
};
