# Utility Functions

General utility functions for various purposes. These utilities provide flow control, modern async operations, and helper functions.

## Functions Overview

### Flow Control

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`flow`](#flow) | Creates flow function | `...funcs` | Composed function |
| [`flowRight`](#flowright) | Creates right flow function | `...funcs` | Right-composed function |
| [`cond`](#cond) | Creates conditional function | `pairs` | Conditional function |
| [`attempt`](#attempt) | Attempts function execution | `func`, `...args` | Result or error |

### Modern Utilities

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`pDebounce`](#pdebounce) | Promise-aware debounce | `func`, `wait` | Debounced function returning promise |
| [`pThrottle`](#pthrottle) | Promise-aware throttle | `func`, `wait` | Throttled function returning promise |
| [`pMap`](#pmap) | Promise-aware map | `collection`, `mapper`, `options?` | Promise resolving to mapped array |
| [`retry`](#retry) | Retries function with backoff | `func`, `options?` | Promise resolving to result |
| [`timeout`](#timeout) | Wraps promise with timeout | `promise`, `ms`, `message?` | Promise with timeout |

### Utility Helpers

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`identity`](#identity) | Returns value | `value` | Same value |
| [`noop`](#noop) | No-operation function | None | undefined |
| [`constant`](#constant) | Creates constant function | `value` | Function returning value |
| [`matches`](#matches) | Creates matcher function | `source` | Matcher function |
| [`matchesProperty`](#matchesproperty) | Creates property matcher | `path`, `srcValue` | Property matcher function |
| [`property`](#property) | Creates property getter | `path` | Property getter function |
| [`propertyOf`](#propertyof) | Creates property getter | `object` | Property getter function |
| [`method`](#method) | Creates method invoker | `path`, `...args` | Method invoker function |
| [`methodOf`](#methodof) | Creates method invoker | `object`, `...args` | Method invoker function |
| [`iteratee`](#iteratee) | Creates iteratee function | `value` | Iteratee function |
| [`over`](#over) | Creates over function | `...iteratees` | Over function |
| [`overEvery`](#overevery) | Creates over-every function | `...predicates` | Over-every function |
| [`overSome`](#oversome) | Creates over-some function | `...predicates` | Over-some function |
| [`nthArg`](#ntharg) | Creates nth argument getter | `n?` | Argument getter function |
| [`conforms`](#conforms) | Creates conforms function | `source` | Conforms function |
| [`defaultTo`](#defaultto) | Returns default if nullish | `value`, `defaultValue` | Value or default |
| [`uniqueId`](#uniqueid) | Generates unique ID | `prefix?` | Unique ID string |
| [`random`](#random) | Generates random number | `lower?`, `upper?`, `floating?` | Random number |
| [`range`](#range) | Creates range array | `start?`, `end`, `step?` | Range array |
| [`rangeRight`](#rangeright) | Creates right range array | `start?`, `end`, `step?` | Right range array |
| [`times`](#times) | Executes function n times | `n`, `iteratee?` | Array of results |
| [`toPath`](#topath) | Converts to property path | `value` | Property path array |
| [`by`](#by) | Creates by function | `iteratee` | By function |
| [`thenBy`](#thenby) | Creates then-by function | `iteratee` | Then-by function |
| [`bindAll`](#bindall) | Binds all methods | `object`, `...methodNames` | Object with bound methods |
| [`mixin`](#mixin) | Mixes in functions | `object`, `source` | Modified object |

### Stub Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`stubArray`](#stubarray) | Returns empty array | None | Empty array |
| [`stubFalse`](#stubfalse) | Returns false | None | false |
| [`stubObject`](#stubobject) | Returns empty object | None | Empty object |
| [`stubString`](#stubstring) | Returns empty string | None | Empty string |
| [`stubTrue`](#stubtrue) | Returns true | None | true |

---

## Flow Control Functions

### `flow(...funcs)`

Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.

```typescript
import { flow } from 'highdash';

function square(n: number) {
  return n * n;
}

function add(a: number, b: number) {
  return a + b;
}

const addSquare = flow([add, square]);
console.log(addSquare(1, 2)); // 9 (1 + 2 = 3, then 3 * 3 = 9)

// Real-world example
const processUser = flow([
  (user: any) => ({ ...user, name: user.name.trim() }),
  (user: any) => ({ ...user, email: user.email.toLowerCase() }),
  (user: any) => ({ ...user, id: user.id || Math.random().toString(36) })
]);

const user = { name: '  John  ', email: 'JOHN@EXAMPLE.COM', id: '' };
console.log(processUser(user));
// => { name: 'John', email: 'john@example.com', id: 'abc123' }
```

### `flowRight(...funcs)`

Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous. This method is like `flow` except that it invokes functions from right to left.

```typescript
import { flowRight } from 'highdash';

function square(n: number) {
  return n * n;
}

function add(a: number, b: number) {
  return a + b;
}

const addSquare = flowRight([square, add]);
console.log(addSquare(1, 2)); // 9 (1 + 2 = 3, then 3 * 3 = 9)
```

### `cond(pairs)`

Creates a function that iterates over `pairs` and invokes the corresponding function of the first predicate to return truthy.

```typescript
import { cond } from 'highdash';

const func = cond([
  [x => x < 0, x => -x],
  [x => x === 0, x => 'zero'],
  [x => x > 0, x => x * 2]
]);

console.log(func(-5)); // 5
console.log(func(0)); // 'zero'
console.log(func(5)); // 10
```

### `attempt(func, ...args)`

Attempts to invoke `func`, returning either the result or the caught error object.

```typescript
import { attempt } from 'highdash';

const result = attempt(() => {
  throw new Error('Something went wrong');
});

console.log(result); // Error object

const success = attempt(() => {
  return 'Success!';
});

console.log(success); // 'Success!'
```

---

## Modern Utilities

### `pDebounce(func, wait)`

Promise-aware debounce. Collects calls within the wait window and resolves all callers with the result of the last invocation.

```typescript
import { pDebounce } from 'highdash';

const fn = async (x: number) => x * 2;
const debounced = pDebounce(fn, 100);

const [a, b] = await Promise.all([debounced(1), debounced(2)]);
// a === 4, b === 4 (both get the result of the last call)

// Real-world example
const searchAPI = pDebounce(async (query: string) => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
}, 300);

// Multiple rapid calls will only execute the last one
const results = await Promise.all([
  searchAPI('hello'),
  searchAPI('world'),
  searchAPI('test')
]);
// All three will get the result of searchAPI('test')
```

### `pThrottle(func, wait)`

Promise-aware throttle. Limits function execution to once per wait time.

```typescript
import { pThrottle } from 'highdash';

const apiCall = pThrottle(async (data: any) => {
  const response = await fetch('/api/data', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return response.json();
}, 1000);

// Multiple calls within 1 second will only execute the first one
const results = await Promise.all([
  apiCall({ id: 1 }),
  apiCall({ id: 2 }),
  apiCall({ id: 3 })
]);
// All three will get the result of the first call
```

### `pMap(collection, mapper, options?)`

Promise-aware map. Maps over a collection with concurrency control.

```typescript
import { pMap } from 'highdash';

const urls = ['/api/user/1', '/api/user/2', '/api/user/3'];
const users = await pMap(urls, async (url) => {
  const response = await fetch(url);
  return response.json();
}, { concurrency: 2 });

console.log(users); // Array of user objects

// Real-world example
const processFiles = async (files: File[]) => {
  return pMap(files, async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    return response.json();
  }, { concurrency: 3 });
};
```

### `retry(func, options?)`

Retries a function with exponential backoff.

```typescript
import { retry } from 'highdash';

const fetchData = retry(async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
}, { retries: 3, factor: 2 });

const data = await fetchData();

// Real-world example
const uploadFile = retry(async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });
  if (!response.ok) throw new Error('Upload failed');
  return response.json();
}, { retries: 5, factor: 1.5 });
```

### `timeout(promise, ms, message?)`

Wraps a promise with a timeout.

```typescript
import { timeout } from 'highdash';

const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};

const data = await timeout(fetchData(), 5000, 'Request timed out');

// Real-world example
const searchWithTimeout = async (query: string) => {
  const searchPromise = fetch(`/api/search?q=${query}`).then(r => r.json());
  return timeout(searchPromise, 3000, 'Search request timed out');
};
```

---

## Utility Helpers

### `identity(value)`

This method returns the first argument it receives.

```typescript
import { identity } from 'highdash';

const object = { 'a': 1 };
console.log(identity(object) === object); // true

// Useful for filtering
const numbers = [1, 2, 3, 4, 5];
const truthyNumbers = numbers.filter(identity); // [1, 2, 3, 4, 5]
```

### `noop()`

This method returns `undefined`.

```typescript
import { noop } from 'highdash';

console.log(noop()); // undefined

// Useful for default callbacks
const processData = (data: any, callback = noop) => {
  // Process data
  callback(data);
};
```

### `constant(value)`

Creates a function that returns `value`.

```typescript
import { constant } from 'highdash';

const alwaysTrue = constant(true);
console.log(alwaysTrue()); // true
console.log(alwaysTrue('anything')); // true

// Useful for default values
const getValue = (key: string, defaultValue = constant('default')) => {
  return defaultValue();
};
```

### `matches(source)`

Creates a function that performs a partial deep comparison between a given object and `source`.

```typescript
import { matches } from 'highdash';

const objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];

console.log(objects.filter(matches({ 'a': 4, 'c': 6 })));
// => [{ 'a': 4, 'b': 5, 'c': 6 }]
```

### `matchesProperty(path, srcValue)`

Creates a function that performs a partial deep comparison between a given object and `source`.

```typescript
import { matchesProperty } from 'highdash';

const objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
];

console.log(objects.filter(matchesProperty('a', 4)));
// => [{ 'a': 4, 'b': 5, 'c': 6 }]
```

### `property(path)`

Creates a function that returns the value at `path` of a given object.

```typescript
import { property } from 'highdash';

const objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];

console.log(objects.map(property('a.b'))); // [2, 1]
console.log(objects.map(property(['a', 'b']))); // [2, 1]
```

### `propertyOf(object)`

Creates a function that returns the value at `path` of a given object.

```typescript
import { propertyOf } from 'highdash';

const object = { 'a': { 'b': 2 } };
const getValue = propertyOf(object);

console.log(getValue('a.b')); // 2
console.log(getValue(['a', 'b'])); // 2
```

### `method(path, ...args)`

Creates a function that invokes the method at `path` of a given object.

```typescript
import { method } from 'highdash';

const objects = [
  { 'a': { 'b': () => 2 } },
  { 'a': { 'b': () => 1 } }
];

console.log(objects.map(method('a.b'))); // [2, 1]
```

### `methodOf(object, ...args)`

Creates a function that invokes the method at `path` of a given object.

```typescript
import { methodOf } from 'highdash';

const object = { 'a': { 'b': () => 2 } };
const invokeMethod = methodOf(object);

console.log(invokeMethod('a.b')); // 2
```

### `iteratee(value)`

Creates a function that returns the value at `path` of a given object.

```typescript
import { iteratee } from 'highdash';

const objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];

console.log(objects.map(iteratee('a.b'))); // [2, 1]
console.log(objects.map(iteratee(['a', 'b']))); // [2, 1]
```

### `over(...iteratees)`

Creates a function that invokes `iteratees` with the arguments it receives and returns their results.

```typescript
import { over } from 'highdash';

const func = over([Math.max, Math.min]);
console.log(func(1, 2, 3, 4)); // [4, 1]
```

### `overEvery(...predicates)`

Creates a function that checks if **all** of the `predicates` return truthy when invoked with the arguments it receives.

```typescript
import { overEvery } from 'highdash';

const func = overEvery([Boolean, isFinite]);
console.log(func('1')); // true
console.log(func(null)); // false
console.log(func(NaN)); // false
```

### `overSome(...predicates)`

Creates a function that checks if **any** of the `predicates` return truthy when invoked with the arguments it receives.

```typescript
import { overSome } from 'highdash';

const func = overSome([Boolean, isFinite]);
console.log(func('1')); // true
console.log(func(null)); // false
console.log(func(NaN)); // false
```

### `nthArg(n?)`

Creates a function that returns the nth argument.

```typescript
import { nthArg } from 'highdash';

const func = nthArg(1);
console.log(func('a', 'b', 'c', 'd')); // 'b'

const func2 = nthArg(-2);
console.log(func2('a', 'b', 'c', 'd')); // 'c'
```

### `conforms(source)`

Creates a function that invokes the method at `path` of a given object.

```typescript
import { conforms } from 'highdash';

const objects = [
  { 'a': 1, 'b': 2 },
  { 'a': 1, 'b': 1 }
];

console.log(objects.filter(conforms({ 'b': n => n > 1 })));
// => [{ 'a': 1, 'b': 2 }]
```

### `defaultTo(value, defaultValue)`

Returns `defaultValue` if `value` is `null` or `undefined`.

```typescript
import { defaultTo } from 'highdash';

console.log(defaultTo('a', 'b')); // 'a'
console.log(defaultTo(null, 'b')); // 'b'
console.log(defaultTo(undefined, 'b')); // 'b'
console.log(defaultTo('', 'b')); // ''
```

### `uniqueId(prefix?)`

Generates a unique ID.

```typescript
import { uniqueId } from 'highdash';

console.log(uniqueId()); // '1'
console.log(uniqueId('contact_')); // 'contact_2'
console.log(uniqueId()); // '3'
```

### `random(lower?, upper?, floating?)`

Generates a random number.

```typescript
import { random } from 'highdash';

console.log(random(0, 5)); // 3
console.log(random(5)); // 3
console.log(random(5, true)); // 3.2
console.log(random(1.2, 5.2)); // 3.2
```

### `range(start?, end, step?)`

Creates an array of numbers.

```typescript
import { range } from 'highdash';

console.log(range(4)); // [0, 1, 2, 3]
console.log(range(-4)); // [0, -1, -2, -3]
console.log(range(1, 5)); // [1, 2, 3, 4]
console.log(range(0, 20, 5)); // [0, 5, 10, 15]
```

### `rangeRight(start?, end, step?)`

Creates an array of numbers in reverse order.

```typescript
import { rangeRight } from 'highdash';

console.log(rangeRight(4)); // [3, 2, 1, 0]
console.log(rangeRight(-4)); // [-3, -2, -1, 0]
console.log(rangeRight(1, 5)); // [4, 3, 2, 1]
console.log(rangeRight(0, 20, 5)); // [15, 10, 5, 0]
```

### `times(n, iteratee?)`

Invokes the iteratee `n` times.

```typescript
import { times } from 'highdash';

console.log(times(3, String)); // ['0', '1', '2']
console.log(times(4, () => 0)); // [0, 0, 0, 0]
```

### `toPath(value)`

Converts `value` to a property path array.

```typescript
import { toPath } from 'highdash';

console.log(toPath('a.b.c')); // ['a', 'b', 'c']
console.log(toPath('a[0].b.c')); // ['a', '0', 'b', 'c']
```

### `by(iteratee)`

Creates a function that returns the value at `path` of a given object.

```typescript
import { by } from 'highdash';

const objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];

console.log(objects.map(by('a.b'))); // [2, 1]
```

### `thenBy(iteratee)`

Creates a function that returns the value at `path` of a given object.

```typescript
import { thenBy } from 'highdash';

const objects = [
  { 'a': { 'b': 2 } },
  { 'a': { 'b': 1 } }
];

console.log(objects.map(thenBy('a.b'))); // [2, 1]
```

### `bindAll(object, ...methodNames)`

Binds all methods of an object to the object itself.

```typescript
import { bindAll } from 'highdash';

const view = {
  label: 'docs',
  click: function() {
    console.log('clicked ' + this.label);
  }
};

bindAll(view, 'click');
const click = view.click;
click(); // 'clicked docs'
```

### `mixin(object, source)`

Mixes in functions from `source` to `object`.

```typescript
import { mixin } from 'highdash';

const object = { 'a': 1 };
const source = { 'b': 2 };

mixin(object, source);
console.log(object); // { 'a': 1, 'b': 2 }
```

---

## Stub Functions

### `stubArray()`

Returns an empty array.

```typescript
import { stubArray } from 'highdash';

console.log(stubArray()); // []
```

### `stubFalse()`

Returns `false`.

```typescript
import { stubFalse } from 'highdash';

console.log(stubFalse()); // false
```

### `stubObject()`

Returns an empty object.

```typescript
import { stubObject } from 'highdash';

console.log(stubObject()); // {}
```

### `stubString()`

Returns an empty string.

```typescript
import { stubString } from 'highdash';

console.log(stubString()); // ''
```

### `stubTrue()`

Returns `true`.

```typescript
import { stubTrue } from 'highdash';

console.log(stubTrue()); // true
```

---

## Import Examples

```typescript
// Import specific functions
import { flow, identity, pDebounce } from 'highdash';

// Import from specific module (better tree-shaking)
import { flow } from 'highdash/util/flow.js';
import { identity } from 'highdash/util/identity.js';
import { pDebounce } from 'highdash/util/pDebounce.js';

// Import all utility functions
import * as util from 'highdash/util';
```

## Performance Notes

- **Flow control**: Optimized for function composition
- **Modern utilities**: Promise-aware with efficient async handling
- **Memory usage**: Minimal memory overhead for utility operations
- **Type safety**: Full TypeScript support with proper type inference

## Common Use Cases

- **Function composition**: Use `flow`, `flowRight` for functional programming
- **Async operations**: Use `pDebounce`, `pThrottle`, `retry`, `timeout` for modern async patterns
- **Data processing**: Use `pMap` for concurrent processing
- **Utility helpers**: Use `identity`, `constant`, `noop` for functional programming
- **Property access**: Use `property`, `propertyOf` for dynamic property access
- **Conditional logic**: Use `cond`, `overEvery`, `overSome` for complex conditions
- **ID generation**: Use `uniqueId` for unique identifiers
- **Range generation**: Use `range`, `rangeRight` for number sequences
