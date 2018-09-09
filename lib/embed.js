const SelfIterable = require('./selfIterable');
const iq = require('./iq');
const iqKey = Symbol.for('IQ method');

module.exports = exports = embed;
module.exports.toIterator = embedToIterator;
module.exports.toIterableClass = embedToIterableClass;
module.exports.toGenerators = embedToGenerators;
module.exports.self = selfEmbed;
module.exports.revert = revert;
module.exports.iqKey = iqKey;

const methods = Object.values(iq);
const embedded = new Set();

/** Embeds IQ methods into generators */
function embed(silent = true) {
  const res = [
    selfEmbed(silent),
    embedToGenerators(silent),
    embedToIterableClass(Array, silent),
    embedToIterableClass(Set, silent),
    embedToIterableClass(Map, silent)
  ];
  return res.reduce((prev, curr) => prev && curr, true);
}

function embedToIterator(prototype, silent = true) {
  if (!checkEmbedded(prototype, silent)) {
    return false;
  }
  methods.forEach(method => {
    const { name, key } = method;
    const fn = function (...args) {
      return method(this, ...args);
    };
    fn[iqKey] = key;
    define(prototype, name, fn);
  });
  embedded.add(prototype);
  return true;
}

/**
 * Embeds IQ methods into a passed class.
 * The class must implement iterable protocol.
 */
function embedToIterableClass($class, silent = true) {
  if (!checkEmbedded($class.prototype, silent)) {
    return false;
  }
  const instance = new $class();
  const iterator = instance[Symbol.iterator]();
  if (instance === iterator) {
    return embedToIterator($class.prototype, silent);
  }
  embedToIterator(iterator.__proto__, silent);
  for (let method of methods) {
    const { name, key } = method;
    const fn = function (...args) {
      return method(this[Symbol.iterator](), ...args);
    };
    fn[iqKey] = key;
    define($class.prototype, name, fn);
  }
  embedded.add($class.prototype);
  return true;
}

/** Embeds IQ methods into generators. */
function embedToGenerators(silent = true) {
  const genFn = function* () { };
  return embedToIterator(genFn().constructor.prototype, silent);
}

/** Embeds IQ methods into internal IQ iterators. */
function selfEmbed(silent = true) {
  return embedToIterator(SelfIterable.prototype, silent);
}

function checkEmbedded(value, silent) {
  if (!embedded.has(value)) {
    return true;
  }
  if (silent) {
    return false;
  }
  throw new Error('Duplicated embedding.');
}

function revert() {
  for (let prototype of embedded) {
    for (let { name, key } of methods) {
      if (prototype[name][iqKey] === key)
        delete prototype[name];
    }
  }
  embedded.clear();
}

function define(target, name, fn) {
  if (target[name]) {
    return;
  }
  Object.defineProperty(target, name, {
    enumerable: false,
    configurable: true,
    value: fn
  });
}
