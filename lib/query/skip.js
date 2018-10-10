const skipWhile = require('./skipWhile');

function skip(source, count) {
  return skipWhile(source, (v, i) => i < count);
}

module.exports = exports = skip;
module.exports.key = Symbol.for('IQ.skip');
