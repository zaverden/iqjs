function ensureIterable(source) {
  const iterable = source[Symbol.iterator]
    ? source
    : { [Symbol.iterator]: () => source };
  return iterable;
}

function self(value) {
  return value;
}

module.exports = exports = {
  ensureIterable,
  self
};
