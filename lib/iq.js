const { embedToIterableClass, embedToGenerators, selfEmbed } = require('./embed');

module.exports = exports = {
  embed
};

function embed() {
  selfEmbed();
  embedToGenerators();
  embedToIterableClass(Array);
  embedToIterableClass(Set);
  embedToIterableClass(Map);
}
