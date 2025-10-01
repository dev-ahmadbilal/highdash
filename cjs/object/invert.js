"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invert = invert;
/**
 * Creates an object composed of the inverted keys and values of `object`.
 * If `object` contains duplicate values, subsequent values overwrite the property assignments of previous values.
 *
 * @param object - The object to invert
 * @returns Returns the new inverted object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': 2, 'c': 1 };
 * invert(object);
 * // => { '1': 'c', '2': 'b' }
 * ```
 */
function invert(object) {
    if (!object || typeof object !== 'object') {
        return {};
    }
    const result = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = String(object[key]);
            result[value] = key;
        }
    }
    return result;
}
