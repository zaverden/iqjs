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
Filters `source` iterator by `predicate`.

Signature:
```typescript
where<T>(
    source: Iterator<T>,
    predicate: (item: T) => boolean
) => IterableIterator<T>
```

Basic example:
```javascript
where(personsArray, p => p.age > 18);
```

Embedded example:
```javascript
personsArray.where(p => p.age > 18);
```


### select
Converts items from `source` using `selector`.

Signature:
```typescript
select<T, TResult>(
    source: Iterator<T>,
    predicate: (item: T) => TResult
) => IterableIterator<TResult>
```

Basic example:
```javascript
select(personsArray, p => p.id);
```

Embedded example:
```javascript
personsArray.select(p => p.id);
```

### concat
Concats 2 iterators.

Signature:
```javascript
concat<T>(
    source: Iterator<T>,
    appendix: Iterator<T> | Iterable<T>
) => IterableIterator<T>
```

Basic example:
```javascript
concat(childrenQuery, adultsQuery);
```

Embedded example:
```javascript
childrenQuery.concat(adultsQuery);
```


### toArray
Create `Array` from iterator values.

Signature:
```javascript
toArray<T>(source: Iterator<T>) => T[]
```

Basic example:
```javascript
toArray(personsQuery);
```

Embedded example:
```javascript
personsQuery.toArray();
```

### toSet
Create `Set` from iterator values.

Signature:
```javascript
toSet<T>(source: Iterator<T>) => Set<T>
```

Basic example:
```javascript
toSet(select(personQuery, p => p.name));
```

Embedded example:
```javascript
personsQuery.select(p => p.name).toSet();
```

### toMap
Create `Map` from iterator values.

Signature:
```typescript
toMap<TKey, TValue>(source: Iterator<[TKey, TValue]>) => Map<TKey, TValue>
```
Signature with selectors:
```typescript
toMap<T, TKey, TValue>(
    source: Iterator<T>,
    keySelector: (item: T) => TKey,
    ?valueSelector: (item: T) => TValue
) => Map<TKey, TValue>
```

Basic example:
```javascript
toMap(personQuery, p => p.id); // map of persons
toMap(personQuery, p => p.id, p => p.name); // map of names
```

Embedded example:
```javascript
personQuery.toMap(p => p.id); // map of persons
personQuery.toMap(p => p.id, p => p.name); // map of names
```
