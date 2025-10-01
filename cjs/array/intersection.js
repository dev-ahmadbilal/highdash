"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersection = intersection;
/**
 * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons.
 * The order and references of result values are determined by the first array.
 *
 * @param arrays - The arrays to inspect
 * @returns Returns the new array of intersecting values
 *
 * @example
 * ```typescript
 * intersection([2, 1], [2, 3]);
 * // => [2]
 * ```
 */
function intersection(...arrays) {
    if (arrays.length === 0) {
        return [];
    }
    const firstArray = arrays[0];
    if (!Array.isArray(firstArray)) {
        return [];
    }
    const seen = new Set();
    const result = [];
    for (const item of firstArray) {
        if (seen.has(item)) {
            continue;
        }
        let isInAllArrays = true;
        for (let i = 1; i < arrays.length; i++) {
            if (!Array.isArray(arrays[i]) || !arrays[i].includes(item)) {
                isInAllArrays = false;
                break;
            }
        }
        if (isInAllArrays) {
            seen.add(item);
            result.push(item);
        }
    }
    return result;
}
