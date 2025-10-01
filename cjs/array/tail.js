"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tail = tail;
/**
 * Gets all but the first element of `array`.
 *
 * @param array - The array to query
 * @returns Returns the slice of `array`
 *
 * @example
 * ```typescript
 * tail([1, 2, 3]);
 * // => [2, 3]
 *
 * tail([1]);
 * // => []
 *
 * tail([]);
 * // => []
 * ```
 */
function tail(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return [];
    }
    return array.slice(1);
}
