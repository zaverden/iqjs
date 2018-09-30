const where = require('./where');

function take(source, count) {
  return where(source, (v, i) => i < count);
}

module.exports = exports = take;
module.exports.key = Symbol.for('IQ.take');
