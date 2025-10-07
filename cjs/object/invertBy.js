"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertBy = invertBy;
/**
 * This method is like `invert` except that the inverted object is generated from the results of running each element of `object` thru `iteratee`.
 *
 * @param object - The object to invert
 * @param iteratee - The function invoked per iteration
 * @returns Returns the new inverted object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': 2, 'c': 1 };
 * invertBy(object);
 * // => { '1': ['a', 'c'], '2': ['b'] }
 *
 * invertBy(object, value => 'group' + value);
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 * ```
 */
function invertBy(object, iteratee) {
    if (!object || typeof object !== 'object') {
        return {};
    }
    const result = {};
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            const value = object[key];
            let invertedKey;
            if (typeof iteratee === 'function') {
                invertedKey = String(iteratee(value));
            }
            else if (iteratee) {
                const v = value[iteratee];
                invertedKey = String(v);
            }
            else {
                invertedKey = String(value);
            }
            if (!result[invertedKey]) {
                result[invertedKey] = [];
            }
            result[invertedKey].push(key);
        }
    }
    return result;
}
