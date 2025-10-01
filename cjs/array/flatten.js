"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatten = flatten;
/**
 * Flattens `array` a single level deep.
 *
 * @param array - The array to flatten
 * @returns Returns the new flattened array
 *
 * @example
 * ```typescript
 * flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 * ```
 */
function flatten(array) {
    if (!Array.isArray(array)) {
        return [];
    }
    return array.flat(1);
}
