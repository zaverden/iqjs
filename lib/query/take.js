const SelfIterable = require('../selfIterable');
const { ensureIterator } = require('../helpers');

class TakeIterator extends SelfIterable {
  constructor(source, count) {
    super();
    this.source = source;
    this.count = count;
    this.index = 0;
  }

  next() {
    if (this.index >= this.count) {
      return { done: true };
    }
    let { done, value } = this._getNext();
    return { value, done };
  }

  _getNext() {
    const { done, value } = this.source.next();
    return { done, value, index: this.index++ };
  }
}

function take(source, count) {
  const iterator = new TakeIterator(ensureIterator(source), count);
  return iterator;
}

module.exports = exports = take;
module.exports.key = Symbol.for('IQ.take');
