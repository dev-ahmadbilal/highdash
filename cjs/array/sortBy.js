"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBy = sortBy;
/**
 * Creates an array of elements, sorted in ascending order by the results of running each element in a collection through each iteratee.
 * This method performs a stable sort, that is, it preserves the original sort order of equal elements.
 * The iteratees are invoked with one argument: (value).
 *
 * @param collection - The collection to iterate over
 * @param iteratees - The iteratees to sort by
 * @returns Returns the new sorted array
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 * ```
 */
function sortBy(collection, ...iteratees) {
    if (!collection) {
        return [];
    }
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    if (items.length === 0) {
        return [];
    }
    // Process iteratees
    const flatIteratees = [];
    for (const iter of iteratees) {
        flatIteratees.push(typeof iter === 'string' ? (obj) => (0, get_js_1.get)(obj, iter) : iter);
    }
    return [...items].sort((a, b) => {
        for (const iteratee of flatIteratees) {
            const aValue = iteratee(a);
            const bValue = iteratee(b);
            // Handle comparison with proper type checking
            if (aValue === bValue)
                continue;
            if (aValue < bValue)
                return -1;
            if (aValue > bValue)
                return 1;
        }
        return 0;
    });
}
const get_js_1 = require("../object/get.js");
