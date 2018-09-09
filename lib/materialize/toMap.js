const { ensureIterable, ensureIterator, self } = require('../helpers');
const select = require('../query/select');

function toMap(source, keySelector = null, valueSelector = null) {
  if (keySelector === null) {
    return new Map(ensureIterable(source));
  }
  if (valueSelector === null) {
    valueSelector = self;
  }
  return new Map(select(ensureIterator(source), item => [keySelector(item), valueSelector(item)]));
}

module.exports = exports = toMap;
module.exports.key = Symbol.for('IQ.toMap');
