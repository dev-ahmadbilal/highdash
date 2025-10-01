"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.union = union;
/**
 * Creates an array of unique values, in order, from all given arrays using SameValueZero for equality comparisons.
 *
 * @param arrays - The arrays to inspect
 * @returns Returns the new array of combined values
 *
 * @example
 * ```typescript
 * union([2], [1, 2]);
 * // => [2, 1]
 * ```
 */
function union(...arrays) {
    const seen = new Set();
    const result = [];
    for (const array of arrays) {
        if (Array.isArray(array)) {
            for (const item of array) {
                if (!seen.has(item)) {
                    seen.add(item);
                    result.push(item);
                }
            }
        }
    }
    return result;
}
