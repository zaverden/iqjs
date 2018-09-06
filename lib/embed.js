const SelfIterable = require('./selfIterable');
const methods = [
  require('./query/select'),
  require('./query/where'),
  require('./materialize/toArray'),
];

module.exports = exports = {
  embedToIterator,
  embedToIterableClass,
  embedToGenerators,
  selfEmbed
};

function embedToIterator(prototype) {
  methods.forEach(method => {
    Object.defineProperty(prototype, method.name, {
      enumerable: false,
      value: function (...args) {
        const source = this;
        return method(source, ...args);
      }
    });
  })
}

function embedToIterableClass($class) {
  const instance = new $class();
  const iterator = instance[Symbol.iterator]();
  if (instance === iterator) {
    embedToIterator($class);
    return;
  }
  embedToIterator(iterator.__proto__);
  for (let method of methods) {
    Object.defineProperty($class.prototype, method.name, {
      value: function (...args) {
        const iterable = this;
        const source = iterable[Symbol.iterator]();
        return method(source, ...args);
      }
    });
  }

}

function embedToGenerators() {
  const genFn = function* () { };
  embedToIterator(genFn().constructor.prototype);
}

function selfEmbed() {
  embedToIterator(SelfIterable.prototype);
}
