const { expect } = require('chai');
const { gen, Iterator } = require('../test-help');
const aggregate = require('../../lib/materialize/aggregate');

describe('aggregate', function () {
  it('should aggregate generator values', function () {
    const it = gen(3);
    const res = aggregate(it, 10, (r, i) => r + i);
    expect(res).to.equal(16);
  });

  it('should aggregate Set values', function () {
    const it = new Set([1, 2, 3]);
    const res = aggregate(it, 10, (r, i) => r + i);
    expect(res).to.equal(16);
  });

  it('should aggregate Set Iterator values', function () {
    const it = new Set([1, 2, 3]).values();
    const res = aggregate(it, 10, (r, i) => r + i);
    expect(res).to.equal(16);
  });

  it('should works if passed fn only', function () {
    const it = new Set([1, 2, 3]);
    const res = aggregate(it, (r, i) => r + i);
    expect(res).to.equal(6);
  });

  it('should works if seed skipped', function () {
    const it = new Set([1, 2, 3]);
    const res = aggregate(it, (r, i) => r + i, r => r * 2);
    expect(res).to.equal(12);
  });

  it('should works for Iterator if seed skipped', function () {
    const it = new Iterator(3);
    const res = aggregate(it, (r, i) => r + i, r => r * 2);
    expect(res).to.equal(12);
  });
});
