"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyBy = keyBy;
/**
 * Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`.
 * The corresponding value of each key is the last element responsible for generating the key.
 * The iteratee is invoked with one argument: (value).
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ];
 * keyBy(array, 'dir');
 * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
 * ```
 */
function keyBy(collection, iteratee) {
    const result = {};
    if (!collection) {
        return result;
    }
    const getValue = typeof iteratee === 'function' ? iteratee : (item) => item[iteratee];
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    for (const item of items) {
        const key = String(getValue(item));
        result[key] = item;
    }
    return result;
}
