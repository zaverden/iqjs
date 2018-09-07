const SelfIterable = require('../lib/selfIterable');

function* gen(n) {
  let i = 0;
  while (i < n) {
    yield ++i;
  }
}

class IterableIterator {
  next() {
    return { done: true };
  }

  [Symbol.iterator]() {
    return this;
  }
}

const valueProviders = {
  gen: { 'generator': () => gen(1) },
  inner: { 'IQ iterator': () => new SelfIterable() },
  array: {
    'Array': () => [],
    'Array[Symbol.iterator]()': () => [][Symbol.iterator]()
  },
  set: {
    'Set': () => new Set(),
    'Set[Symbol.iterator]()': () => new Set()[Symbol.iterator](),
    'Set.keys()': () => new Set().keys(),
    'Set.values()': () => new Set().values(),
    'Set.entries()': () => new Set().entries(),
  },
  map: {
    'Map': () => new Map(),
    'Map[Symbol.iterator]()': () => new Map()[Symbol.iterator](),
    'Map.keys()': () => new Map().keys(),
    'Map.values()': () => new Map().values(),
    'Map.entries()': () => new Map().entries(),
  },
  custom: { 'Custom IterableIterator': () => new IterableIterator() },
};

module.exports = exports = {
  gen,
  IterableIterator,
  valueProviders
};
