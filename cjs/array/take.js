"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.take = take;
/**
 * Creates a slice of `array` with `n` elements taken from the beginning.
 *
 * @param array - The array to query
 * @param n - The number of elements to take
 * @returns Returns the slice of `array`
 *
 * @example
 * ```typescript
 * take([1, 2, 3], 2);
 * // => [1, 2]
 *
 * take([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * take([1, 2, 3], 0);
 * // => []
 * ```
 */
function take(array, n = 1) {
    if (!Array.isArray(array) || n <= 0) {
        return [];
    }
    return array.slice(0, n);
}
