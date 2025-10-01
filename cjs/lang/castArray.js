"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castArray = castArray;
/**
 * Casts `value` as an array if it's not one.
 *
 * @param value - The value to inspect
 * @returns Returns the cast array
 *
 * @example
 * ```typescript
 * castArray(1);
 * // => [1]
 *
 * castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * castArray('abc');
 * // => ['abc']
 *
 * castArray(null);
 * // => [null]
 *
 * castArray(undefined);
 * // => [undefined]
 *
 * castArray();
 * // => []
 *
 * castArray([1, 2, 3]);
 * // => [1, 2, 3]
 * ```
 */
function castArray(value) {
    if (Array.isArray(value)) {
        return value;
    }
    return [value];
}
