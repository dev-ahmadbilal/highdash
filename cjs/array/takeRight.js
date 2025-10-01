"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeRight = takeRight;
/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @param array - The array to query
 * @param n - The number of elements to take
 * @returns Returns the slice of `array`
 *
 * @example
 * ```typescript
 * takeRight([1, 2, 3], 2);
 * // => [2, 3]
 *
 * takeRight([1, 2, 3], 5);
 * // => [1, 2, 3]
 *
 * takeRight([1, 2, 3], 0);
 * // => []
 * ```
 */
function takeRight(array, n = 1) {
    if (!Array.isArray(array) || n <= 0) {
        return [];
    }
    return array.slice(-n);
}
