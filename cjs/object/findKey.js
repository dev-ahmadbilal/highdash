"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findKey = findKey;
/**
 * This method is like `find` except that it returns the key of the first element `predicate` returns truthy for instead of the element itself.
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
 * findKey(users, o => o.age < 40);
 * // => 'barney'
 * ```
 */
function findKey(object, predicate) {
    if (!object || typeof object !== 'object') {
        return undefined;
    }
    const getValue = typeof predicate === 'function'
        ? predicate
        : (item) => Boolean(item[predicate]);
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            const value = object[key];
            if (getValue(value, key, object)) {
                return key;
            }
        }
    }
    return undefined;
}
