# Core Functions

Essential functions for common programming patterns. These are the most frequently used utilities in Highdash.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`debounce`](#debounce) | Delays function execution until after wait time | `func`, `wait`, `options?` | Debounced function |
| [`throttle`](#throttle) | Limits function execution to once per wait time | `func`, `wait`, `options?` | Throttled function |
| [`cloneDeep`](#clonedeep) | Creates deep clone of value | `value` | Deeply cloned value |
| [`cloneDeepWith`](#clonedeepwith) | Creates deep clone with customizer | `value`, `customizer` | Deeply cloned value |
| [`merge`](#merge) | Recursively merges objects (mutable) | `object`, `...sources` | Merged object |
| [`mergeDeep`](#mergedeep) | Recursively merges objects (immutable) | `object`, `...sources` | New merged object |
| [`uniq`](#uniq) | Creates duplicate-free array | `array` | New unique array |
| [`groupBy`](#groupby) | Groups collection by iteratee | `collection`, `iteratee` | Grouped object |

---

## `debounce(func, wait, options?)`

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

**Features:**
- Supports leading/trailing edges and optional `maxWait`
- Exposes `cancel()`, `flush()`, and `pending()` helpers
- Uses monotonic clock when available for stable timing

### Parameters

- `func` (Function): The function to debounce
- `wait` (number): The number of milliseconds to delay
- `options` (Object, optional): Configuration options
  - `leading` (boolean): Invoke on the leading edge (default: false)
  - `trailing` (boolean): Invoke on the trailing edge (default: true)
  - `maxWait` (number): Maximum time the function is allowed to be delayed

### Returns

Function with additional methods:
- `cancel()`: Cancels delayed function invocation
- `flush()`: Immediately invokes the delayed function
- `pending()`: Returns true if there is a pending invocation

### Examples

```typescript
import { debounce } from 'highdash';

// Basic debouncing
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

debouncedSearch('hello'); // Will only execute after 300ms of inactivity

// With options
const debouncedWithOptions = debounce((value: number) => {
  console.log('Processing:', value);
}, 200, { 
  leading: true,   // Execute immediately on first call
  trailing: true, // Execute after delay
  maxWait: 1000   // Maximum delay of 1 second
});

// Control methods
if (debouncedSearch.pending()) {
  console.log('Search is pending...');
}

debouncedSearch.cancel(); // Cancel pending execution
debouncedSearch.flush();  // Execute immediately
```

---

## `throttle(func, wait, options?)`

Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.

**Features:**
- Built on top of `debounce` with `maxWait` set to `wait`
- Exposes `cancel()`, `flush()`, and `pending()` helpers
- Supports leading/trailing edge options

### Parameters

- `func` (Function): The function to throttle
- `wait` (number): The number of milliseconds to throttle invocations
- `options` (Object, optional): Configuration options
  - `leading` (boolean): Invoke on the leading edge (default: true)
  - `trailing` (boolean): Invoke on the trailing edge (default: true)

### Returns

Function with additional methods:
- `cancel()`: Cancels delayed function invocation
- `flush()`: Immediately invokes the delayed function
- `pending()`: Returns true if there is a pending invocation

### Examples

```typescript
import { throttle } from 'highdash';

// Scroll event throttling
const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

window.addEventListener('scroll', throttledScroll);

// API call throttling
const throttledApiCall = throttle(async () => {
  const response = await fetch('/api/data');
  return response.json();
}, 1000);

// With options
const throttledWithOptions = throttle((data: any) => {
  console.log('Processing:', data);
}, 500, { 
  leading: true,  // Execute immediately on first call
  trailing: true  // Execute after delay
});
```

---

## `cloneDeep(value)`

Creates a deep clone of the value. Recursively clones arrays, objects, maps, sets, and other complex types.

**Features:**
- Handles circular references
- Preserves symbol properties
- Supports all JavaScript data types

### Parameters

- `value` (any): The value to recursively clone

### Returns

Deeply cloned value of the same type

### Examples

```typescript
import { cloneDeep } from 'highdash';

// Basic deep cloning
const original = { 
  a: { b: { c: 1 } },
  nested: { array: [1, 2, 3] }
};
const cloned = cloneDeep(original);

cloned.a.b.c = 2;
cloned.nested.array.push(4);

console.log(original.a.b.c); // 1 (unchanged)
console.log(original.nested.array); // [1, 2, 3] (unchanged)
console.log(cloned.a.b.c);   // 2
console.log(cloned.nested.array); // [1, 2, 3, 4]

// With complex types
const complex = {
  date: new Date(),
  map: new Map([['key', 'value']]),
  set: new Set([1, 2, 3]),
  symbol: Symbol('key')
};
const clonedComplex = cloneDeep(complex);
```

---

## `cloneDeepWith(value, customizer)`

Creates a deep clone of the value with a customizer function to handle specific cloning behavior.

### Parameters

- `value` (any): The value to clone
- `customizer` (Function): The function to customize cloning behavior

### Returns

Deeply cloned value with custom cloning applied

### Examples

```typescript
import { cloneDeepWith } from 'highdash';

// Custom cloning for Date objects
const customizer = (value: any) => {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }
  // Return undefined to use default cloning
};

const original = { 
  date: new Date(), 
  data: { nested: 'value' } 
};
const cloned = cloneDeepWith(original, customizer);

// Custom cloning for specific types
const advancedCustomizer = (value: any) => {
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }
  if (value instanceof Error) {
    const clonedError = new Error(value.message);
    clonedError.stack = value.stack;
    return clonedError;
  }
};
```

---

## `merge(object, ...sources)`

Recursively merges own enumerable properties of source objects into the destination object. **This function mutates the original object.**

**Features:**
- Merges arrays and plain objects recursively
- Skips undefined source properties
- Handles symbol properties
- Source objects applied left to right

### Parameters

- `object` (Object): The destination object
- `...sources` (Object[]): Source objects to merge

### Returns

The modified destination object

### Examples

```typescript
import { merge } from 'highdash';

// Basic merging
const obj1 = { a: { b: 1 } };
const obj2 = { a: { c: 2 }, d: 3 };
const merged = merge(obj1, obj2);

console.log(merged); // { a: { b: 1, c: 2 }, d: 3 }
console.log(obj1);   // { a: { b: 1, c: 2 }, d: 3 } (modified!)

// Array merging
const object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
};
const other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
};
merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

// Multiple sources
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };
merge(target, source1, source2);
// => { a: 1, b: 2, c: 3 }
```

---

## `mergeDeep(object, ...sources)`

Creates a new object by deeply merging source objects into the target object. **This function is immutable and doesn't modify the original object.**

### Parameters

- `object` (Object): The target object
- `...sources` (Object[]): Source objects to merge

### Returns

New merged object (original object unchanged)

### Examples

```typescript
import { mergeDeep } from 'highdash';

// Immutable merging
const obj1 = { a: { b: 1 } };
const obj2 = { a: { c: 2 } };
const merged = mergeDeep(obj1, obj2);

console.log(merged); // { a: { b: 1, c: 2 } }
console.log(obj1);  // { a: { b: 1 } } (unchanged!)

// State management example
const initialState = {
  user: { name: 'John', age: 30 },
  settings: { theme: 'light' }
};

const updates = {
  user: { age: 31 },
  settings: { language: 'en' }
};

const newState = mergeDeep(initialState, updates);
// => { user: { name: 'John', age: 31 }, settings: { theme: 'light', language: 'en' } }
```

---

## `uniq(array)`

Creates a duplicate-free version of an array using SameValueZero for equality comparisons.

**Features:**
- Uses Set for efficient deduplication
- Preserves order of first occurrence
- Works with primitive values and objects

### Parameters

- `array` (Array): The array to inspect

### Returns

New duplicate-free array

### Examples

```typescript
import { uniq } from 'highdash';

// Basic deduplication
console.log(uniq([1, 2, 2, 3, 3, 3])); // [1, 2, 3]
console.log(uniq(['a', 'b', 'a', 'c'])); // ['a', 'b', 'c']

// With objects (uses reference equality)
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' } // Different object reference
];
console.log(uniq(users)); // All three objects (different references)

// With mixed types
console.log(uniq([1, '1', 1, true, 'true', true])); // [1, '1', true, 'true']
```

---

## `groupBy(collection, iteratee)`

Creates an object composed of keys generated from the results of running each element of collection through iteratee.

**Features:**
- Groups elements by property or function result
- Preserves original element references
- Type-safe with TypeScript

### Parameters

- `collection` (Array|Object): The collection to iterate over
- `iteratee` (Function|string): The iteratee to transform keys

### Returns

Object with grouped elements

### Examples

```typescript
import { groupBy } from 'highdash';

const users = [
  { name: 'Alice', age: 25, department: 'Engineering' },
  { name: 'Bob', age: 25, department: 'Marketing' },
  { name: 'Charlie', age: 30, department: 'Engineering' }
];

// Group by property
console.log(groupBy(users, 'age'));
// { '25': [Alice, Bob], '30': [Charlie] }

console.log(groupBy(users, 'department'));
// { 'Engineering': [Alice, Charlie], 'Marketing': [Bob] }

// Group by function
console.log(groupBy(users, user => user.age > 25 ? 'senior' : 'junior'));
// { 'junior': [Alice, Bob], 'senior': [Charlie] }

// Group by computed value
console.log(groupBy(users, user => user.name.length));
// { '5': [Alice, Bob], '7': [Charlie] }

// Group array of numbers
console.log(groupBy([1, 2, 3, 4, 5], n => n % 2 === 0 ? 'even' : 'odd'));
// { 'odd': [1, 3, 5], 'even': [2, 4] }
```

---

## Import Examples

```typescript
// Import specific functions
import { debounce, throttle, cloneDeep } from 'highdash';

// Import from specific module (better tree-shaking)
import { debounce } from 'highdash/core/debounce.js';
import { cloneDeep } from 'highdash/core/cloneDeep.js';

// Import all core functions
import * as core from 'highdash/core';
```

## Performance Notes

- **`cloneDeep`**: **4.4× faster** than Lodash - uses native Map for cycle detection
- **`merge`**: **4.2× faster** than Lodash - minimal abstraction with direct property iteration
- **`mergeDeep`**: **4.0× faster** than Lodash - immutable operations with WeakMap cycle detection
- **`debounce`** and **`throttle`**: Use monotonic clock for stable timing
- **`uniq`**: Uses native Set for optimal performance
- **`groupBy`**: Preserves type information with TypeScript

*Performance metrics based on Node.js 18+ benchmarks, averaged over 5 runs.*

## Common Use Cases

- **Search inputs**: Use `debounce` to delay API calls
- **Scroll events**: Use `throttle` to limit event handlers
- **State management**: Use `mergeDeep` for immutable updates
- **Data processing**: Use `groupBy` to organize collections
- **Deep copying**: Use `cloneDeep` for complex object cloning
