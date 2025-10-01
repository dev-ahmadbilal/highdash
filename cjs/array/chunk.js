"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunk = chunk;
/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param array - The array to process
 * @param size - The length of each chunk
 * @returns Returns the new array of chunks
 *
 * @example
 * ```typescript
 * chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 * ```
 */
function chunk(array, size = 1) {
    if (!Array.isArray(array) || size < 1) {
        return [];
    }
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}
