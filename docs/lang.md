# Language Functions

Type checking, comparison, and conversion utilities. These functions provide comprehensive type validation, equality checking, and data transformation capabilities.

## Functions Overview

### Type Checking Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`isArray`](#isarray) | Checks if value is array | `value` | Boolean |
| [`isArrayLike`](#isarraylike) | Checks if array-like | `value` | Boolean |
| [`isArrayLikeObject`](#isarraylikeobject) | Checks if array-like object | `value` | Boolean |
| [`isArrayBuffer`](#isarraybuffer) | Checks if ArrayBuffer | `value` | Boolean |
| [`isBoolean`](#isboolean) | Checks if boolean | `value` | Boolean |
| [`isBuffer`](#isbuffer) | Checks if Buffer | `value` | Boolean |
| [`isDate`](#isdate) | Checks if Date | `value` | Boolean |
| [`isElement`](#iselement) | Checks if DOM element | `value` | Boolean |
| [`isError`](#iserror) | Checks if Error | `value` | Boolean |
| [`isFunction`](#isfunction) | Checks if function | `value` | Boolean |
| [`isMap`](#ismap) | Checks if Map | `value` | Boolean |
| [`isNull`](#isnull) | Checks if null | `value` | Boolean |
| [`isNumber`](#isnumber) | Checks if number | `value` | Boolean |
| [`isObject`](#isobject) | Checks if object | `value` | Boolean |
| [`isObjectLike`](#isobjectlike) | Checks if object-like | `value` | Boolean |
| [`isPlainObject`](#isplainobject) | Checks if plain object | `value` | Boolean |
| [`isRegExp`](#isregexp) | Checks if RegExp | `value` | Boolean |
| [`isSet`](#isset) | Checks if Set | `value` | Boolean |
| [`isString`](#isstring) | Checks if string | `value` | Boolean |
| [`isSymbol`](#issymbol) | Checks if Symbol | `value` | Boolean |
| [`isTypedArray`](#istypedarray) | Checks if TypedArray | `value` | Boolean |
| [`isUndefined`](#isundefined) | Checks if undefined | `value` | Boolean |
| [`isWeakMap`](#isweakmap) | Checks if WeakMap | `value` | Boolean |
| [`isWeakSet`](#isweakset) | Checks if WeakSet | `value` | Boolean |
| [`isArguments`](#isarguments) | Checks if arguments object | `value` | Boolean |
| [`isLength`](#islength) | Checks if valid array length | `value` | Boolean |
| [`isNative`](#isnative) | Checks if native function | `value` | Boolean |
| [`isNil`](#isnil) | Checks if null or undefined | `value` | Boolean |
| [`isEmpty`](#isempty) | Checks if empty | `value` | Boolean |

### Comparison Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`isEqual`](#isequal) | Deep equality check | `value`, `other` | Boolean |
| [`isEqualWith`](#isequalwith) | Deep equality with customizer | `value`, `other`, `customizer` | Boolean |
| [`isMatch`](#ismatch) | Partial deep comparison | `object`, `source` | Boolean |
| [`isMatchWith`](#ismatchwith) | Partial comparison with customizer | `object`, `source`, `customizer` | Boolean |
| [`conformsTo`](#conformsto) | Checks if object conforms | `object`, `source` | Boolean |
| [`eq`](#eq) | Checks if equal | `value`, `other` | Boolean |
| [`gt`](#gt) | Checks if greater than | `value`, `other` | Boolean |
| [`gte`](#gte) | Checks if greater than or equal | `value`, `other` | Boolean |
| [`lt`](#lt) | Checks if less than | `value`, `other` | Boolean |
| [`lte`](#lte) | Checks if less than or equal | `value`, `other` | Boolean |

### Conversion Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| [`toArray`](#toarray) | Converts to array | `value` | Array |
| [`toNumber`](#tonumber) | Converts to number | `value` | Number |
| [`toString`](#tostring) | Converts to string | `value` | String |
| [`castArray`](#castarray) | Casts to array | `value` | Array |
| [`clone`](#clone) | Shallow clone | `value` | Cloned value |
| [`cloneWith`](#clonewith) | Clone with customizer | `value`, `customizer` | Cloned value |
| [`toFinite`](#tofinite) | Converts to finite number | `value` | Finite number |
| [`toInteger`](#tointeger) | Converts to integer | `value` | Integer |
| [`toLength`](#tolength) | Converts to array length | `value` | Valid length |
| [`toSafeInteger`](#tosafeinteger) | Converts to safe integer | `value` | Safe integer |
| [`toPlainObject`](#toplainobject) | Converts to plain object | `value` | Plain object |

---

## Type Checking Functions

### `isArray(value)`

Checks if `value` is classified as an `Array` object.

```typescript
import { isArray } from 'highdash';

console.log(isArray([1, 2, 3])); // true
console.log(isArray('abc')); // false
console.log(isArray(document.body.children)); // false
```

### `isArrayLike(value)`

Checks if `value` is array-like. A value is considered array-like if it's not a function and has a `value.length` that's an integer greater than or equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.

```typescript
import { isArrayLike } from 'highdash';

console.log(isArrayLike([1, 2, 3])); // true
console.log(isArrayLike('abc')); // true
console.log(isArrayLike(document.body.children)); // true
console.log(isArrayLike(function() {})); // false
```

### `isArrayLikeObject(value)`

Checks if `value` is array-like and an object.

```typescript
import { isArrayLikeObject } from 'highdash';

console.log(isArrayLikeObject([1, 2, 3])); // true
console.log(isArrayLikeObject(document.body.children)); // true
console.log(isArrayLikeObject('abc')); // false
```

### `isArrayBuffer(value)`

Checks if `value` is an `ArrayBuffer`.

```typescript
import { isArrayBuffer } from 'highdash';

console.log(isArrayBuffer(new ArrayBuffer(2))); // true
console.log(isArrayBuffer(new Array(2))); // false
```

### `isBoolean(value)`

Checks if `value` is classified as a boolean primitive or object.

```typescript
import { isBoolean } from 'highdash';

console.log(isBoolean(false)); // true
console.log(isBoolean(null)); // false
```

### `isBuffer(value)`

Checks if `value` is a Buffer.

```typescript
import { isBuffer } from 'highdash';

console.log(isBuffer(Buffer.alloc(2))); // true
console.log(isBuffer(new Uint8Array(2))); // false
```

### `isDate(value)`

Checks if `value` is classified as a `Date` object.

```typescript
import { isDate } from 'highdash';

console.log(isDate(new Date())); // true
console.log(isDate('Mon April 23 2012')); // false
```

### `isElement(value)`

Checks if `value` is likely a DOM element.

```typescript
import { isElement } from 'highdash';

console.log(isElement(document.body)); // true
console.log(isElement('<body>')); // false
```

### `isError(value)`

Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, or `URIError` object.

```typescript
import { isError } from 'highdash';

console.log(isError(new Error())); // true
console.log(isError(Error)); // false
```

### `isFunction(value)`

Checks if `value` is classified as a `Function` object.

```typescript
import { isFunction } from 'highdash';

console.log(isFunction(Array.isArray)); // true
console.log(isFunction(/abc/)); // false
```

### `isMap(value)`

Checks if `value` is classified as a `Map` object.

```typescript
import { isMap } from 'highdash';

console.log(isMap(new Map())); // true
console.log(isMap(new WeakMap())); // false
```

### `isNull(value)`

Checks if `value` is `null`.

```typescript
import { isNull } from 'highdash';

console.log(isNull(null)); // true
console.log(isNull(void 0)); // false
```

### `isNumber(value)`

Checks if `value` is classified as a `Number` primitive or object.

```typescript
import { isNumber } from 'highdash';

console.log(isNumber(3)); // true
console.log(isNumber(Number.MIN_VALUE)); // true
console.log(isNumber(Infinity)); // true
console.log(isNumber('3')); // false
```

### `isObject(value)`

Checks if `value` is the language type of `Object` (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`).

```typescript
import { isObject } from 'highdash';

console.log(isObject({})); // true
console.log(isObject([1, 2, 3])); // true
console.log(isObject(Function)); // true
console.log(isObject(null)); // false
```

### `isObjectLike(value)`

Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".

```typescript
import { isObjectLike } from 'highdash';

console.log(isObjectLike({})); // true
console.log(isObjectLike([1, 2, 3])); // true
console.log(isObjectLike(Function)); // false
console.log(isObjectLike(null)); // false
```

### `isPlainObject(value)`

Checks if `value` is a plain object, that is, an object created by the `Object` constructor or one with a `[[Prototype]]` of `null`.

```typescript
import { isPlainObject } from 'highdash';

console.log(isPlainObject({})); // true
console.log(isPlainObject([1, 2, 3])); // false
console.log(isPlainObject(new Date())); // false
```

### `isRegExp(value)`

Checks if `value` is classified as a `RegExp` object.

```typescript
import { isRegExp } from 'highdash';

console.log(isRegExp(/abc/)); // true
console.log(isRegExp('/abc/')); // false
```

### `isSet(value)`

Checks if `value` is classified as a `Set` object.

```typescript
import { isSet } from 'highdash';

console.log(isSet(new Set())); // true
console.log(isSet(new WeakSet())); // false
```

### `isString(value)`

Checks if `value` is classified as a `String` primitive or object.

```typescript
import { isString } from 'highdash';

console.log(isString('abc')); // true
console.log(isString(new String('abc'))); // true
console.log(isString(1)); // false
```

### `isSymbol(value)`

Checks if `value` is classified as a `Symbol` primitive or object.

```typescript
import { isSymbol } from 'highdash';

console.log(isSymbol(Symbol.iterator)); // true
console.log(isSymbol('abc')); // false
```

### `isTypedArray(value)`

Checks if `value` is classified as a typed array.

```typescript
import { isTypedArray } from 'highdash';

console.log(isTypedArray(new Uint8Array())); // true
console.log(isTypedArray([])); // false
```

### `isUndefined(value)`

Checks if `value` is `undefined`.

```typescript
import { isUndefined } from 'highdash';

console.log(isUndefined(void 0)); // true
console.log(isUndefined(null)); // false
```

### `isWeakMap(value)`

Checks if `value` is classified as a `WeakMap` object.

```typescript
import { isWeakMap } from 'highdash';

console.log(isWeakMap(new WeakMap())); // true
console.log(isWeakMap(new Map())); // false
```

### `isWeakSet(value)`

Checks if `value` is classified as a `WeakSet` object.

```typescript
import { isWeakSet } from 'highdash';

console.log(isWeakSet(new WeakSet())); // true
console.log(isWeakSet(new Set())); // false
```

### `isArguments(value)`

Checks if `value` is likely an `arguments` object.

```typescript
import { isArguments } from 'highdash';

function test() {
  console.log(isArguments(arguments)); // true
}
test();
```

### `isLength(value)`

Checks if `value` is a valid array-like length.

```typescript
import { isLength } from 'highdash';

console.log(isLength(3)); // true
console.log(isLength(Number.MIN_VALUE)); // false
console.log(isLength(Infinity)); // false
```

### `isNative(value)`

Checks if `value` is a native function.

```typescript
import { isNative } from 'highdash';

console.log(isNative(Array.prototype.push)); // true
console.log(isNative(() => {})); // false
```

### `isNil(value)`

Checks if `value` is `null` or `undefined`.

```typescript
import { isNil } from 'highdash';

console.log(isNil(null)); // true
console.log(isNil(undefined)); // true
console.log(isNil(NaN)); // false
```

### `isEmpty(value)`

Checks if `value` is an empty object, collection, map, or set.

```typescript
import { isEmpty } from 'highdash';

console.log(isEmpty(null)); // true
console.log(isEmpty(true)); // true
console.log(isEmpty(1)); // true
console.log(isEmpty([1, 2, 3])); // false
console.log(isEmpty('abc')); // false
console.log(isEmpty({ 'a': 1 })); // false
```

---

## Comparison Functions

### `isEqual(value, other)`

Performs a deep comparison between two values to determine if they are equivalent.

**Features:**
- Cycle-safe comparison
- Compares enumerable symbol keys
- Supports ArrayBuffer, Map, Set, Date, RegExp
- Uses SameValueZero for primitives

```typescript
import { isEqual } from 'highdash';

console.log(isEqual({ a: 1 }, { a: 1 })); // true
console.log(isEqual([1, 2], [1, 2])); // true
console.log(isEqual(new Set([1,2]), new Set([2,1]))); // true
console.log(isEqual({ a: { b: 1 } }, { a: { b: 1 } })); // true
```

### `isEqualWith(value, other, customizer)`

This method is like `isEqual` except that it accepts `customizer` which is invoked to compare values.

```typescript
import { isEqualWith } from 'highdash';

function customizer(objValue: any, otherValue: any) {
  if (objValue === otherValue) return true;
  if (objValue == null || otherValue == null) return false;
  if (Array.isArray(objValue) && Array.isArray(otherValue)) {
    return objValue.length === otherValue.length;
  }
}

console.log(isEqualWith([1, 2], [1, 2], customizer)); // true
```

### `isMatch(object, source)`

Performs a partial deep comparison between `object` and `source` to determine if `object` contains equivalent property values.

```typescript
import { isMatch } from 'highdash';

const object = { 'a': 1, 'b': 2 };
console.log(isMatch(object, { 'b': 2 })); // true
console.log(isMatch(object, { 'b': 1 })); // false
```

### `isMatchWith(object, source, customizer)`

This method is like `isMatch` except that it accepts `customizer` which is invoked to compare values.

### `conformsTo(object, source)`

Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.

```typescript
import { conformsTo } from 'highdash';

const object = { 'a': 1, 'b': 2 };
console.log(conformsTo(object, { 'b': (n: number) => n > 1 })); // true
```

### `eq(value, other)`

Performs a SameValueZero comparison between two values to determine if they are equivalent.

```typescript
import { eq } from 'highdash';

console.log(eq(1, 1)); // true
console.log(eq(NaN, NaN)); // true
console.log(eq(-0, 0)); // true
```

### `gt(value, other)`

Checks if `value` is greater than `other`.

```typescript
import { gt } from 'highdash';

console.log(gt(3, 1)); // true
console.log(gt(1, 3)); // false
```

### `gte(value, other)`

Checks if `value` is greater than or equal to `other`.

```typescript
import { gte } from 'highdash';

console.log(gte(3, 1)); // true
console.log(gte(3, 3)); // true
console.log(gte(1, 3)); // false
```

### `lt(value, other)`

Checks if `value` is less than `other`.

```typescript
import { lt } from 'highdash';

console.log(lt(1, 3)); // true
console.log(lt(3, 1)); // false
```

### `lte(value, other)`

Checks if `value` is less than or equal to `other`.

```typescript
import { lte } from 'highdash';

console.log(lte(1, 3)); // true
console.log(lte(3, 3)); // true
console.log(lte(3, 1)); // false
```

---

## Conversion Functions

### `toArray(value)`

Converts `value` to an array.

```typescript
import { toArray } from 'highdash';

console.log(toArray({ 'a': 1, 'b': 2 })); // [1, 2]
console.log(toArray('abc')); // ['a', 'b', 'c']
console.log(toArray(1)); // []
console.log(toArray(null)); // []
```

### `toNumber(value)`

Converts `value` to a number.

```typescript
import { toNumber } from 'highdash';

console.log(toNumber(3.2)); // 3.2
console.log(toNumber(Number.MIN_VALUE)); // 5e-324
console.log(toNumber(Infinity)); // Infinity
console.log(toNumber('3.2')); // 3.2
```

### `toString(value)`

Converts `value` to a string.

```typescript
import { toString } from 'highdash';

console.log(toString(null)); // ''
console.log(toString(-0)); // '0'
console.log(toString([1, 2, 3])); // '1,2,3'
```

### `castArray(value)`

Casts `value` as an array if it's not one.

```typescript
import { castArray } from 'highdash';

console.log(castArray(1)); // [1]
console.log(castArray({ 'a': 1 })); // [{ 'a': 1 }]
console.log(castArray('abc')); // ['abc']
console.log(castArray(null)); // [null]
console.log(castArray(undefined)); // [undefined]
console.log(castArray([1, 2, 3])); // [1, 2, 3]
```

### `clone(value)`

Creates a shallow clone of `value`.

```typescript
import { clone } from 'highdash';

const objects = [{ 'a': 1 }, { 'b': 2 }];
const shallow = clone(objects);
console.log(shallow[0] === objects[0]); // true
```

### `cloneWith(value, customizer)`

Creates a shallow clone of `value` using `customizer` to determine how values are assigned.

### `toFinite(value)`

Converts `value` to a finite number.

```typescript
import { toFinite } from 'highdash';

console.log(toFinite(3.2)); // 3.2
console.log(toFinite(Number.MIN_VALUE)); // 5e-324
console.log(toFinite(Infinity)); // 1.7976931348623157e+308
console.log(toFinite('3.2')); // 3.2
```

### `toInteger(value)`

Converts `value` to an integer.

```typescript
import { toInteger } from 'highdash';

console.log(toInteger(3.2)); // 3
console.log(toInteger(Number.MIN_VALUE)); // 0
console.log(toInteger(Infinity)); // 1.7976931348623157e+308
console.log(toInteger('3.2')); // 3
```

### `toLength(value)`

Converts `value` to a length suitable for use as an array-like object.

```typescript
import { toLength } from 'highdash';

console.log(toLength(3.2)); // 3
console.log(toLength(Number.MIN_VALUE)); // 0
console.log(toLength(Infinity)); // 4294967295
console.log(toLength('3.2')); // 3
```

### `toSafeInteger(value)`

Converts `value` to a safe integer.

```typescript
import { toSafeInteger } from 'highdash';

console.log(toSafeInteger(3.2)); // 3
console.log(toSafeInteger(Number.MIN_VALUE)); // 0
console.log(toSafeInteger(Infinity)); // 9007199254740991
console.log(toSafeInteger('3.2')); // 3
```

### `toPlainObject(value)`

Converts `value` to a plain object flattening inherited enumerable string keyed properties of `value` to own properties of the object.

```typescript
import { toPlainObject } from 'highdash';

function Foo() {
  this.b = 2;
}
Foo.prototype.c = 3;

console.log(toPlainObject(new Foo()));
// => { 'b': 2, 'c': 3 }
```

---

## Import Examples

```typescript
// Import specific functions
import { isArray, isEqual, isEmpty } from 'highdash';

// Import from specific module (better tree-shaking)
import { isArray } from 'highdash/lang/isArray.js';
import { isEqual } from 'highdash/lang/isEqual.js';
import { isEmpty } from 'highdash/lang/isEmpty.js';

// Import all language functions
import * as lang from 'highdash/lang';
```

## Performance Notes

- **`isEqual`**: **1.6× faster** than Lodash - optimized deep equality with cycle detection
- **Type checking**: Optimized implementations using native methods where possible
- **Deep equality**: Cycle-safe with efficient algorithms
- **Memory usage**: Minimal memory overhead for type checking
- **Type safety**: Full TypeScript support with type guards

*Performance metrics based on Node.js 18+ benchmarks, averaged over 5 runs.*

## Common Use Cases

- **Type validation**: Use type checking functions for runtime type validation
- **Deep comparison**: Use `isEqual` for complex object comparison
- **Data conversion**: Use conversion functions for type transformation
- **Empty checks**: Use `isEmpty` for comprehensive empty value checking
- **Partial matching**: Use `isMatch` for object property validation
