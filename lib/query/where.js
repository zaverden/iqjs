const SelfIterable = require('../selfIterable');
const { ensureIterator } = require('../helpers');

class WhereIterator extends SelfIterable {
  constructor(source, predicate) {
    super();
    this.source = source;
    this.predicate = predicate;
  }

  next() {
    let { done, value } = this.source.next();
    while (!done) {
      if (this.predicate(value)) {
        return { done, value };
      }
      ({ done, value } = this.source.next());
    }
    return { done };
  }
}

function where(source, predicate) {
  const iterator = new WhereIterator(ensureIterator(source), predicate);
  return iterator;
}

module.exports = exports = where;
module.exports.key = Symbol.for('IQ.where');
