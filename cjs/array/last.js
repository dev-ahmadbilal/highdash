"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = last;
/**
 * Gets the last element of `array`.
 *
 * @param array - The array to query
 * @returns Returns the last element of `array`
 *
 * @example
 * ```typescript
 * last([1, 2, 3]);
 * // => 3
 *
 * last([]);
 * // => undefined
 * ```
 */
function last(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return undefined;
    }
    return array[array.length - 1];
}
