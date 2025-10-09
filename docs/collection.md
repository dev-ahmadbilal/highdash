# Collection Functions

Functions for working with collections (arrays and objects). These utilities provide powerful data transformation, filtering, and organization capabilities.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`keyBy`](#keyby) | Creates object keyed by iteratee | `collection`, `iteratee` | Object with keys from iteratee |
| [`indexBy`](#indexby) | Creates object indexed by iteratee | `collection`, `iteratee` | Object indexed by iteratee |
| [`partition`](#partition) | Splits into two groups | `collection`, `predicate` | Array of [truthy, falsy] groups |
| [`mapValues`](#mapvalues) | Maps object values | `object`, `iteratee` | New object with mapped values |
| [`pick`](#pick) | Picks object properties | `object`, `paths` | New object with picked properties |
| [`omit`](#omit) | Omits object properties | `object`, `paths` | New object without omitted properties |
| [`pickBy`](#pickby) | Picks properties by predicate | `object`, `predicate` | New object with picked properties |
| [`omitBy`](#omitby) | Omits properties by predicate | `object`, `predicate` | New object without omitted properties |
| [`countBy`](#countby) | Counts elements by iteratee | `collection`, `iteratee` | Object with counts |
| [`countByToMap`](#countbytomap) | Counts elements to Map | `collection`, `iteratee` | Map with counts |
| [`orderBy`](#orderby) | Orders collection | `collection`, `iteratees?`, `orders?` | New sorted array |
| [`groupToMap`](#grouptomap) | Groups to Map | `collection`, `iteratee` | Map with groups |
| [`findLast`](#findlast) | Finds last matching element | `collection`, `predicate` | Last matching element or undefined |
| [`reject`](#reject) | Filters out matching elements | `collection`, `predicate` | New array without rejected elements |
| [`sample`](#sample) | Gets random element | `collection` | Random element |
| [`sampleSize`](#samplesize) | Gets random sample | `collection`, `n?` | New array of random elements |
| [`shuffle`](#shuffle) | Shuffles collection | `collection` | New shuffled array |
| [`size`](#size) | Gets collection size | `collection` | Size number |

---

## `keyBy(collection, iteratee)`

Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`. The corresponding value of each key is the last element responsible for generating the key.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratee` (Function|string): The iteratee to transform keys

### Returns

Object with keys generated from iteratee

### Examples

```typescript
import { keyBy } from 'highdash';

const users = [
  { id: 1, name: 'Alice', department: 'Engineering' },
  { id: 2, name: 'Bob', department: 'Marketing' },
  { id: 3, name: 'Charlie', department: 'Engineering' }
];

// Key by property
console.log(keyBy(users, 'id'));
// => { '1': { id: 1, name: 'Alice', department: 'Engineering' }, ... }

console.log(keyBy(users, 'department'));
// => { 'Engineering': { id: 3, name: 'Charlie', department: 'Engineering' }, 'Marketing': { id: 2, name: 'Bob', department: 'Marketing' } }

// Key by function
console.log(keyBy(users, user => user.name.toLowerCase()));
// => { 'alice': { id: 1, name: 'Alice', department: 'Engineering' }, ... }

// Key by computed value
console.log(keyBy(users, user => `${user.department}-${user.id}`));
// => { 'Engineering-1': { id: 1, name: 'Alice', department: 'Engineering' }, ... }
```

---

## `indexBy(collection, iteratee)`

Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`. The corresponding value of each key is the first element responsible for generating the key.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratee` (Function|string): The iteratee to transform keys

### Returns

Object indexed by iteratee (first occurrence)

### Examples

```typescript
import { indexBy } from 'highdash';

const users = [
  { id: 1, name: 'Alice', department: 'Engineering' },
  { id: 2, name: 'Bob', department: 'Marketing' },
  { id: 3, name: 'Charlie', department: 'Engineering' }
];

// Index by property
console.log(indexBy(users, 'department'));
// => { 'Engineering': { id: 1, name: 'Alice', department: 'Engineering' }, 'Marketing': { id: 2, name: 'Bob', department: 'Marketing' } }

// Index by function
console.log(indexBy(users, user => user.name.length));
// => { '5': { id: 1, name: 'Alice', department: 'Engineering' }, '3': { id: 2, name: 'Bob', department: 'Marketing' } }
```

---

## `partition(collection, predicate)`

Creates an array of elements split into two groups, the first of which contains elements `predicate` returns truthy for, the second of which contains elements `predicate` returns falsy for.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `predicate` (Function|string): The function invoked per iteration

### Returns

Array of [truthy, falsy] groups

### Examples

```typescript
import { partition } from 'highdash';

const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

// Partition by predicate function
const [active, inactive] = partition(users, user => user.active);
console.log(active);   // [{ name: 'Alice', age: 25, active: true }, { name: 'Charlie', age: 35, active: true }]
console.log(inactive); // [{ name: 'Bob', age: 30, active: false }]

// Partition by property
const [adults, minors] = partition(users, 'active');
console.log(adults); // Active users
console.log(minors); // Inactive users

// Partition numbers
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partition(numbers, n => n % 2 === 0);
console.log(evens); // [2, 4, 6]
console.log(odds);  // [1, 3, 5]
```

---

## `mapValues(object, iteratee)`

Creates an object with the same keys as `object` and values generated by running each own enumerable string keyed property of `object` through `iteratee`.

### Parameters

- `object` (Object): The object to iterate over
- `iteratee` (Function): The function invoked per iteration with (value, key, object)

### Returns

New object with mapped values

### Examples

```typescript
import { mapValues } from 'highdash';

const users = {
  'alice': { name: 'Alice', age: 25 },
  'bob': { name: 'Bob', age: 30 },
  'charlie': { name: 'Charlie', age: 35 }
};

// Map to ages
console.log(mapValues(users, user => user.age));
// => { 'alice': 25, 'bob': 30, 'charlie': 35 }

// Map to names
console.log(mapValues(users, user => user.name));
// => { 'alice': 'Alice', 'bob': 'Bob', 'charlie': 'Charlie' }

// Map with key and value
console.log(mapValues(users, (user, key) => `${key}: ${user.name}`));
// => { 'alice': 'alice: Alice', 'bob': 'bob: Bob', 'charlie': 'charlie: Charlie' }

// Transform values
const scores = { math: 85, english: 92, science: 78 };
console.log(mapValues(scores, score => score >= 80 ? 'Pass' : 'Fail'));
// => { math: 'Pass', english: 'Pass', science: 'Fail' }
```

---

## `pick(object, paths)`

Creates an object composed of the picked `object` properties.

### Parameters

- `object` (Object): The source object
- `paths` (Array): The property paths to pick

### Returns

New object with picked properties

### Examples

```typescript
import { pick } from 'highdash';

const user = { 
  id: 1, 
  name: 'Alice', 
  email: 'alice@example.com', 
  age: 25, 
  department: 'Engineering' 
};

// Pick specific properties
console.log(pick(user, ['name', 'email']));
// => { name: 'Alice', email: 'alice@example.com' }

// Pick with TypeScript type safety
const publicInfo = pick(user, ['name', 'department']);
// Type: { name: string, department: string }

// Pick from nested object
const data = {
  user: { name: 'Alice', age: 25 },
  settings: { theme: 'dark', language: 'en' },
  metadata: { createdAt: '2023-01-01' }
};
console.log(pick(data, ['user', 'settings']));
// => { user: { name: 'Alice', age: 25 }, settings: { theme: 'dark', language: 'en' } }
```

---

## `omit(object, paths)`

Creates an object composed of the own enumerable property paths of `object` that are not omitted.

### Parameters

- `object` (Object): The source object
- `paths` (Array): The property paths to omit

### Returns

New object without omitted properties

### Examples

```typescript
import { omit } from 'highdash';

const user = { 
  id: 1, 
  name: 'Alice', 
  email: 'alice@example.com', 
  password: 'secret123',
  age: 25 
};

// Omit sensitive data
console.log(omit(user, ['password', 'email']));
// => { id: 1, name: 'Alice', age: 25 }

// Omit multiple properties
console.log(omit(user, ['id', 'password']));
// => { name: 'Alice', email: 'alice@example.com', age: 25 }

// Create public profile
const publicProfile = omit(user, ['password', 'email']);
console.log(publicProfile);
// => { id: 1, name: 'Alice', age: 25 }
```

---

## `pickBy(object, predicate)`

Creates an object composed of the own enumerable string keyed properties of `object` that `predicate` returns truthy for.

### Parameters

- `object` (Object): The source object
- `predicate` (Function): The function invoked per property with (value, key)

### Returns

New object with picked properties

### Examples

```typescript
import { pickBy } from 'highdash';

const data = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  isActive: true,
  lastLogin: null,
  score: 0
};

// Pick truthy values
console.log(pickBy(data, value => Boolean(value)));
// => { name: 'Alice', age: 25, email: 'alice@example.com', isActive: true }

// Pick by key pattern
console.log(pickBy(data, (value, key) => key.startsWith('is')));
// => { isActive: true }

// Pick by value type
console.log(pickBy(data, value => typeof value === 'string'));
// => { name: 'Alice', email: 'alice@example.com' }

// Pick non-null values
console.log(pickBy(data, value => value !== null));
// => { name: 'Alice', age: 25, email: 'alice@example.com', isActive: true, score: 0 }
```

---

## `omitBy(object, predicate)`

Creates an object composed of the own enumerable string keyed properties of `object` that `predicate` doesn't return truthy for.

### Parameters

- `object` (Object): The source object
- `predicate` (Function): The function invoked per property with (value, key)

### Returns

New object without omitted properties

### Examples

```typescript
import { omitBy } from 'highdash';

const data = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com',
  isActive: true,
  lastLogin: null,
  score: 0
};

// Omit falsy values
console.log(omitBy(data, value => !Boolean(value)));
// => { name: 'Alice', age: 25, email: 'alice@example.com', isActive: true }

// Omit by key pattern
console.log(omitBy(data, (value, key) => key.startsWith('is')));
// => { name: 'Alice', age: 25, email: 'alice@example.com', lastLogin: null, score: 0 }

// Omit null/undefined values
console.log(omitBy(data, value => value == null));
// => { name: 'Alice', age: 25, email: 'alice@example.com', isActive: true, score: 0 }
```

---

## `countBy(collection, iteratee)`

Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`. The corresponding value of each key is the number of times the key was returned by `iteratee`.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratee` (Function|string): The iteratee to transform keys

### Returns

Object with counts

### Examples

```typescript
import { countBy } from 'highdash';

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' },
  { name: 'Diana', age: 30, department: 'Marketing' }
];

// Count by property
console.log(countBy(users, 'department'));
// => { 'Engineering': 2, 'Marketing': 2 }

console.log(countBy(users, 'age'));
// => { '25': 2, '30': 2 }

// Count by function
console.log(countBy(users, user => user.age > 25 ? 'senior' : 'junior'));
// => { 'junior': 2, 'senior': 2 }

// Count array elements
console.log(countBy([1, 2, 2, 3, 3, 3], n => n));
// => { '1': 1, '2': 2, '3': 3 }

// Count by computed value
console.log(countBy(users, user => user.name.length));
// => { '5': 2, '3': 1, '7': 1 }
```

---

## `countByToMap(collection, iteratee)`

Creates a Map composed of keys generated from the results of running each element of `collection` through `iteratee`. The corresponding value of each key is the number of times the key was returned by `iteratee`.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratee` (Function|string): The iteratee to transform keys

### Returns

Map with counts

### Examples

```typescript
import { countByToMap } from 'highdash';

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' }
];

// Count by property
const departmentCounts = countByToMap(users, 'department');
console.log(departmentCounts);
// => Map { 'Engineering' => 2, 'Marketing' => 1 }

// Count by function
const ageGroups = countByToMap(users, user => user.age > 25 ? 'senior' : 'junior');
console.log(ageGroups);
// => Map { 'junior' => 2, 'senior' => 1 }

// Use Map methods
console.log(departmentCounts.get('Engineering')); // 2
console.log(departmentCounts.has('Sales')); // false
```

---

## `orderBy(collection, iteratees?, orders?)`

Creates an array of elements, sorted in ascending order by the results of running each element in a collection through each iteratee.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratees` (Function|string|Array, optional): The iteratees to sort by
- `orders` (string|Array, optional): The sort orders of iteratees

### Returns

New sorted array

### Examples

```typescript
import { orderBy } from 'highdash';

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' }
];

// Sort by single property
console.log(orderBy(users, 'age'));
// => [{ name: 'Alice', age: 25, department: 'Engineering' }, { name: 'Charlie', age: 25, department: 'Engineering' }, { name: 'Bob', age: 30, department: 'Marketing' }]

// Sort by multiple properties
console.log(orderBy(users, ['department', 'age']));
// => Sorted by department first, then by age

// Sort with custom orders
console.log(orderBy(users, ['age'], ['desc']));
// => [{ name: 'Bob', age: 30, department: 'Marketing' }, ...]

// Sort by function
console.log(orderBy(users, user => user.name.length));
// => Sorted by name length
```

---

## `groupToMap(collection, iteratee)`

Creates a Map composed of keys generated from the results of running each element of `collection` through `iteratee`.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratee` (Function|string): The iteratee to transform keys

### Returns

Map with groups

### Examples

```typescript
import { groupToMap } from 'highdash';

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 30, department: 'Marketing' },
  { name: 'Charlie', age: 25, department: 'Engineering' }
];

// Group by property
const groupedByDept = groupToMap(users, 'department');
console.log(groupedByDept);
// => Map { 'Engineering' => [{ name: 'Alice', age: 25, department: 'Engineering' }, { name: 'Charlie', age: 25, department: 'Engineering' }], 'Marketing' => [{ name: 'Bob', age: 30, department: 'Marketing' }] }

// Group by function
const groupedByAge = groupToMap(users, user => user.age > 25 ? 'senior' : 'junior');
console.log(groupedByAge);
// => Map { 'junior' => [...], 'senior' => [...] }

// Use Map methods
console.log(groupedByDept.get('Engineering')); // Array of engineering users
console.log(groupedByDept.has('Sales')); // false
```

---

## `findLast(collection, predicate)`

Iterates over elements of `collection`, returning the last element `predicate` returns truthy for.

### Parameters

- `collection` (Array|Object): The collection to search
- `predicate` (Function): The function invoked per iteration

### Returns

Last matching element or undefined

### Examples

```typescript
import { findLast } from 'highdash';

const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true }
];

// Find last active user
console.log(findLast(users, user => user.active));
// => { id: 3, name: 'Charlie', active: true }

// Find last by property
console.log(findLast(users, 'active'));
// => { id: 3, name: 'Charlie', active: true }

// Find last in array
const numbers = [1, 2, 3, 4, 5];
console.log(findLast(numbers, n => n % 2 === 0));
// => 4
```

---

## `reject(collection, predicate)`

The opposite of `filter`; this method returns the elements of `collection` that `predicate` does not return truthy for.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `predicate` (Function): The function invoked per iteration

### Returns

New array without rejected elements

### Examples

```typescript
import { reject } from 'highdash';

const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 30, active: false },
  { name: 'Charlie', age: 35, active: true }
];

// Reject inactive users
console.log(reject(users, user => !user.active));
// => [{ name: 'Alice', age: 25, active: true }, { name: 'Charlie', age: 35, active: true }]

// Reject by property
console.log(reject(users, 'active'));
// => [{ name: 'Bob', age: 30, active: false }]

// Reject from array
const numbers = [1, 2, 3, 4, 5, 6];
console.log(reject(numbers, n => n % 2 === 0));
// => [1, 3, 5]
```

---

## `sample(collection)`

Gets a random element from `collection`.

### Parameters

- `collection` (Array|Object): The collection to sample

### Returns

Random element

### Examples

```typescript
import { sample } from 'highdash';

const users = ['Alice', 'Bob', 'Charlie', 'Diana'];

// Get random user
console.log(sample(users));
// => 'Bob' (random)

// Sample from object values
const data = { a: 1, b: 2, c: 3 };
console.log(sample(data));
// => 2 (random value)

// Sample from array
const numbers = [1, 2, 3, 4, 5];
console.log(sample(numbers));
// => 3 (random)
```

---

## `sampleSize(collection, n?)`

Gets `n` random elements at unique keys from `collection` up to the size of `collection`.

### Parameters

- `collection` (Array|Object): The collection to sample
- `n` (number): The number of elements to sample (default: 1)

### Returns

New array of random elements

### Examples

```typescript
import { sampleSize } from 'highdash';

const users = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

// Get 2 random users
console.log(sampleSize(users, 2));
// => ['Charlie', 'Alice'] (random)

// Get 3 random users
console.log(sampleSize(users, 3));
// => ['Bob', 'Diana', 'Eve'] (random)

// Sample more than available
console.log(sampleSize(users, 10));
// => ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'] (all elements)

// Sample from object
const data = { a: 1, b: 2, c: 3, d: 4 };
console.log(sampleSize(data, 2));
// => [2, 4] (random values)
```

---

## `shuffle(collection)`

Creates an array of shuffled values, using a version of the Fisher-Yates shuffle.

### Parameters

- `collection` (Array|Object): The collection to shuffle

### Returns

New shuffled array

### Examples

```typescript
import { shuffle } from 'highdash';

const numbers = [1, 2, 3, 4, 5];

// Shuffle array
console.log(shuffle(numbers));
// => [3, 1, 5, 2, 4] (random order)

// Shuffle object values
const data = { a: 1, b: 2, c: 3 };
console.log(shuffle(data));
// => [2, 1, 3] (random order)

// Shuffle strings
const words = ['hello', 'world', 'test'];
console.log(shuffle(words));
// => ['test', 'hello', 'world'] (random order)
```

---

## `size(collection)`

Gets the size of `collection` by returning its length for array-like values or the number of own enumerable string keyed properties for objects.

### Parameters

- `collection` (Array|Object): The collection to inspect

### Returns

Size number

### Examples

```typescript
import { size } from 'highdash';

// Array size
console.log(size([1, 2, 3]));
// => 3

// Object size
console.log(size({ a: 1, b: 2, c: 3 }));
// => 3

// String size
console.log(size('hello'));
// => 5

// Empty collections
console.log(size([]));
// => 0

console.log(size({}));
// => 0

// Null/undefined
console.log(size(null));
// => 0

console.log(size(undefined));
// => 0
```

---

## Import Examples

```typescript
// Import specific functions
import { keyBy, partition, mapValues } from 'highdash';

// Import from specific module (better tree-shaking)
import { keyBy } from 'highdash/collection/keyBy.js';
import { partition } from 'highdash/collection/partition.js';
import { mapValues } from 'highdash/collection/mapValues.js';

// Import all collection functions
import * as collection from 'highdash/collection';
```

## Performance Notes

- **`pick`**: **3.0× faster** than Lodash - direct property access with minimal abstraction
- **`omit`**: **1.2× faster** than Lodash - optimized object iteration
- **`orderBy`**: **1.2× faster** than Lodash - pre-computed values with direct tuple comparisons
- **Efficient iteration**: Optimized loops for both arrays and objects
- **Memory usage**: Creates new objects/arrays instead of mutating
- **Type safety**: Full TypeScript support with proper type inference
- **Native methods**: Uses native JavaScript methods where possible

*Performance metrics based on Node.js 18+ benchmarks, averaged over 5 runs.*

## Common Use Cases

- **Data transformation**: Use `keyBy`, `mapValues` for restructuring data
- **Data filtering**: Use `pick`, `omit`, `pickBy`, `omitBy` for selective properties
- **Data analysis**: Use `countBy`, `partition` for grouping and counting
- **Data sampling**: Use `sample`, `sampleSize`, `shuffle` for random operations
- **Data organization**: Use `orderBy`, `groupToMap` for sorting and grouping
