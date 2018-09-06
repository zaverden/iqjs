const { embed } = require('./iq');
embed();

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const set = new Set(arr);
const map = new Map(arr.map(i => [i, i]));
function* gen() {
  let i = 0;
  while (++i < 10) {
    yield i;
  }
}





const even = i => {
  return i % 2 === 0;
};

const big = i => {
  return i > 6;
};

function* all() {
  console.log('gen');
  yield gen();

  console.log('arr');
  yield arr;

  console.log('arr@@iter');
  yield arr[Symbol.iterator]();

  console.log('set');
  yield set;

  console.log('set@@iter');
  yield set[Symbol.iterator]();

  console.log('set.values');
  yield set.values();

  console.log('map');
  yield map;

  console.log('map.keys');
  yield map.keys();

  console.log('set.values');
  yield map.values();

}
for (let iter of all()) {
  for (let i of iter.where(even).where(big)) {
    console.log(i);
  }
}

function* allArr() {
  console.log('set.entries');
  yield set.entries();

  console.log('map@@iter');
  yield map[Symbol.iterator]();

  console.log('set.entries');
  yield map.entries();

}
for (let iter of allArr()) {
  for (let i of iter
    .where(([, q]) => even(q))
    .where(([, q]) => big(q))) {
    console.log(i);
  }
}
