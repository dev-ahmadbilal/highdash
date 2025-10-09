# Array Functions

Functions for working with arrays and array-like objects. These utilities provide efficient array manipulation, transformation, and processing capabilities.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`chunk`](#chunk) | Splits array into chunks of specified size | `array`, `size` | Array of chunks |
| [`compact`](#compact) | Removes falsy values from array | `array` | New array without falsy values |
| [`difference`](#difference) | Array values not in other arrays | `array`, `...values` | New array of differences |
| [`intersection`](#intersection) | Common values in all arrays | `...arrays` | New array of intersections |
| [`union`](#union) | Unique values from all arrays | `...arrays` | New array of unique values |
| [`flatten`](#flatten) | Flattens array one level deep | `array` | New flattened array |
| [`flattenDeep`](#flattendeep) | Recursively flattens array | `array` | New deeply flattened array |
| [`head`](#head) | Gets first element of array | `array` | First element or undefined |
| [`tail`](#tail) | Gets all but first element | `array` | New array without first element |
| [`last`](#last) | Gets last element of array | `array` | Last element or undefined |
| [`initial`](#initial) | Gets all but last element | `array` | New array without last element |
| [`take`](#take) | Takes first n elements | `array`, `n?` | New array of taken elements |
| [`takeRight`](#takeright) | Takes last n elements | `array`, `n?` | New array of taken elements |
| [`drop`](#drop) | Drops first n elements | `array`, `n?` | New array without dropped elements |
| [`dropRight`](#dropright) | Drops last n elements | `array`, `n?` | New array without dropped elements |
| [`sortBy`](#sortby) | Sorts array by iteratees | `collection`, `...iteratees` | New sorted array |
| [`zip`](#zip) | Groups elements by index | `...arrays` | New array of grouped elements |
| [`unzip`](#unzip) | Unzips grouped elements | `array` | New array of unzipped elements |
| [`pull`](#pull) | Removes given values (mutable) | `array`, `...values` | Modified array |
| [`remove`](#remove) | Removes elements by predicate | `array`, `predicate` | New array of removed elements |
| [`without`](#without) | Array without given values | `array`, `...values` | New array without values |

---

## `chunk(array, size)`

Creates an array of elements split into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.

### Parameters

- `array` (Array): The array to process
- `size` (number): The length of each chunk (default: 1)

### Returns

New array of chunks

### Examples

```typescript
import { chunk } from 'highdash';

// Basic chunking
console.log(chunk(['a', 'b', 'c', 'd'], 2));
// => [['a', 'b'], ['c', 'd']]

console.log(chunk(['a', 'b', 'c', 'd'], 3));
// => [['a', 'b', 'c'], ['d']]

// Uneven chunks
console.log(chunk([1, 2, 3, 4, 5], 2));
// => [[1, 2], [3, 4], [5]]

// Processing data in batches
const data = Array.from({ length: 100 }, (_, i) => i);
const batches = chunk(data, 10);
console.log(batches.length); // 10 batches of 10 items each
```

---

## `compact(array)`

Creates an array with all falsy values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsy.

### Parameters

- `array` (Array): The array to compact

### Returns

New array of filtered values

### Examples

```typescript
import { compact } from 'highdash';

// Remove falsy values
console.log(compact([0, 1, false, 2, '', 3]));
// => [1, 2, 3]

console.log(compact([null, undefined, 0, false, '', NaN, 1, 2]));
// => [1, 2]

// With mixed types
console.log(compact(['hello', '', 'world', null, 42, 0]));
// => ['hello', 'world', 42]
```

---

## `difference(array, ...values)`

Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.

### Parameters

- `array` (Array): The array to inspect
- `...values` (Array[]): The values to exclude

### Returns

New array of filtered values

### Examples

```typescript
import { difference } from 'highdash';

// Basic difference
console.log(difference([2, 1], [2, 3]));
// => [1]

// Multiple exclusions
console.log(difference([1, 2, 3, 4, 5], [2, 4], [3]));
// => [1, 5]

// With objects (uses reference equality)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
console.log(difference([obj1, obj2, obj3], [obj2]));
// => [obj1, obj3]
```

---

## `intersection(...arrays)`

Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons.

### Parameters

- `...arrays` (Array[]): The arrays to inspect

### Returns

New array of intersecting values

### Examples

```typescript
import { intersection } from 'highdash';

// Basic intersection
console.log(intersection([2, 1], [2, 3]));
// => [2]

// Multiple arrays
console.log(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5]));
// => [3]

// With strings
console.log(intersection(['a', 'b', 'c'], ['b', 'c', 'd'], ['c', 'd', 'e']));
// => ['c']
```

---

## `union(...arrays)`

Creates an array of unique values, in order, from all given arrays using SameValueZero for equality comparisons.

### Parameters

- `...arrays` (Array[]): The arrays to inspect

### Returns

New array of combined unique values

### Examples

```typescript
import { union } from 'highdash';

// Basic union
console.log(union([2], [1, 2]));
// => [2, 1]

// Multiple arrays
console.log(union([1, 2], [2, 3], [3, 4]));
// => [1, 2, 3, 4]

// With strings
console.log(union(['a', 'b'], ['b', 'c'], ['c', 'd']));
// => ['a', 'b', 'c', 'd']
```

---

## `flatten(array)`

Flattens `array` a single level deep.

### Parameters

- `array` (Array): The array to flatten

### Returns

New flattened array

### Examples

```typescript
import { flatten } from 'highdash';

// Single level flattening
console.log(flatten([1, [2, [3, [4]], 5]]));
// => [1, 2, [3, [4]], 5]

console.log(flatten([[1, 2], [3, 4], [5, 6]]));
// => [1, 2, 3, 4, 5, 6]

// Mixed types
console.log(flatten(['a', ['b', 'c'], 'd']));
// => ['a', 'b', 'c', 'd']
```

---

## `flattenDeep(array)`

Recursively flattens `array`.

### Parameters

- `array` (Array): The array to flatten

### Returns

New deeply flattened array

### Examples

```typescript
import { flattenDeep } from 'highdash';

// Deep flattening
console.log(flattenDeep([1, [2, [3, [4]], 5]]));
// => [1, 2, 3, 4, 5]

console.log(flattenDeep([[1, 2], [[3, 4]], [5, 6]]));
// => [1, 2, 3, 4, 5, 6]

// Complex nested structure
console.log(flattenDeep([1, [2, [3, [4, [5]]]]]));
// => [1, 2, 3, 4, 5]
```

---

## `head(array)`

Gets the first element of `array`.

### Parameters

- `array` (Array): The array to query

### Returns

First element or undefined

### Examples

```typescript
import { head } from 'highdash';

console.log(head([1, 2, 3]));
// => 1

console.log(head([]));
// => undefined

console.log(head(['a', 'b', 'c']));
// => 'a'
```

---

## `tail(array)`

Gets all but the first element of `array`.

### Parameters

- `array` (Array): The array to query

### Returns

New array without first element

### Examples

```typescript
import { tail } from 'highdash';

console.log(tail([1, 2, 3]));
// => [2, 3]

console.log(tail([1]));
// => []

console.log(tail([]));
// => []
```

---

## `last(array)`

Gets the last element of `array`.

### Parameters

- `array` (Array): The array to query

### Returns

Last element or undefined

### Examples

```typescript
import { last } from 'highdash';

console.log(last([1, 2, 3]));
// => 3

console.log(last([]));
// => undefined

console.log(last(['a', 'b', 'c']));
// => 'c'
```

---

## `initial(array)`

Gets all but the last element of `array`.

### Parameters

- `array` (Array): The array to query

### Returns

New array without last element

### Examples

```typescript
import { initial } from 'highdash';

console.log(initial([1, 2, 3]));
// => [1, 2]

console.log(initial([1]));
// => []

console.log(initial([]));
// => []
```

---

## `take(array, n?)`

Creates a slice of `array` with `n` elements taken from the beginning.

### Parameters

- `array` (Array): The array to query
- `n` (number): The number of elements to take (default: 1)

### Returns

New array of taken elements

### Examples

```typescript
import { take } from 'highdash';

console.log(take([1, 2, 3]));
// => [1]

console.log(take([1, 2, 3], 2));
// => [1, 2]

console.log(take([1, 2, 3], 5));
// => [1, 2, 3]

console.log(take([1, 2, 3], 0));
// => []
```

---

## `takeRight(array, n?)`

Creates a slice of `array` with `n` elements taken from the end.

### Parameters

- `array` (Array): The array to query
- `n` (number): The number of elements to take (default: 1)

### Returns

New array of taken elements

### Examples

```typescript
import { takeRight } from 'highdash';

console.log(takeRight([1, 2, 3]));
// => [3]

console.log(takeRight([1, 2, 3], 2));
// => [2, 3]

console.log(takeRight([1, 2, 3], 5));
// => [1, 2, 3]

console.log(takeRight([1, 2, 3], 0));
// => []
```

---

## `drop(array, n?)`

Creates a slice of `array` with `n` elements dropped from the beginning.

### Parameters

- `array` (Array): The array to query
- `n` (number): The number of elements to drop (default: 1)

### Returns

New array without dropped elements

### Examples

```typescript
import { drop } from 'highdash';

console.log(drop([1, 2, 3]));
// => [2, 3]

console.log(drop([1, 2, 3], 2));
// => [3]

console.log(drop([1, 2, 3], 5));
// => []

console.log(drop([1, 2, 3], 0));
// => [1, 2, 3]
```

---

## `dropRight(array, n?)`

Creates a slice of `array` with `n` elements dropped from the end.

### Parameters

- `array` (Array): The array to query
- `n` (number): The number of elements to drop (default: 1)

### Returns

New array without dropped elements

### Examples

```typescript
import { dropRight } from 'highdash';

console.log(dropRight([1, 2, 3]));
// => [1, 2]

console.log(dropRight([1, 2, 3], 2));
// => [1]

console.log(dropRight([1, 2, 3], 5));
// => []

console.log(dropRight([1, 2, 3], 0));
// => [1, 2, 3]
```

---

## `sortBy(collection, ...iteratees)`

Creates an array of elements, sorted in ascending order by the results of running each element through iteratees. This method performs a stable sort.

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `...iteratees` (Function|string): The iteratees to sort by

### Returns

New sorted array

### Examples

```typescript
import { sortBy } from 'highdash';

const users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];

// Sort by single property
console.log(sortBy(users, 'age'));
// => [{ user: 'barney', age: 34 }, { user: 'barney', age: 36 }, ...]

// Sort by multiple properties
console.log(sortBy(users, ['user', 'age']));
// => [{ user: 'barney', age: 34 }, { user: 'barney', age: 36 }, ...]

// Sort by function
console.log(sortBy(users, user => user.age));
// => [{ user: 'barney', age: 34 }, { user: 'barney', age: 36 }, ...]

// Sort numbers
console.log(sortBy([3, 1, 4, 1, 5]));
// => [1, 1, 3, 4, 5]
```

---

## `zip(...arrays)`

Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.

### Parameters

- `...arrays` (Array[]): The arrays to process

### Returns

New array of grouped elements

### Examples

```typescript
import { zip } from 'highdash';

console.log(zip(['a', 'b'], [1, 2], [true, false]));
// => [['a', 1, true], ['b', 2, false]]

console.log(zip(['a', 'b', 'c'], [1, 2]));
// => [['a', 1], ['b', 2], ['c', undefined]]

// Transpose matrix
const matrix = [[1, 2, 3], [4, 5, 6]];
console.log(zip(...matrix));
// => [[1, 4], [2, 5], [3, 6]]
```

---

## `unzip(array)`

This method is like `zip` except that it accepts an array of grouped elements and creates an array regrouping the elements to their pre-zip configuration.

### Parameters

- `array` (Array): The array of grouped elements to process

### Returns

New array of regrouped elements

### Examples

```typescript
import { unzip } from 'highdash';

const zipped = [['a', 1, true], ['b', 2, false]];
console.log(unzip(zipped));
// => [['a', 'b'], [1, 2], [true, false]]

// Unzip matrix
const matrix = [[1, 4], [2, 5], [3, 6]];
console.log(unzip(matrix));
// => [[1, 2, 3], [4, 5, 6]]
```

---

## `pull(array, ...values)`

Removes all given values from `array` using SameValueZero for equality comparisons. **This function mutates the original array.**

### Parameters

- `array` (Array): The array to modify
- `...values` (any[]): The values to remove

### Returns

Modified array

### Examples

```typescript
import { pull } from 'highdash';

const array = ['a', 'b', 'c', 'a', 'b', 'c'];
pull(array, 'a', 'c');
console.log(array);
// => ['b', 'b']

const numbers = [1, 2, 3, 1, 2, 3];
pull(numbers, 1, 3);
console.log(numbers);
// => [2, 2]
```

---

## `remove(array, predicate)`

Removes all elements from `array` that `predicate` returns truthy for and returns an array of the removed elements. **This function mutates the original array.**

### Parameters

- `array` (Array): The array to modify
- `predicate` (Function): The function invoked per iteration

### Returns

New array of removed elements

### Examples

```typescript
import { remove } from 'highdash';

const array = [1, 2, 3, 4];
const evens = remove(array, n => n % 2 === 0);
console.log(array);
// => [1, 3]
console.log(evens);
// => [2, 4]

const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];
const inactive = remove(users, user => !user.active);
console.log(users);
// => [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
console.log(inactive);
// => [{ name: 'Bob', active: false }]
```

---

## `without(array, ...values)`

Creates an array excluding all given values using SameValueZero for equality comparisons.

### Parameters

- `array` (Array): The array to inspect
- `...values` (any[]): The values to exclude

### Returns

New array without excluded values

### Examples

```typescript
import { without } from 'highdash';

console.log(without([2, 1, 2, 3], 1, 2));
// => [3]

console.log(without(['a', 'b', 'c', 'a', 'b'], 'a', 'b'));
// => ['c']

// With objects (uses reference equality)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };
console.log(without([obj1, obj2, obj3], obj2));
// => [obj1, obj3]
```

---

## Import Examples

```typescript
// Import specific functions
import { chunk, compact, flatten } from 'highdash';

// Import from specific module (better tree-shaking)
import { chunk } from 'highdash/array/chunk.js';
import { compact } from 'highdash/array/compact.js';
import { flatten } from 'highdash/array/flatten.js';

// Import all array functions
import * as array from 'highdash/array';
```

## Performance Notes

- **`flattenDeep`**: **2.1× faster** than Lodash - uses native `Array.flat(Infinity)`
- **Native methods**: Uses native `Array.flat()` and `Array.filter()` where possible
- **Efficient algorithms**: Optimized implementations for common operations
- **Memory usage**: Creates new arrays instead of mutating (except `pull` and `remove`)
- **Type safety**: Full TypeScript support with proper type inference

*Performance metrics based on Node.js 18+ benchmarks, averaged over 5 runs.*

## Common Use Cases

- **Data processing**: Use `chunk` for batch processing
- **Data cleaning**: Use `compact` to remove falsy values
- **Array manipulation**: Use `take`, `drop`, `head`, `tail` for slicing
- **Set operations**: Use `union`, `intersection`, `difference` for array math
- **Sorting**: Use `sortBy` for complex sorting operations
- **Matrix operations**: Use `zip` and `unzip` for transposition
