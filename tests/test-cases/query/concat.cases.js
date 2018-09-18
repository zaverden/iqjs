const { buildCases } = require('../core');
const concat = require('../../../lib/query/concat');

const toSameClass = {
  suiteName: 'same class',
  testNameProvider: name => `should concat values of ${name}`,
  testCases: buildCases({
    init: [1, 2],
    result: [1, 2, 1, 2],
    overrides: ({ provider, init }) => ({ argsFn: () => [provider(init)]}),
    skip: ({ name }) => name === 'Array'
  })
};

module.exports = exports = {
  method: concat,
  suites: [
    toSameClass
  ]
};
