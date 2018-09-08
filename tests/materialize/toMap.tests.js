const { expect } = require('chai');
const { gen, Iterator } = require('../test-help');
const select = require('../../lib/query/select');
const toMap = require('../../lib/materialize/toMap');

describe('toMap', function () {
  it('should convert iterator to map', function () {
    const map = toMap(select(gen(3), i => [i, i]));
    expect(map).is.instanceOf(Map);
    expect(map).to.deep.equal(new Map([[1, 1], [2, 2], [3, 3]]));
  });

  it('should convert iterator to map with key selector', function () {
    const map = toMap(new Iterator(3), i => i);
    expect(map).is.instanceOf(Map);
    expect(map).to.deep.equal(new Map([[1, 1], [2, 2], [3, 3]]));
  });

  it('should convert iterator to map with key and value selectors', function () {
    const map = toMap(new Iterator(3), i => i, i => i * 2);
    expect(map).is.instanceOf(Map);
    expect(map).to.deep.equal(new Map([[1, 2], [2, 4], [3, 6]]));
  });

  it('should make empty map from finished iterator', function () {
    const map = toMap({ next: () => ({ done: true }) });
    expect(map).is.instanceOf(Map).with.property('size', 0);
  });
});
