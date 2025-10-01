"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenDeep = flattenDeep;
/**
 * Recursively flattens `array`.
 *
 * @param array - The array to flatten
 * @returns Returns the new flattened array
 *
 * @example
 * ```typescript
 * flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 * ```
 */
function flattenDeep(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array.flat(Infinity);
}
