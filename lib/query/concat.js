const SelfIterable = require('../selfIterable');
const { ensureIterator } = require('../helpers');

class ConcatIterator extends SelfIterable {
  constructor(source, appendix) {
    super();
    this.source = source;
    this.appendix = appendix;
    this.sourceIsDone = false;
  }

  next() {
    if (!this.sourceIsDone) {
      const sourceItem = this.source.next();
      if (!sourceItem.done) {
        return sourceItem;
      }
      this.sourceIsDone = true;
      this.appendixIterator = ensureIterator(this.appendix);
    }
    return this.appendixIterator.next();
  }
}

function concat(source, appendix) {
  const iterator = new ConcatIterator(source, appendix);
  return iterator;
}

module.exports = exports = concat;
module.exports.key = Symbol.for('IQ.concat');
