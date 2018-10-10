# JS Iterator Queries

Inspired by dotnet LINQ I decided to adopt it to use with ES6 iterators.

## Usage
### Embedding
All methods are implemented as pure functions. And you can always use then as is.

But for convenience and more readable code `jsiq` provides ability to embed methods to native JS iterable classes: `Array`, `Set`, `Map`.
After calling the `embed` method, you can start call `jsiq` methods right from your collections:

```javascript
require('jsiq/lib/embed')();
const personsArray = await loadPersonsAsync();
const underageIterator = personsArray.where(p => p.age < 18);
```

### Chaining
All methods can be chained to build complex queries on your collections:

```javascript
require('jsiq/lib/embed')();
const personsArray = await loadPersonsAsync();
const reportItems = personsArray
    .where(p => p.age > 18)
    .where(p => p.children && p.children.length > 0)
    .select(p => ({
        name: p.name,
        childrenCount: p.children ? p.children.length : 0,
        isMarried: !!(p.wife || p.husband)
    }))
    .orderBy(p => p.childrenCount)
    .toArray();
```

### Basic usage
And you still can use all methods directly by passing iterators:
```javascript
const { where, toArray } = require('jsiq');
const personsMap = getPersonsMap();
const underage = toArray(where(personsMap.values(), p => p.age < 18));
```


## Methods
### where
Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.

Signature:
```typescript
where<T>(
    source: Iterator<T> | Iterable<T>,
    predicate: (item: T, index: Number) => boolean
) => IterableIterator<T>
```

Basic example:
```javascript
const adultsQuery = where(personsArray, p => p.age > 18);
```

Embedded example:
```javascript
const adultsQuery = personsArray.where(p => p.age > 18);
```


### select
Projects each element of a sequence into a new form.

Signature:
```typescript
select<T, TResult>(
    source: Iterator<T> | Iterable<T>,
    predicate: (item: T) => TResult
) => IterableIterator<TResult>
```

Basic example:
```javascript
const idsQuery = select(personsArray, p => p.id);
```

Embedded example:
```javascript
const idsQuery = personsArray.select(p => p.id);
```

### concat
Concatenates two sequences.

Signature:
```typescript
concat<T>(
    source: Iterator<T> | Iterable<T>,
    appendix: Iterator<T> | Iterable<T>
) => IterableIterator<T>
```

Basic example:
```javascript
const personsQuery = concat(childrenQuery, adultsQuery);
```

Embedded example:
```javascript
const personsQuery = childrenQuery.concat(adultsQuery);
```

### distinct
Returns distinct elements from a sequence.

Signatures:
```typescript
distinct<T>(
    source: Iterator<T>
) => IterableIterator<T>

distinct<T, TValue>(
    source: Iterator<T> | Iterable<TSource>,
    selector: (item: T) => TValue
) => IterableIterator<T>
```

Basic example:
```javascript
const studentsQuery = distinct(studentsFromGroups);
const personsWithUniqueName = distinct(persons, p => p.name);
```

Embedded example:
```javascript
const studentsQuery = studentsFromGroups.distinct();
const personsWithUniqueName = persons.distinct(p => p.name);
```

### take
Returns a specified number of contiguous elements from the start of a sequence.

Signature:
```typescript
take<T>(
    source: Iterator<T> | Iterable<T>,
    count: number
) => IterableIterator<T>
```

Basic example:
```javascript
const first2 = take(personsArray, 2);
```

Embedded example:
```javascript
const first2 = personsArray.take(2);
```

### takeWhile
Returns elements from a sequence as long as a specified condition is true.
The element's index is used in the logic of the predicate function.

Signature:
```typescript
takeWhile<T>(
    source: Iterator<T> | Iterable<T>,
    predicate: (item: T, index: Number) => boolean
) => IterableIterator<T>
```

Basic example:
```javascript
const untilFirstFail = takeWhile(attempts, at => at.success);
```

Embedded example:
```javascript
const untilFirstFail = attempts.takeWhile(at => at.success);
```

### skip
Bypasses a specified number of elements in a sequence and then returns the remaining elements

Signature:
```typescript
skip<T>(
    source: Iterator<T> | Iterable<T>,
    count: number
) => IterableIterator<T>
```

