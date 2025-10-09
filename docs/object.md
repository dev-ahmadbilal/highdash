# Object Functions

Functions for working with objects and object properties. These utilities provide comprehensive object manipulation, property access, and iteration capabilities.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`keys`](#keys) | Gets own enumerable keys | `object` | Array of keys |
| [`keysIn`](#keysin) | Gets own and inherited keys | `object` | Array of keys |
| [`values`](#values) | Gets own enumerable values | `object` | Array of values |
| [`valuesIn`](#valuesin) | Gets own and inherited values | `object` | Array of values |
| [`entries`](#entries) | Gets own enumerable entries | `object` | Array of [key, value] pairs |
| [`entriesIn`](#entriesin) | Gets own and inherited entries | `object` | Array of [key, value] pairs |
| [`toPairs`](#topairs) | Converts to pairs | `object` | Array of [key, value] pairs |
| [`toPairsIn`](#topairsin) | Converts to pairs (inherited) | `object` | Array of [key, value] pairs |
| [`assign`](#assign) | Assigns properties | `object`, `...sources` | Modified object |
| [`assignIn`](#assignin) | Assigns inherited properties | `object`, `...sources` | Modified object |
| [`assignWith`](#assignwith) | Assigns with customizer | `object`, `...sources`, `customizer` | Modified object |
| [`assignInWith`](#assigninwith) | Assigns inherited with customizer | `object`, `...sources`, `customizer` | Modified object |
| [`extend`](#extend) | Alias for assignIn | `object`, `...sources` | Modified object |
| [`extendWith`](#extendwith) | Alias for assignInWith | `object`, `...sources`, `customizer` | Modified object |
| [`defaults`](#defaults) | Assigns default properties | `object`, `...sources` | Modified object |
| [`defaultsDeep`](#defaultsdeep) | Deep assigns default properties | `object`, `...sources` | Modified object |
| [`get`](#get) | Gets property value | `object`, `path`, `defaultValue?` | Property value |
| [`set`](#set) | Sets property value | `object`, `path`, `value` | Modified object |
| [`setIn`](#setin) | Sets nested property value | `object`, `path`, `value` | Modified object |
| [`setWith`](#setwith) | Sets with customizer | `object`, `path`, `value`, `customizer` | Modified object |
| [`update`](#update) | Updates property value | `object`, `path`, `updater` | Modified object |
| [`updateIn`](#updatein) | Updates nested property | `object`, `path`, `updater` | Modified object |
| [`updateWith`](#updatewith) | Updates with customizer | `object`, `path`, `updater`, `customizer` | Modified object |
| [`unset`](#unset) | Removes property | `object`, `path` | Boolean (success) |
| [`unsetIn`](#unsetin) | Removes nested property | `object`, `path` | Boolean (success) |
| [`has`](#has) | Checks if property exists | `object`, `path` | Boolean |
| [`hasIn`](#hasin) | Checks if inherited property exists | `object`, `path` | Boolean |
| [`at`](#at) | Gets properties at paths | `object`, `paths` | Array of values |
| [`findKey`](#findkey) | Finds first key by predicate | `object`, `predicate` | Key or undefined |
| [`findLastKey`](#findlastkey) | Finds last key by predicate | `object`, `predicate` | Key or undefined |
| [`forIn`](#forin) | Iterates over own and inherited properties | `object`, `iteratee` | Object |
| [`forInRight`](#forinright) | Iterates right to left | `object`, `iteratee` | Object |
| [`forOwn`](#forown) | Iterates over own properties | `object`, `iteratee` | Object |
| [`forOwnRight`](#forownright) | Iterates over own properties (right to left) | `object`, `iteratee` | Object |
| [`functions`](#functions) | Gets function property names | `object` | Array of function names |
| [`functionsIn`](#functionsin) | Gets inherited function names | `object` | Array of function names |
| [`invert`](#invert) | Inverts object keys and values | `object` | New inverted object |
| [`invertBy`](#invertby) | Inverts by iteratee | `object`, `iteratee?` | New inverted object |
| [`invoke`](#invoke) | Invokes method at path | `object`, `path`, `...args` | Method result |
| [`mapKeys`](#mapkeys) | Maps object keys | `object`, `iteratee` | New object with mapped keys |
| [`mergeWith`](#mergewith) | Merges with customizer | `object`, `...sources`, `customizer` | Merged object |
| [`result`](#result) | Gets result of method/property | `object`, `path`, `defaultValue?` | Method result or property value |
| [`transform`](#transform) | Transforms object | `object`, `iteratee`, `accumulator?` | Accumulator |

---

## Property Access Functions

### `keys(object)`

Creates an array of the own enumerable property names of `object`.

```typescript
import { keys } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(keys(new Foo()));
// => ['a', 'b'] (iteration order is not guaranteed)

console.log(keys({ 'a': 1, 'b': 2 }));
// => ['a', 'b']
```

### `keysIn(object)`

Creates an array of the own and inherited enumerable property names of `object`.

```typescript
import { keysIn } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(keysIn(new Foo()));
// => ['a', 'b', 'c']
```

### `values(object)`

Creates an array of the own enumerable string keyed property values of `object`.

```typescript
import { values } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(values(new Foo()));
// => [1, 2]

console.log(values({ 'a': 1, 'b': 2 }));
// => [1, 2]
```

### `valuesIn(object)`

Creates an array of the own and inherited enumerable string keyed property values of `object`.

```typescript
import { valuesIn } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(valuesIn(new Foo()));
// => [1, 2, 3]
```

### `entries(object)`

Creates an array of the own enumerable string keyed property-value pairs for `object`.

```typescript
import { entries } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(entries(new Foo()));
// => [['a', 1], ['b', 2]]

console.log(entries({ 'a': 1, 'b': 2 }));
// => [['a', 1], ['b', 2]]
```

### `entriesIn(object)`

Creates an array of the own and inherited enumerable string keyed property-value pairs for `object`.

```typescript
import { entriesIn } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(entriesIn(new Foo()));
// => [['a', 1], ['b', 2], ['c', 3]]
```

### `toPairs(object)`

Creates an array of the own enumerable string keyed property-value pairs for `object`.

```typescript
import { toPairs } from 'highdash';

console.log(toPairs({ 'a': 1, 'b': 2 }));
// => [['a', 1], ['b', 2]]
```

### `toPairsIn(object)`

Creates an array of the own and inherited enumerable string keyed property-value pairs for `object`.

```typescript
import { toPairsIn } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(toPairsIn(new Foo()));
// => [['a', 1], ['b', 2], ['c', 3]]
```

---

## Property Manipulation Functions

### `get(object, path, defaultValue?)`

Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.

```typescript
import { get } from 'highdash';

const object = { 'a': [{ 'b': { 'c': 3 } }] };

console.log(get(object, 'a[0].b.c'));
// => 3

console.log(get(object, ['a', '0', 'b', 'c']));
// => 3

console.log(get(object, 'a.b.c', 'default'));
// => 'default'

// Simple property access
console.log(get(object, 'a'));
// => [{ 'b': { 'c': 3 } }]
```

### `set(object, path, value)`

Sets the value at `path` of `object`. If a portion of `path` doesn't exist, it's created.

```typescript
import { set } from 'highdash';

const object = { 'a': [{ 'b': { 'c': 3 } }] };

set(object, 'a[0].b.c', 4);
console.log(object.a[0].b.c);
// => 4

set(object, ['x', '0', 'y', 'z'], 5);
console.log(object.x[0].y.z);
// => 5

// Simple property setting
set(object, 'simple', 'value');
console.log(object.simple);
// => 'value'
```

### `setIn(object, path, value)`

Sets the value at `path` of `object` (immutable version).

### `setWith(object, path, value, customizer)`

Sets the value at `path` of `object` using `customizer` to determine how values are assigned.

### `update(object, path, updater)`

Updates the value at `path` of `object` using the result of `updater`.

```typescript
import { update } from 'highdash';

const object = { 'a': [{ 'b': { 'c': 3 } }] };

update(object, 'a[0].b.c', n => n * n);
console.log(object.a[0].b.c);
// => 9
```

### `updateIn(object, path, updater)`

Updates the value at `path` of `object` (immutable version).

### `updateWith(object, path, updater, customizer)`

Updates the value at `path` of `object` using `customizer` to determine how values are updated.

### `unset(object, path)`

Removes the property at `path` of `object`.

```typescript
import { unset } from 'highdash';

const object = { 'a': [{ 'b': { 'c': 3 } }] };

console.log(unset(object, 'a[0].b.c'));
// => true

console.log(object.a[0].b);
// => {}
```

### `unsetIn(object, path)`

Removes the property at `path` of `object` (immutable version).

### `has(object, path)`

Checks if `path` is a direct property of `object`.

```typescript
import { has } from 'highdash';

const object = { 'a': [{ 'b': { 'c': 3 } }] };

console.log(has(object, 'a'));
// => true

console.log(has(object, 'a[0].b.c'));
// => true

console.log(has(object, 'a[0].b.d'));
// => false
```

### `hasIn(object, path)`

Checks if `path` is a direct or inherited property of `object`.

### `at(object, paths)`

Creates an array of values corresponding to `paths` of `object`.

```typescript
import { at } from 'highdash';

const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };

console.log(at(object, ['a[0].b.c', 'a[1]']));
// => [3, 4]
```

---

## Object Assignment Functions

### `assign(object, ...sources)`

Assigns own enumerable string keyed properties of source objects to the destination object.

```typescript
import { assign } from 'highdash';

function Foo() {
  this.a = 1;
}

function Bar() {
  this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;

console.log(assign({ 'a': 0 }, new Foo(), new Bar()));
// => { 'a': 1, 'c': 3 }
```

### `assignIn(object, ...sources)`

Assigns own and inherited enumerable string keyed properties of source objects to the destination object.

```typescript
import { assignIn } from 'highdash';

function Foo() {
  this.a = 1;
}

function Bar() {
  this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;

console.log(assignIn({ 'a': 0 }, new Foo(), new Bar()));
// => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
```

### `assignWith(object, ...sources, customizer)`

Assigns own enumerable string keyed properties of source objects to the destination object using `customizer`.

### `assignInWith(object, ...sources, customizer)`

Assigns own and inherited enumerable string keyed properties of source objects to the destination object using `customizer`.

### `extend(object, ...sources)`

Alias for `assignIn`.

### `extendWith(object, ...sources, customizer)`

Alias for `assignInWith`.

### `defaults(object, ...sources)`

Assigns own enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.

```typescript
import { defaults } from 'highdash';

console.log(defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 }));
// => { 'a': 1, 'b': 2 }
```

### `defaultsDeep(object, ...sources)`

Recursively assigns own enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.

```typescript
import { defaultsDeep } from 'highdash';

console.log(defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }));
// => { 'a': { 'b': 2, 'c': 3 } }
```

---

## Object Iteration Functions

### `findKey(object, predicate)`

Iterates over elements of `collection`, returning the first element `predicate` returns truthy for.

```typescript
import { findKey } from 'highdash';

const users = {
  'barney': { 'age': 36, 'active': true },
  'fred': { 'age': 40, 'active': false },
  'pebbles': { 'age': 1, 'active': true }
};

console.log(findKey(users, o => o.age < 40));
// => 'barney'

console.log(findKey(users, { 'age': 1, 'active': true }));
// => 'pebbles'

console.log(findKey(users, 'active'));
// => 'barney'
```

### `findLastKey(object, predicate)`

Iterates over elements of `collection`, returning the last element `predicate` returns truthy for.

```typescript
import { findLastKey } from 'highdash';

const users = {
  'barney': { 'age': 36, 'active': true },
  'fred': { 'age': 40, 'active': false },
  'pebbles': { 'age': 1, 'active': true }
};

console.log(findLastKey(users, o => o.age < 40));
// => 'pebbles'
```

### `forIn(object, iteratee)`

Iterates over own and inherited enumerable string keyed properties of `object` invoking `iteratee` for each property.

```typescript
import { forIn } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

forIn(new Foo(), (value, key) => {
  console.log(key);
});
// => Logs 'a', 'b', then 'c' (iteration order is not guaranteed)
```

### `forInRight(object, iteratee)`

Iterates over own and inherited enumerable string keyed properties of `object` invoking `iteratee` for each property in reverse order.

### `forOwn(object, iteratee)`

Iterates over own enumerable string keyed properties of `object` invoking `iteratee` for each property.

```typescript
import { forOwn } from 'highdash';

function Foo() {
  this.a = 1;
  this.b = 2;
}
Foo.prototype.c = 3;

forOwn(new Foo(), (value, key) => {
  console.log(key);
});
// => Logs 'a', then 'b' (iteration order is not guaranteed)
```

### `forOwnRight(object, iteratee)`

Iterates over own enumerable string keyed properties of `object` invoking `iteratee` for each property in reverse order.

---

## Object Utility Functions

### `functions(object)`

Creates an array of function property names from own enumerable properties of `object`.

```typescript
import { functions } from 'highdash';

function Foo() {
  this.a = () => 'a';
  this.b = () => 'b';
}
Foo.prototype.c = () => 'c';

console.log(functions(new Foo()));
// => ['a', 'b']
```

### `functionsIn(object)`

Creates an array of function property names from own and inherited enumerable properties of `object`.

```typescript
import { functionsIn } from 'highdash';

function Foo() {
  this.a = () => 'a';
  this.b = () => 'b';
}
Foo.prototype.c = () => 'c';

console.log(functionsIn(new Foo()));
// => ['a', 'b', 'c']
```

### `invert(object)`

Creates an object composed of the inverted keys and values of `object`.

```typescript
import { invert } from 'highdash';

const object = { 'a': 1, 'b': 2, 'c': 1 };
console.log(invert(object));
// => { '1': 'c', '2': 'b' }
```

### `invertBy(object, iteratee?)`

Creates an object composed of the inverted keys and values of `object` using `iteratee` to transform the inverted value.

```typescript
import { invertBy } from 'highdash';

const object = { 'a': 1, 'b': 2, 'c': 1 };
console.log(invertBy(object, value => `group${value}`));
// => { 'group1': ['a', 'c'], 'group2': ['b'] }
```

### `invoke(object, path, ...args)`

Invokes the method at `path` of `object`.

```typescript
import { invoke } from 'highdash';

const object = {
  'a': [{ 'b': { 'c': [1, 2, 3, 4] } }]
};

console.log(invoke(object, 'a[0].b.c.slice', 1, 3));
// => [2, 3]
```

### `mapKeys(object, iteratee)`

Creates an object with the same values as `object` and keys generated by running each own enumerable string keyed property of `object` through `iteratee`.

```typescript
import { mapKeys } from 'highdash';

console.log(mapKeys({ 'a': 1, 'b': 2 }, (value, key) => key.toUpperCase()));
// => { 'A': 1, 'B': 2 }
```

### `mergeWith(object, ...sources, customizer)`

Recursively merges own enumerable string keyed properties of source objects into the destination object using `customizer`.

### `result(object, path, defaultValue?)`

Resolves the value of property at `path` of `object`.

```typescript
import { result } from 'highdash';

const object = {
  'a': [{ 'b': { 'c1': 3, 'c2': () => 4 } }]
};

console.log(result(object, 'a[0].b.c1'));
// => 3

console.log(result(object, 'a[0].b.c2'));
// => 4

console.log(result(object, 'a[0].b.c3', 'default'));
// => 'default'
```

### `transform(object, iteratee, accumulator?)`

Transforms `object` to a new accumulator object which is the result of running each of its own enumerable string keyed properties through `iteratee`.

```typescript
import { transform } from 'highdash';

console.log(transform([2, 3, 4], (result, n) => {
  result.push(n *= n);
  return n % 2 === 0;
}, []));
// => [4, 9]
```

---

## Import Examples

```typescript
// Import specific functions
import { keys, values, get, set } from 'highdash';

// Import from specific module (better tree-shaking)
import { keys } from 'highdash/object/keys.js';
import { get } from 'highdash/object/get.js';
import { set } from 'highdash/object/set.js';

// Import all object functions
import * as object from 'highdash/object';
```

## Performance Notes

- **Property access**: Optimized for simple property access patterns
- **Path resolution**: Efficient path parsing and traversal
- **Memory usage**: Creates new objects for immutable operations
- **Type safety**: Full TypeScript support with proper type inference

## Common Use Cases

- **Property access**: Use `get`, `set`, `has` for safe property manipulation
- **Object iteration**: Use `keys`, `values`, `entries` for object traversal
- **Object merging**: Use `assign`, `defaults` for object composition
- **Deep operations**: Use `defaultsDeep`, `mergeWith` for complex merging
- **Property filtering**: Use `findKey`, `functions` for property discovery
- **Object transformation**: Use `transform`, `mapKeys` for data restructuring
