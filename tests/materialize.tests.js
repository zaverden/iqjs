const { expect } = require('chai');
const { describeMethod } = require('./test-cases/core');

const iqTests = [
  require('./test-cases/materialize/aggregate.cases'),
  require('./test-cases/materialize/toArray.cases'),
  require('./test-cases/materialize/toMap.cases'),
  require('./test-cases/materialize/toSet.cases')
];

describe('Materialize', function () {
  for (const cases of iqTests) {
    describeMethod(cases, expectValue);
  }
});

function expectValue(actual, expected) {
  expect(actual.__proto__).to.be.equal(expected.__proto__);
  expect(actual).to.deep.equal(expected);
}
