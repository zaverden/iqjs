const where = require('./where');

function skip(source, count) {
  return where(source, (v, i) => count <= i);
}

module.exports = exports = skip;
module.exports.key = Symbol.for('IQ.skip');
