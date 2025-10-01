"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastKey = findLastKey;
/**
 * This method is like `findKey` except that it iterates over elements of a collection in reverse order.
 *
 * @param object - The object to search
 * @param predicate - The function invoked per iteration
 * @returns Returns the key of the matched element, else `undefined`
 *
 * @example
 * ```typescript
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * findLastKey(users, o => o.age < 40);
 * // => 'pebbles'
 * ```
 */
function findLastKey(object, predicate) {
    if (!object || typeof object !== 'object') {
        return undefined;
    }
    const getValue = typeof predicate === 'function'
        ? predicate
        : (item) => Boolean(item[predicate]);
    const keys = Object.keys(object);
    for (let i = keys.length - 1; i >= 0; i--) {
        const key = keys[i];
        const value = object[key];
        if (getValue(value, key, object)) {
            return key;
        }
    }
    return undefined;
}
