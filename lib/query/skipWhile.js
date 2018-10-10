const SelfIterable = require('../selfIterable');
const { ensureIterator } = require('../helpers');

class TakeWhileIterator extends SelfIterable {
  constructor(source, predicate) {
    super();
    this.source = source;
    this.predicate = predicate;
    this.index = 0;
    this.touched = false;
  }

  next() {
    let { done, value, index } = this._getNext();
    if (this.touched) {
      return { done, value };
    }
    while (!done && this.predicate(value, index)) {
      ({ done, value, index } = this._getNext());
    }
    this.touched = true;
    return { done, value };
  }

  _getNext() {
    const { done, value } = this.source.next();
    return { done, value, index: this.index++ };
  }
}

function skipWhile(source, predicate) {
  const iterator = new TakeWhileIterator(ensureIterator(source), predicate);
  return iterator;
}

module.exports = exports = skipWhile;
module.exports.key = Symbol.for('IQ.skipWhile');
