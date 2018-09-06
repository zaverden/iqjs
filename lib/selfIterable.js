module.exports = exports = class SelfIterable {
  [Symbol.iterator]() {
    return this;
  }
};
