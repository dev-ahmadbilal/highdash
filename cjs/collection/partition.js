"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partition = partition;
/**
 * Creates an array of elements split into two groups, the first of which contains elements `predicate` returns truthy for,
 * the second of which contains elements `predicate` returns falsy for.
 * The predicate is invoked with one argument: (value).
 *
 * @param collection - The collection to iterate over
 * @param predicate - The function invoked per iteration
 * @returns Returns the array of grouped elements
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney', 'age': 36, 'active': false },
 *   { 'user': 'fred', 'age': 40, 'active': true },
 *   { 'user': 'pebbles', 'age': 1, 'active': false }
 * ];
 * partition(users, o => o.active);
 * // => [objects for ['fred'], objects for ['barney', 'pebbles']]
 * ```
 */
function partition(collection, predicate) {
    const truthy = [];
    const falsy = [];
    if (!collection) {
        return [truthy, falsy];
    }
    const getValue = typeof predicate === 'function' ? predicate : (item) => Boolean(item[predicate]);
    const items = Array.isArray(collection) ? collection : Object.values(collection);
    for (const item of items) {
        if (getValue(item)) {
            truthy.push(item);
        }
        else {
            falsy.push(item);
        }
    }
    return [truthy, falsy];
}
