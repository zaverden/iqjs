const SelfIterable = require('../selfIterable');
const { self, ensureIterator } = require('../helpers');

class DistinctIterator extends SelfIterable {
  constructor(source, selector) {
    super();
    this.source = source;
    this.selector = selector || self;
    this.set = new Set();
  }

  next() {
    let { done, value, isNew } = this._getNext();
    while (!done) {
      if (isNew) {
        return { done, value };
      }
      ({ done, value, isNew } = this._getNext());
    }
    return { done };
  }

  _getNext() {
    const { done, value } = this.source.next();
    if (done) {
      return { done };
    }
    const selectedValue = this.selector(value);
    const isNew = !this.set.has(selectedValue);
    if (isNew) {
      this.set.add(selectedValue);
    }
    return { done, value, isNew };
  }
}

function distinct(source, selector) {
  const iterator = new DistinctIterator(ensureIterator(source), selector);
  return iterator;
}

module.exports = exports = distinct;
module.exports.key = Symbol.for('IQ.distinct');
