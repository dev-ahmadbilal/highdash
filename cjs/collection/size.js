"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.size = size;
/**
 * Gets the size of `collection` by returning its length for array-like values or the number of own enumerable string keyed properties for objects.
 *
 * @param collection - The collection to inspect
 * @returns Returns the collection size
 *
 * @example
 * ```typescript
 * size([1, 2, 3]);
 * // => 3
 *
 * size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * size('pebbles');
 * // => 7
 * ```
 */
function size(collection) {
    if (collection === null || collection === undefined) {
        return 0;
    }
    if (Array.isArray(collection) || typeof collection === 'string') {
        return collection.length;
    }
    if (collection instanceof Map || collection instanceof Set) {
        return collection.size;
    }
    if (typeof collection === 'object') {
        return Object.keys(collection).length;
    }
    return 0;
}