Basic example:
```javascript
const excludeFirst2 = skip(personsArray, 2);
```

Embedded example:
```javascript
const excludeFirst2 = personsArray.skip(2);
```

### skipWhile
Bypasses elements in a sequence as long as a specified condition is true and
then returns the remaining elements. The element's index is used in the logic
of the predicate function.

Signature:
```typescript
skipWhile<T>(
    source: Iterator<T> | Iterable<T>,
    predicate: (item: T, index: Number) => boolean
) => IterableIterator<T>
```

Basic example:
```javascript
const afterFirstFail = skipWhile(attempts, at => at.success);
```

Embedded example:
```javascript
const afterFirstFail = attempts.skipWhile(at => at.success);
```

### aggregate
Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.

Signatures:
```typescript
aggregate<TSource>(
    source: Iterator<TSource> | Iterable<TSource>,
    fn: (acc: TSource, item: TSource) => TSource
) => TSource;

aggregate<TSource, TResult>(
    source: Iterator<TSource> | Iterable<TSource>,
    fn: (acc: TSource, item: TSource) => TSource,
    resultSelector: (acc: TSource) => TResult
) => TResult;

aggregate<TSource, TAccumulate>(
    source: Iterator<TSource> | Iterable<TSource>,
    seed: TAccumulate,
    fn: (acc: TAccumulate, item: TSource) => TAccumulate
) => TAccumulate;

aggregate<TSource, TAccumulate, TResult>(
    source: Iterator<TSource> | Iterable<TSource>,
    seed: TAccumulate,
    fn: (acc: TAccumulate, item: TSource) => TAccumulate,
    resultSelector: (acc: TAccumulate) => TResult
) => TResult;
```

Basic example:
```javascript
const sum = aggregate(integers, (sum, i) => sum + i);

const sumSquare = aggregate(integers, (sum, i) => sum + i, sum => sum * sum);

const totalSpent = aggregate(personsQuery, 0, (sum, p) => sum + p.spent);

const avgAge = aggregate(personsQuery,
    { ageSum: 0, count: 0 },
    ({ ageSum, count }, p) => ({ ageSum: p.age + ageSum, count: count + 1 }),
    ({ ageSum, count }) => ageSum / count
);
```

Embedded example:
```javascript
const sum = integers.aggregate((sum, i) => sum + i);

const sumSquare = integers.aggregate((sum, i) => sum + i, sum => sum * sum);

const totalSpent = personsQuery.aggregate(0, (sum, p) => sum + p.spent);

const avgAge = personsQuery.aggregate(
    { ageSum: 0, count: 0 },
    ({ ageSum, count }, p) => ({ ageSum: p.age + ageSum, count: count + 1 }),
    ({ ageSum, count }) => ageSum / count
);
```

### toArray
Creates an `Array` from iterator values.

Signature:
```typescript
toArray<T>(source: Iterator<T>) => T[]
```

Basic example:
```javascript
const personsArray = toArray(personsQuery);
```

Embedded example:
```javascript
const personsArray = personsQuery.toArray();
```

### toSet
Creates a `Set` from iterator values.

Signature:
```typescript
toSet<T>(source: Iterator<T>) => Set<T>
```

Basic example:
```javascript
const names = toSet(select(personQuery, p => p.name));
```

Embedded example:
```javascript
const names = personsQuery.select(p => p.name).toSet();
```

### toMap
Creates a `Map` according to a specified key selector function and an value selector function.

Signatures:
```typescript
toMap<TKey, TValue>(source: Iterator<[TKey, TValue]>) => Map<TKey, TValue>

toMap<T, TKey>(
    source: Iterator<T>,
    keySelector: (item: T) => TKey
) => Map<TKey, T>

toMap<T, TKey, TValue>(
    source: Iterator<T>,
    keySelector: (item: T) => TKey,
    valueSelector: (item: T) => TValue
) => Map<TKey, TValue>
```

Basic example:
```javascript
const persons = toMap(personQuery, p => p.id);
const names = toMap(personQuery, p => p.id, p => p.name);
```

Embedded example:
```javascript
const persons = personQuery.toMap(p => p.id);
const names = personQuery.toMap(p => p.id, p => p.name);
```
