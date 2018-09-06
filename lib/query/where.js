const SelfIterable = require('../selfIterable');

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
        return { done: false, value };
      }
      ({ done, value } = this.source.next());
    }
    return { done: true };
  }
}

function where(source, predicate) {
  const iterator = new WhereIterator(source, predicate);
  return iterator;
}

module.exports = exports = where;
