# Number Functions

Functions for working with numbers. These utilities provide number-specific operations and validation.

## Functions Overview

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`clamp`](#clamp) | Clamps number between bounds | `number`, `lower`, `upper` | Clamped number |
| [`inRange`](#inrange) | Checks if number in range | `number`, `start`, `end?` | Boolean |

---

## Number Functions

### `clamp(number, lower, upper)`

Clamps `number` within the inclusive `lower` and `upper` bounds.

```typescript
import { clamp } from 'highdash';

console.log(clamp(-10, -5, 5)); // -5
console.log(clamp(10, -5, 5)); // 5
console.log(clamp(3, -5, 5)); // 3

// Real-world examples
const temperature = clamp(150, 0, 100); // 100 (max temperature)
const percentage = clamp(-5, 0, 100); // 0 (min percentage)
const score = clamp(85, 0, 100); // 85 (within range)

// UI examples
const scrollPosition = clamp(scrollY, 0, maxScroll); // Keep within bounds
const opacity = clamp(userInput, 0, 1); // Keep between 0 and 1
const fontSize = clamp(dynamicSize, 12, 72); // Keep within readable range
```

### `inRange(number, start, end?)`

Checks if `number` is between `start` and up to, but not including, `end`. If `end` is not specified, it's set to `start` with `start` then set to `0`.

```typescript
import { inRange } from 'highdash';

console.log(inRange(3, 2, 4)); // true
console.log(inRange(4, 8)); // false
console.log(inRange(4, 2)); // true
console.log(inRange(2, 2)); // false
console.log(inRange(1.2, 2)); // true
console.log(inRange(5.2, 4)); // false
console.log(inRange(-3, -2, -6)); // true

// Real-world examples
const age = 25;
console.log(inRange(age, 18, 65)); // true (working age)

const score = 85;
console.log(inRange(score, 80, 100)); // true (good score)

const temperature = 72;
console.log(inRange(temperature, 68, 78)); // true (comfortable range)

// Array index validation
const index = 5;
const arrayLength = 10;
console.log(inRange(index, 0, arrayLength)); // true (valid index)

// Percentage validation
const percentage = 75;
console.log(inRange(percentage, 0, 100)); // true (valid percentage)
```

---

## Import Examples

```typescript
// Import specific functions
import { clamp, inRange } from 'highdash';

// Import from specific module (better tree-shaking)
import { clamp } from 'highdash/number/clamp.js';
import { inRange } from 'highdash/number/inRange.js';

// Import all number functions
import * as number from 'highdash/number';
```

## Performance Notes

- **Efficient operations**: Optimized for common number operations
- **NaN handling**: Graceful handling of NaN values
- **Type safety**: Full TypeScript support with proper type inference
- **Memory usage**: Minimal memory overhead for number operations

## Common Use Cases

- **Value validation**: Use `inRange` to validate user input
- **Value clamping**: Use `clamp` to keep values within bounds
- **UI constraints**: Use `clamp` for scroll positions, sizes, etc.
- **Data validation**: Use `inRange` for score ranges, age validation
- **Animation bounds**: Use `clamp` for animation values
- **Form validation**: Use `inRange` for numeric form fields
