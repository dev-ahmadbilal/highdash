"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderBy = orderBy;
/**
 * This method is like `sortBy` except that it allows specifying the sort orders of the iteratees to sort by. If `orders` is unspecified, all values are sorted in ascending order. Otherwise, specify an order of "desc" for descending or "asc" for ascending sort order of corresponding values.
 *
 * @param collection - The collection to iterate over
 * @param iteratees - The iteratees to sort by
 * @param orders - The sort orders of `iteratees`
 * @returns Returns the new sorted array
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 34 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 36 }
 * ];
 *
 * orderBy(users, ['user', 'age'], ['asc', 'desc']);
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 * ```
 */
function orderBy(collection, iteratees = [], orders = []) {
    if (!collection) {
        return [];
    }
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    if (items.length === 0) {
        return [];
    }
    // Normalize iteratees and orders to arrays
    const iterateesArray = Array.isArray(iteratees) ? iteratees : [iteratees];
    const ordersArray = Array.isArray(orders) ? orders : [orders];
    if (iterateesArray.length === 0) {
        return [...items];
    }
    return [...items].sort((a, b) => {
        for (let i = 0; i < iterateesArray.length; i++) {
            const iteratee = iterateesArray[i];
            const order = ordersArray[i] || 'asc';
            const getValue = typeof iteratee === 'function'
                ? iteratee
                : (item) => (0, get_js_1.get)(item, iteratee);
            const aValue = getValue(a);
            const bValue = getValue(b);
            if (aValue === bValue)
                continue;
            const comparison = aValue < bValue ? -1 : 1;
            return order === 'desc' ? -comparison : comparison;
        }
        return 0;
    });
}
const get_js_1 = require("../object/get.js");
