function ensureIterable(source) {
  const iterable = source[Symbol.iterator]
    ? source
    : { [Symbol.iterator]: () => source };
  return iterable;
}

function ensureIterator(source) {
  const iterator = source[Symbol.iterator]
    ? source[Symbol.iterator]()
    : source;
  return iterator;
}

function self(value) {
  return value;
}

module.exports = exports = {
  ensureIterable,
  ensureIterator,
  self
};
