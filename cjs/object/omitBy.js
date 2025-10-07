"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omitBy = omitBy;
/**
 * The opposite of `pickBy`; this method creates an object composed of the own and inherited enumerable string keyed properties of `object` that `predicate` doesn't return truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param object - The source object
 * @param predicate - The function invoked per property
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * omitBy(object, isNumber);
 * // => { 'b': '2' }
 * ```
 */
function omitBy(object, predicate) {
    if (!object || typeof object !== 'object') {
        return {};
    }
    const result = {};
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            const value = object[key];
            if (!predicate(value, key)) {
                result[key] = value;
            }
        }
    }
    return result;
}
