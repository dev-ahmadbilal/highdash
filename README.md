# Highdash

A modern TypeScript-first reimplementation of Lodash with better performance, type safety, and tree-shaking support.

## Features

- **TypeScript-first**: Full type safety with generics and strict mode
- **Modern JavaScript**: Uses ES202x features (`Array.flat`, `Object.fromEntries`, optional chaining, nullish coalescing, `Set/Map`, etc.)
- **Modular and tree-shakable**: Each function lives in its own file and can be imported individually
- **Lightweight**: Removes redundant utilities that are now covered by native APIs
- **Pure functions only**: No hidden mutations or side effects
- **Zero dependencies**: No external package dependencies
- **Comprehensive testing**: 170+ tests with 81%+ code coverage

## Installation

```bash
npm install highdash
```

## Usage

### Tree-shakable imports

```typescript
// Import only what you need
import { debounce, throttle, cloneDeep } from 'highdash';

// Or import everything
import * as _ from 'highdash';
```

### Core Functions

```typescript
import { debounce, throttle, cloneDeep, merge, uniq, groupBy } from 'highdash';

// Debounce a function
const debounced = debounce(() => console.log('Hello'), 1000);

// Throttle a function
const throttled = throttle(() => console.log('Hello'), 1000);

// Deep clone an object
const cloned = cloneDeep({ a: { b: 1 } });

// Merge objects
const merged = merge({ a: 1 }, { b: 2 }, { c: 3 });

// Remove duplicates
const unique = uniq([1, 1, 2, 2, 3, 3]);

// Group by property
const grouped = groupBy([{ age: 20 }, { age: 30 }], 'age');
```

### Collection Functions

```typescript
import { keyBy, partition, mapValues, pick, omit } from 'highdash';

// Create object from array with keys
const keyed = keyBy([{ id: 1, name: 'John' }], 'id');

// Partition array
const [evens, odds] = partition([1, 2, 3, 4], n => n % 2 === 0);

// Map object values
const mapped = mapValues({ a: 1, b: 2 }, x => x * 2);

// Pick properties
const picked = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);

// Omit properties
const omitted = omit({ a: 1, b: 2, c: 3 }, ['a', 'c']);
```

### Language Functions

```typescript
import { isEqual, isEmpty, isNil } from 'highdash';

// Deep equality check
const equal = isEqual({ a: 1 }, { a: 1 });

// Check if empty
const empty = isEmpty([]); // true
const notEmpty = isEmpty([1, 2, 3]); // false

// Check if null or undefined
const nil = isNil(null); // true
const notNil = isNil(0); // false
```

### Array Functions

```typescript
import { flatten, flattenDeep, chunk, compact } from 'highdash';

// Flatten one level
const flattened = flatten([1, [2, [3]]]);

// Flatten recursively
const deepFlattened = flattenDeep([1, [2, [3]]]);

// Chunk array
const chunks = chunk([1, 2, 3, 4], 2);

// Remove falsy values
const compacted = compact([0, 1, false, 2, '', 3]);
```

### Object Functions

```typescript
import { keys, values, entries, assign } from 'highdash';

// Get object keys
const objKeys = keys({ a: 1, b: 2 });

// Get object values
const objValues = values({ a: 1, b: 2 });

// Get object entries
const objEntries = entries({ a: 1, b: 2 });

// Assign properties
const assigned = assign({ a: 1 }, { b: 2 });
```

### Function Utilities

```typescript
import { once, memoize, curry } from 'highdash';

// Call function only once
const initialize = once(() => console.log('Initialized'));

// Memoize function
const memoized = memoize((x) => x * 2);

// Curry function
const curried = curry((a, b, c) => a + b + c);
```

### String Functions

```typescript
import { camelCase, kebabCase, snakeCase, startCase } from 'highdash';

// Convert to camelCase
const camel = camelCase('foo-bar'); // 'fooBar'

// Convert to kebab-case
const kebab = kebabCase('fooBar'); // 'foo-bar'

// Convert to snake_case
const snake = snakeCase('fooBar'); // 'foo_bar'

// Convert to Start Case
const start = startCase('fooBar'); // 'Foo Bar'
```

### Utility Functions

```typescript
import { random, range, times } from 'highdash';

// Generate random number
const rand = random(1, 10);

// Generate range
const numbers = range(1, 5); // [1, 2, 3, 4]

// Call function n times
const results = times(3, (i) => i * 2); // [0, 2, 4]
```

## API Reference

### Core Functions

- `debounce(func, wait, options)` - Creates a debounced function
- `throttle(func, wait, options)` - Creates a throttled function
- `cloneDeep(value)` - Creates a deep clone of a value
- `merge(object, ...sources)` - Recursively merges objects
- `uniq(array)` - Creates a duplicate-free array
- `groupBy(collection, iteratee)` - Groups elements by key

### Collection Functions

- `keyBy(collection, iteratee)` - Creates an object from array with keys
- `partition(collection, predicate)` - Splits array into two groups
- `mapValues(object, iteratee)` - Maps object values
- `pick(object, paths)` - Picks object properties
- `omit(object, paths)` - Omits object properties

### Language Functions

- `isEqual(value, other)` - Performs deep equality check
- `isEmpty(value)` - Checks if value is empty
- `isNil(value)` - Checks if value is null or undefined

### Array Functions

- `flatten(array)` - Flattens array one level deep
- `flattenDeep(array)` - Flattens array recursively
- `chunk(array, size)` - Creates array chunks
- `compact(array)` - Removes falsy values

### Object Functions

- `keys(object)` - Gets object keys
- `values(object)` - Gets object values
- `entries(object)` - Gets object entries
- `assign(object, ...sources)` - Assigns properties

### Function Utilities

- `once(func)` - Restricts function to one call
- `memoize(func, resolver)` - Memoizes function results
- `curry(func, arity)` - Curries a function

### String Functions

- `camelCase(string)` - Converts to camelCase
- `kebabCase(string)` - Converts to kebab-case
- `snakeCase(string)` - Converts to snake_case
- `startCase(string)` - Converts to Start Case

### Utility Functions

- `random(lower, upper, floating)` - Generates random number
- `range(start, end, step)` - Generates number range
- `times(n, iteratee)` - Calls function n times

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
git clone https://github.com/dev-ahmadbilal/highdash.git
cd highdash
npm install
```

### Scripts

```bash
# Build the project
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Testing

The project includes comprehensive tests with Jest:

- 170+ test cases
- 81%+ code coverage
- Tests for all functions and edge cases
- Type safety validation

## Performance

Highdash is optimized for performance:

- Uses modern JavaScript features for better performance
- Tree-shakable imports reduce bundle size
- Minimal overhead compared to native implementations
- Efficient algorithms for complex operations

## TypeScript Support

Full TypeScript support with:

- Strict type checking
- Generic type parameters
- Proper return type inference
- Comprehensive type definitions

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## Roadmap

- [ ] Performance benchmarks
- [ ] Additional utility functions
- [ ] Browser compatibility improvements
- [ ] Documentation website
- [ ] Performance optimizations

## Acknowledgments

- Inspired by [Lodash](https://lodash.com/)
- Built with modern TypeScript and JavaScript
- Thanks to all contributors and the open source community