// TResult Aggregate<TSource, TAccumulate, TResult>(
//   this IEnumerable<TSource> source,
//   TAccumulate seed,
//   Func<TAccumulate, TSource, TAccumulate> func,
//   Func<TAccumulate, TResult> resultSelector
const { ensureIterator, ensureIterable } = require('../helpers');

function aggregate(source, seed, fn, resultSelector = null) {
  const it = ensureIterator(source);
  let value = seed;
  switch (arguments.length) {
    case 2:
      fn = seed;
      ({ value } = it.next());
      break;
    case 3:
      if (typeof seed === 'function') {
        resultSelector = fn;
        fn = seed;
        ({ value } = it.next());
      }
      break;
  }

  for (let item of ensureIterable(it)) {
    value = fn(value, item);
  }

  if (resultSelector) {
    return resultSelector(value);
  }
  return value;
}

module.exports = exports = aggregate;
module.exports.key = Symbol.for('IQ.aggregate');
