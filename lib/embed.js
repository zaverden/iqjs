const SelfIterable = require('./selfIterable');
const iq = require('./iq');

module.exports = exports = embed;
module.exports.toIterator = embedToIterator;
module.exports.toIterableClass = embedToIterableClass;
module.exports.toGenerators = embedToGenerators;
module.exports.self = selfEmbed;

const methods = Object.values(iq);
const embedded = new Set();

/** Embeds IQ methods into generators */
function embed() {
  selfEmbed();
  embedToGenerators();
  embedToIterableClass(Array);
  embedToIterableClass(Set);
  embedToIterableClass(Map);
}

function embedToIterator(prototype, silent = true) {
  if (!checkEmbedded(prototype, silent)) {
    return false;
  }
  methods.forEach(method => {
    Object.defineProperty(prototype, method.name, {
      enumerable: false,
      value: function (...args) {
        return method(this, ...args);
      }
    });
  });
  embedded.add(prototype);
  return true;
}

/**
 * Embeds IQ methods into a passed class.
 * The class must implement iterable protocol.
 */
function embedToIterableClass($class, silent = true) {
  if (!checkEmbedded($class, silent)) {
    return false;
  }
  const instance = new $class();
  const iterator = instance[Symbol.iterator]();
  if (instance === iterator) {
    embedToIterator($class);
    return;
  }
  embedToIterator(iterator.__proto__);
  for (let method of methods) {
    Object.defineProperty($class.prototype, method.name, {
      enumerable: false,
      value: function (...args) {
        return method(this[Symbol.iterator](), ...args);
      }
    });
  }
  embedded.add($class);
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
