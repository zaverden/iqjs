const { ensureIterable } = require('../helpers');

function toSet(source) {
  return new Set(ensureIterable(source));
}

module.exports = exports = toSet;
module.exports.key = Symbol.for('IQ.toSet');
