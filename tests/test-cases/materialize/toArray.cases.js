const { buildCases } = require('../core');
const toArray = require('../../../lib/materialize/toArray');

const withoutSelector = {
  suiteName: 'without selector',
  testNameProvider: name => `should build Array from ${name}`,
  testCases: buildCases({
    init: [1, 2],
    result: [1, 2],
    args: []
  })
};


module.exports = exports = {
  method: toArray,
  suites: [
    withoutSelector
  ]
};
