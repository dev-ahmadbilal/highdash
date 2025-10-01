"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initial = initial;
/**
 * Gets all but the last element of `array`.
 *
 * @param array - The array to query
 * @returns Returns the slice of `array`
 *
 * @example
 * ```typescript
 * initial([1, 2, 3]);
 * // => [1, 2]
 *
 * initial([1]);
 * // => []
 *
 * initial([]);
 * // => []
 * ```
 */
function initial(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return [];
    }
    return array.slice(0, -1);
}
