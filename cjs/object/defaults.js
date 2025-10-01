"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = defaults;
/**
 * Assigns own enumerable string keyed properties of source objects to the destination object for all destination properties that resolve to `undefined`.
 * Source objects are applied from left to right. Once a property is set, additional values of the same property are ignored.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 * ```
 */
function defaults(object, ...sources) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    for (const source of sources) {
        if (!source || typeof source !== 'object') {
            continue;
        }
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (object[key] === undefined) {
                    object[key] = source[key];
                }
            }
        }
    }
    return object;
}
