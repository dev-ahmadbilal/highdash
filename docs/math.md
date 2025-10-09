# Math Functions

Mathematical operations and calculations. These utilities provide efficient mathematical operations for arrays and individual values.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`sum`](#sum) | Sums array values | `array` | Sum number |
| [`sumBy`](#sumby) | Sums by iteratee | `array`, `iteratee` | Sum number |
| [`maxBy`](#maxby) | Gets max by iteratee | `array`, `iteratee` | Max element |
| [`minBy`](#minby) | Gets min by iteratee | `array`, `iteratee` | Min element |
| [`add`](#add) | Adds two numbers | `augend`, `addend` | Sum number |
| [`divide`](#divide) | Divides two numbers | `dividend`, `divisor` | Quotient number |
| [`mean`](#mean) | Calculates mean | `array` | Mean number |
| [`meanBy`](#meanby) | Calculates mean by iteratee | `array`, `iteratee` | Mean number |
| [`multiply`](#multiply) | Multiplies two numbers | `multiplier`, `multiplicand` | Product number |
| [`subtract`](#subtract) | Subtracts two numbers | `minuend`, `subtrahend` | Difference number |

---

## Array Math Functions

### `sum(array)`

Computes the sum of the values in `array`.

```typescript
import { sum } from 'highdash';

console.log(sum([4, 2, 8, 6])); // 20
console.log(sum([1, 2, 3, 4, 5])); // 15
console.log(sum([])); // 0
console.log(sum([1, 2, NaN, 4])); // 7 (NaN treated as 0)

// Real-world examples
const prices = [19.99, 29.99, 39.99, 49.99];
console.log(sum(prices)); // 139.96

const scores = [85, 92, 78, 96, 88];
console.log(sum(scores)); // 439
```

### `sumBy(array, iteratee)`

Computes the sum of the values in `array` using `iteratee` to transform each element.

```typescript
import { sumBy } from 'highdash';

const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
console.log(sumBy(objects, o => o.n)); // 20
console.log(sumBy(objects, 'n')); // 20

// Real-world examples
const products = [
  { name: 'Laptop', price: 999, quantity: 2 },
  { name: 'Mouse', price: 25, quantity: 5 },
  { name: 'Keyboard', price: 75, quantity: 3 }
];

console.log(sumBy(products, 'price')); // 1099
console.log(sumBy(products, product => product.price * product.quantity)); // 2448

const employees = [
  { name: 'Alice', salary: 50000 },
  { name: 'Bob', salary: 60000 },
  { name: 'Charlie', salary: 55000 }
];

console.log(sumBy(employees, 'salary')); // 165000
```

### `maxBy(array, iteratee)`

This method is like `max` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.

```typescript
import { maxBy } from 'highdash';

const objects = [{ 'n': 1 }, { 'n': 2 }];
console.log(maxBy(objects, o => o.n)); // { 'n': 2 }
console.log(maxBy(objects, 'n')); // { 'n': 2 }

// Real-world examples
const products = [
  { name: 'Laptop', price: 999 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 75 }
];

console.log(maxBy(products, 'price')); // { name: 'Laptop', price: 999 }
console.log(maxBy(products, product => product.price)); // { name: 'Laptop', price: 999 }

const students = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 }
];

console.log(maxBy(students, 'score')); // { name: 'Bob', score: 92 }
```

### `minBy(array, iteratee)`

This method is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.

```typescript
import { minBy } from 'highdash';

const objects = [{ 'n': 1 }, { 'n': 2 }];
console.log(minBy(objects, o => o.n)); // { 'n': 1 }
console.log(minBy(objects, 'n')); // { 'n': 1 }

// Real-world examples
const products = [
  { name: 'Laptop', price: 999 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 75 }
];

console.log(minBy(products, 'price')); // { name: 'Mouse', price: 25 }

const students = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 }
];

console.log(minBy(students, 'score')); // { name: 'Charlie', score: 78 }
```

### `mean(array)`

Computes the mean of the values in `array`.

```typescript
import { mean } from 'highdash';

console.log(mean([4, 2, 8, 6])); // 5
console.log(mean([1, 2, 3, 4, 5])); // 3
console.log(mean([])); // NaN

// Real-world examples
const scores = [85, 92, 78, 96, 88];
console.log(mean(scores)); // 87.8

const temperatures = [72, 75, 78, 73, 76];
console.log(mean(temperatures)); // 74.8
```

### `meanBy(array, iteratee)`

Computes the mean of the values in `array` using `iteratee` to transform each element.

```typescript
import { meanBy } from 'highdash';

const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
console.log(meanBy(objects, o => o.n)); // 5
console.log(meanBy(objects, 'n')); // 5

// Real-world examples
const students = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 }
];

console.log(meanBy(students, 'score')); // 85

const products = [
  { name: 'Laptop', price: 999 },
  { name: 'Mouse', price: 25 },
  { name: 'Keyboard', price: 75 }
];

console.log(meanBy(products, 'price')); // 366.3333333333333
```

---

## Basic Math Functions

### `add(augend, addend)`

Adds two numbers.

```typescript
import { add } from 'highdash';

console.log(add(6, 4)); // 10
console.log(add(1.5, 2.5)); // 4
console.log(add(-5, 3)); // -2

// Real-world examples
const total = add(19.99, 29.99); // 49.98
const age = add(25, 5); // 30
```

### `subtract(minuend, subtrahend)`

Subtracts two numbers.

```typescript
import { subtract } from 'highdash';

console.log(subtract(6, 4)); // 2
console.log(subtract(1.5, 2.5)); // -1
console.log(subtract(-5, 3)); // -8

// Real-world examples
const discount = subtract(100, 15); // 85
const remaining = subtract(100, 25); // 75
```

### `multiply(multiplier, multiplicand)`

Multiplies two numbers.

```typescript
import { multiply } from 'highdash';

console.log(multiply(6, 4)); // 24
console.log(multiply(1.5, 2.5)); // 3.75
console.log(multiply(-5, 3)); // -15

// Real-world examples
const total = multiply(19.99, 2); // 39.98
const area = multiply(10, 5); // 50
```

### `divide(dividend, divisor)`

Divides two numbers.

```typescript
import { divide } from 'highdash';

console.log(divide(6, 4)); // 1.5
console.log(divide(1.5, 2.5)); // 0.6
console.log(divide(-15, 3)); // -5

// Real-world examples
const average = divide(100, 4); // 25
const rate = divide(50, 2); // 25
```

---

## Import Examples

```typescript
// Import specific functions
import { sum, sumBy, maxBy, add } from 'highdash';

// Import from specific module (better tree-shaking)
import { sum } from 'highdash/math/sum.js';
import { sumBy } from 'highdash/math/sumBy.js';
import { maxBy } from 'highdash/math/maxBy.js';
import { add } from 'highdash/math/add.js';

// Import all math functions
import * as math from 'highdash/math';
```

## Performance Notes

- **Array operations**: Optimized for large arrays with efficient iteration
- **Type safety**: Handles NaN values gracefully
- **Memory usage**: Minimal memory overhead for calculations
- **Type safety**: Full TypeScript support with proper type inference

## Common Use Cases

- **Data analysis**: Use `sum`, `mean`, `maxBy`, `minBy` for statistical analysis
- **Financial calculations**: Use `add`, `subtract`, `multiply`, `divide` for precise calculations
- **Array processing**: Use `sumBy`, `meanBy` for object array calculations
- **Performance metrics**: Use `maxBy`, `minBy` for finding extremes
- **Aggregation**: Use `sum`, `sumBy` for data aggregation
- **Averages**: Use `mean`, `meanBy` for calculating averages
