const { describeMethod } = require('./test-cases/core');
const { expectIterator } = require('./test-help');

const iqTests = [
  require('./test-cases/query/distinct.cases'),
  require('./test-cases/query/select.cases'),
  require('./test-cases/query/where.cases'),
  require('./test-cases/query/concat.cases'),
  require('./test-cases/query/skip.cases'),
  require('./test-cases/query/take.cases'),
];

describe('Queries', function () {
  for (const cases of iqTests) {
    describeMethod(cases, expectIterator);
  }
});
