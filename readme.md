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
Signature: `where<T>(source: Iterator<T>, predicate: (item: T) => boolean) => Iterator<T>`

Filters `source` iterator by `predicate`.

Basic example:
`where(personsArray, p => p.age > 18);`

Embedded example:
`personsArray.where(p => p.age > 18);`


### select
Signature: `select<T, TResult>(source: Iterator<T>, predicate: (item: T) => TResult) => Iterator<TResult>`

Converts items from `source` using `selector`.

Basic example:
`select(personsArray, p => p.id);`

Embedded example:
`personsArray.select(p => p.id);`

### toArray
Signature: `toArray<T>(source: Iterator<T>) => T[]`

Materialize iterator to `Array`.

Basic example:
`toArray(personsQuery);`

Embedded example:
`personsQuery.toArray();`