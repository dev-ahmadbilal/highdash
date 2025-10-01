"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = omit;
/**
 * The opposite of `pick`; this method creates an object composed of the own enumerable string keyed properties of `object` that are not omitted.
 *
 * @param object - The source object
 * @param paths - The property paths to omit
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 * ```
 */
function omit(object, paths) {
    const result = {};
    if (!object || typeof object !== 'object') {
        return result;
    }
    const pathsSet = new Set(paths);
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key) && !pathsSet.has(key)) {
            result[key] = object[key];
        }
    }
    return result;
}
