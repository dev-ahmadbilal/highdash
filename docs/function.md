# Function Utilities

Functions for working with functions and functional programming. These utilities provide powerful function manipulation, composition, and optimization capabilities.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`once`](#once) | Creates function that runs once | `func` | Function that runs once |
| [`memoize`](#memoize) | Creates memoized function | `func`, `resolver?` | Memoized function |
| [`curry`](#curry) | Creates curried function | `func`, `arity?` | Curried function |
| [`curryRight`](#curryright) | Creates right-curried function | `func`, `arity?` | Right-curried function |
| [`after`](#after) | Creates function that runs after n calls | `n`, `func` | Function that runs after n calls |
| [`before`](#before) | Creates function that runs before n calls | `n`, `func` | Function that runs before n calls |
| [`defer`](#defer) | Defers function execution | `func`, `...args` | Timer ID |
| [`delay`](#delay) | Delays function execution | `func`, `wait`, `...args` | Timer ID |
| [`flip`](#flip) | Creates function with flipped arguments | `func` | Function with flipped arguments |
| [`negate`](#negate) | Creates negated function | `predicate` | Negated function |
| [`partial`](#partial) | Creates partially applied function | `func`, `...partials` | Partially applied function |
| [`partialRight`](#partialright) | Creates right-partially applied function | `func`, `...partials` | Right-partially applied function |
| [`ary`](#ary) | Creates function with capped arguments | `func`, `n?` | Function with capped arguments |
| [`unary`](#unary) | Creates unary function | `func` | Unary function |
| [`wrap`](#wrap) | Creates wrapped function | `value`, `wrapper` | Wrapped function |
| [`rearg`](#rearg) | Creates function with reordered arguments | `func`, `indexes` | Function with reordered arguments |
| [`rest`](#rest) | Creates function with rest parameters | `func`, `start?` | Function with rest parameters |
| [`spread`](#spread) | Creates function that spreads arguments | `func`, `start?` | Function that spreads arguments |
| [`bind`](#bind) | Creates bound function | `func`, `thisArg`, `...partials` | Bound function |
| [`bindKey`](#bindkey) | Creates bound method | `object`, `key`, `...partials` | Bound method |

---

## Function Control Functions

### `once(func)`

Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.

```typescript
import { once } from 'highdash';

const initialize = once(() => console.log('Initialized'));
initialize();
// => 'Initialized'
initialize();
// => 'Initialized' (no output)

// With expensive computation
const expensiveCalculation = once(() => {
  console.log('Computing...');
  return Math.random() * 1000;
});

console.log(expensiveCalculation()); // Computing... 123.45
console.log(expensiveCalculation()); // 123.45 (cached)
console.log(expensiveCalculation()); // 123.45 (cached)
```

### `memoize(func, resolver?)`

Creates a function that memoizes the result of `func`. If `resolver` is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function.

```typescript
import { memoize } from 'highdash';

// Basic memoization
const fibonacci = memoize((n: number): number => {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Computed
console.log(fibonacci(10)); // Cached

// With custom resolver
const expensiveOperation = memoize(
  (a: number, b: number) => {
    console.log('Computing...');
    return a * b;
  },
  (a, b) => `${a}-${b}` // Custom cache key
);

console.log(expensiveOperation(2, 3)); // Computing... 6
console.log(expensiveOperation(2, 3)); // 6 (cached)
console.log(expensiveOperation(3, 2)); // Computing... 6 (different key)

// Access cache
console.log(expensiveOperation.cache.size); // 2
```

### `after(n, func)`

Creates a function that invokes `func` after `n` calls.

```typescript
import { after } from 'highdash';

const done = after(3, () => console.log('All done!'));

done(); // No output
done(); // No output
done(); // 'All done!'
done(); // 'All done!' (continues to execute)

// Real-world example
const saveData = after(5, () => {
  console.log('Saving data...');
  // Save to database
});

// User interactions
saveData(); // User clicks
saveData(); // User scrolls
saveData(); // User types
saveData(); // User hovers
saveData(); // User clicks again - triggers save
```

### `before(n, func)`

Creates a function that invokes `func` before `n` calls.

```typescript
import { before } from 'highdash';

const limitedFunction = before(3, () => console.log('Called'));

limitedFunction(); // 'Called'
limitedFunction(); // 'Called'
limitedFunction(); // 'Called'
limitedFunction(); // No output (limit reached)

// Rate limiting example
const apiCall = before(10, () => {
  console.log('Making API call...');
  // Make API request
});

// Multiple calls
for (let i = 0; i < 15; i++) {
  apiCall(); // Only first 10 will execute
}
```

---

## Function Composition Functions

### `curry(func, arity?)`

Creates a function that accepts arguments of `func` and either invokes `func` returning its result, if at least `arity` number of arguments have been provided, or returns a function that accepts the remaining `func` arguments.

```typescript
import { curry } from 'highdash';

const add = (a: number, b: number, c: number) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
console.log(curriedAdd(1, 2, 3)); // 6

// Partial application
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6

// Real-world example
const fetchData = curry((url: string, options: any, callback: Function) => {
  // Fetch implementation
});

const fetchUsers = fetchData('/api/users');
const fetchUsersWithAuth = fetchUsers({ headers: { auth: 'token' } });
fetchUsersWithAuth(console.log);
```

### `curryRight(func, arity?)`

Creates a function that accepts arguments of `func` and either invokes `func` returning its result, if at least `arity` number of arguments have been provided, or returns a function that accepts the remaining `func` arguments from the right.

```typescript
import { curryRight } from 'highdash';

const divide = (a: number, b: number) => a / b;
const curriedDivide = curryRight(divide);

console.log(curriedDivide(2)(10)); // 5 (10 / 2)
console.log(curriedDivide(10, 2)); // 5

// Useful for operations where rightmost argument is most likely to change
const formatMessage = curryRight((template: string, data: any) => {
  return template.replace(/\{(\w+)\}/g, (match, key) => data[key] || match);
});

const formatUserMessage = formatMessage('Hello {name}, you have {count} messages');
console.log(formatUserMessage({ name: 'Alice', count: 5 })); // 'Hello Alice, you have 5 messages'
```

### `partial(func, ...partials)`

Creates a function that invokes `func` with `partials` prepended to the arguments it receives.

```typescript
import { partial } from 'highdash';

const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const sayHello = partial(greet, 'Hello');

console.log(sayHello('Alice')); // 'Hello, Alice!'
console.log(sayHello('Bob')); // 'Hello, Bob!'

// Multiple partials
const multiply = (a: number, b: number, c: number) => a * b * c;
const double = partial(multiply, 2);
const doubleAndTriple = partial(multiply, 2, 3);

console.log(double(4, 5)); // 40 (2 * 4 * 5)
console.log(doubleAndTriple(4)); // 24 (2 * 3 * 4)
```

### `partialRight(func, ...partials)`

Creates a function that invokes `func` with `partials` appended to the arguments it receives.

```typescript
import { partialRight } from 'highdash';

const greet = (greeting: string, name: string) => `${greeting}, ${name}!`;
const greetAlice = partialRight(greet, 'Alice');

console.log(greetAlice('Hello')); // 'Hello, Alice!'
console.log(greetAlice('Hi')); // 'Hi, Alice!'

// Useful for callbacks
const processData = (data: any, callback: Function, errorHandler: Function) => {
  try {
    callback(data);
  } catch (error) {
    errorHandler(error);
  }
};

const processWithErrorHandler = partialRight(processData, (error: Error) => {
  console.error('Error:', error.message);
});

processWithErrorHandler({ id: 1 }, (data: any) => {
  console.log('Processing:', data);
});
```

---

## Function Transformation Functions

### `flip(func)`

Creates a function that invokes `func` with arguments reversed.

```typescript
import { flip } from 'highdash';

const subtract = (a: number, b: number) => a - b;
const flippedSubtract = flip(subtract);

console.log(subtract(5, 3)); // 2
console.log(flippedSubtract(5, 3)); // -2 (3 - 5)

// Useful for operations where you want to reverse argument order
const hasProperty = (obj: any, prop: string) => prop in obj;
const hasPropertyFlipped = flip(hasProperty);

console.log(hasProperty({ a: 1 }, 'a')); // true
console.log(hasPropertyFlipped('a', { a: 1 })); // true
```

### `negate(predicate)`

Creates a function that negates the result of the `predicate` function.

```typescript
import { negate } from 'highdash';

const isEven = (n: number) => n % 2 === 0;
const isOdd = negate(isEven);

console.log(isEven(4)); // true
console.log(isOdd(4)); // false
console.log(isOdd(3)); // true

// Useful for filtering
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(isEven); // [2, 4, 6]
const odds = numbers.filter(isOdd); // [1, 3, 5]

// Complex predicates
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isInvalidEmail = negate(isValidEmail);

console.log(isValidEmail('test@example.com')); // true
console.log(isInvalidEmail('test@example.com')); // false
```

### `ary(func, n?)`

Creates a function that invokes `func` with up to `n` arguments, ignoring any additional arguments.

```typescript
import { ary } from 'highdash';

const add = (a: number, b: number, c: number) => a + b + c;
const addTwo = ary(add, 2);

console.log(add(1, 2, 3)); // 6
console.log(addTwo(1, 2, 3)); // 3 (ignores third argument)

// Useful for array methods that pass extra arguments
const numbers = [1, 2, 3, 4, 5];
const parseFloat = (value: string) => Number.parseFloat(value);

// Array.map passes (value, index, array) but parseFloat only needs value
const parsed = numbers.map(ary(parseFloat, 1));
console.log(parsed); // [1, 2, 3, 4, 5]
```

### `unary(func)`

Creates a function that accepts up to one argument, ignoring any additional arguments.

```typescript
import { unary } from 'highdash';

const add = (a: number, b: number) => a + b;
const addOne = unary(add);

console.log(add(1, 2)); // 3
console.log(addOne(1, 2)); // NaN (ignores second argument)

// Useful for array methods
const numbers = ['1', '2', '3', '4', '5'];
const parsed = numbers.map(unary(Number.parseInt));
console.log(parsed); // [1, 2, 3, 4, 5]
```

### `wrap(value, wrapper)`

Creates a function that provides `value` to `wrapper` as its first argument.

```typescript
import { wrap } from 'highdash';

const p = wrap(escape, (func, text) => `<p>${func(text)}</p>`);
console.log(p('fred, barney, & pebbles'));
// => '<p>fred, barney, &amp; pebbles</p>'

// More complex example
const log = wrap(console.log, (func, ...args) => {
  const timestamp = new Date().toISOString();
  func(`[${timestamp}]`, ...args);
});

log('Hello', 'World'); // [2023-01-01T12:00:00.000Z] Hello World
```

---

## Function Utility Functions

### `defer(func, ...args)`

Defers invoking `func` until the current call stack has cleared.

```typescript
import { defer } from 'highdash';

defer((text: string) => {
  console.log(text);
}, 'deferred');

console.log('immediate');
// => 'immediate'
// => 'deferred'
```

### `delay(func, wait, ...args)`

Invokes `func` after `wait` milliseconds.

```typescript
import { delay } from 'highdash';

delay((text: string) => {
  console.log(text);
}, 1000, 'later');

console.log('now');
// => 'now'
// => 'later' (after 1 second)
```

### `rearg(func, indexes)`

Creates a function that invokes `func` with arguments arranged according to the specified `indexes`.

```typescript
import { rearg } from 'highdash';

const rearged = rearg((a: number, b: number, c: number) => [a, b, c], [2, 0, 1]);
console.log(rearged('b', 'c', 'a'));
// => ['a', 'b', 'c']
```

### `rest(func, start?)`

Creates a function that invokes `func` with the `this` binding and arguments of the created function, while it's called less than `n` times.

```typescript
import { rest } from 'highdash';

const say = rest((...args: string[]) => args.join(' '));
console.log(say('hello', 'world', '!'));
// => 'hello world !'
```

### `spread(func, start?)`

Creates a function that invokes `func` with the `this` binding and arguments of the created function, while it's called less than `n` times.

```typescript
import { spread } from 'highdash';

const say = spread((a: string, b: string, c: string) => `${a} ${b} ${c}`);
console.log(say(['hello', 'world', '!']));
// => 'hello world !'
```

### `bind(func, thisArg, ...partials)`

Creates a function that invokes `func` with the `this` binding of `thisArg` and `partials` prepended to the arguments it receives.

```typescript
import { bind } from 'highdash';

const greet = function(this: any, greeting: string, punctuation: string) {
  return `${greeting} ${this.name}${punctuation}`;
};

const person = { name: 'Alice' };
const boundGreet = bind(greet, person, 'Hello');
console.log(boundGreet('!')); // 'Hello Alice!'
```

### `bindKey(object, key, ...partials)`

Creates a function that invokes the method at `object[key]` with `partials` prepended to the arguments it receives.

```typescript
import { bindKey } from 'highdash';

const object = {
  user: 'fred',
  greet: function(this: any, greeting: string, punctuation: string) {
    return `${greeting} ${this.user}${punctuation}`;
  }
};

const boundGreet = bindKey(object, 'greet', 'hi');
console.log(boundGreet('!')); // 'hi fred!'
```

---

## Import Examples

```typescript
// Import specific functions
import { once, memoize, curry } from 'highdash';

// Import from specific module (better tree-shaking)
import { once } from 'highdash/function/once.js';
import { memoize } from 'highdash/function/memoize.js';
import { curry } from 'highdash/function/curry.js';

// Import all function utilities
import * as func from 'highdash/function';
```

## Performance Notes

- **Memoization**: Uses Map for efficient caching
- **Currying**: Optimized for common use cases
- **Memory usage**: Efficient closure management
- **Type safety**: Full TypeScript support with proper type inference

## Common Use Cases

- **Performance optimization**: Use `memoize` for expensive computations
- **Function composition**: Use `curry`, `partial` for functional programming
- **Event handling**: Use `once`, `after`, `before` for event management
- **Argument manipulation**: Use `flip`, `negate`, `ary` for function transformation
- **Method binding**: Use `bind`, `bindKey` for context management
- **Async operations**: Use `defer`, `delay` for timing control
