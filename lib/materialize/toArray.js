const { ensureIterable } = require('../helpers');

function toArray(source) {
  return Array.from(ensureIterable(source));
}

module.exports = exports = toArray;
module.exports.key = Symbol.for('IQ.toArray');
