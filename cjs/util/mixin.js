"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = mixin;
/**
 * Adds all own enumerable string keyed function properties of a source object to the destination object.
 *
 * @param object - The destination object
 * @param source - The object of functions to add
 * @param options - The options object
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function vowels(string) {
 *   return string.match(/[aeiou]/g);
 * }
 *
 * mixin({}, { 'vowels': vowels });
 * // => { 'vowels': vowels }
 * ```
 */
function mixin(object, source) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    if (!source || typeof source !== 'object') {
        return object;
    }
    for (const key in source) {
        if (Object.hasOwn(source, key)) {
            const value = source[key];
            if (typeof value === 'function') {
                ;
                object[key] = value;
            }
        }
    }
    return object;
}
