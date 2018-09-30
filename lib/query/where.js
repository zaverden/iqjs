const SelfIterable = require('../selfIterable');
const { ensureIterator } = require('../helpers');

class WhereIterator extends SelfIterable {
  constructor(source, predicate) {
    super();
    this.source = source;
    this.predicate = predicate;
    this.index = 0;
  }

  next() {
    let { done, value, index } = this._getNext();
    while (!done) {
      if (this.predicate(value, index)) {
        return { done, value };
      }
      ({ done, value, index } = this._getNext());
    }
    return { done };
  }

  _getNext() {
    const { done, value } = this.source.next();
    return { done, value, index: this.index++ };
  }
}

function where(source, predicate) {
  const iterator = new WhereIterator(ensureIterator(source), predicate);
  return iterator;
}

module.exports = exports = where;
module.exports.key = Symbol.for('IQ.where');
