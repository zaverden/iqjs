const SelfIterable = require('../selfIterable');
const { ensureIterator } = require('../helpers');

class TakeWhileIterator extends SelfIterable {
  constructor(source, predicate) {
    super();
    this.source = source;
    this.predicate = predicate;
    this.index = 0;
  }

  next() {
    let { done, value, index } = this._getNext();
    if (!done && this.predicate(value, index)) {
      return { value, done };
    }
    return { done: true };
  }

  _getNext() {
    const { done, value } = this.source.next();
    return { done, value, index: this.index++ };
  }
}

function takeWhile(source, predicate) {
  const iterator = new TakeWhileIterator(ensureIterator(source), predicate);
  return iterator;
}

module.exports = exports = takeWhile;
module.exports.key = Symbol.for('IQ.takeWhile');
