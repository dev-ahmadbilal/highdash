"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conforms = conforms;
/**
 * Creates a function that invokes the predicate properties of `source` with the corresponding property values of a given object, returning `true` if all predicates return truthy, else `false`.
 *
 * @param source - The object of property predicates to conform to
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const objects = [
 *   { 'a': 2, 'b': 1 },
 *   { 'a': 1, 'b': 2 }
 * ];
 *
 * filter(objects, conforms({ 'b': function(n) { return n > 1; } }));
 * // => [{ 'a': 1, 'b': 2 }]
 * ```
 */
function conforms(source) {
    return (object) => {
        if (!object || typeof object !== 'object') {
            return false;
        }
        const obj = object;
        for (const key in source) {
            if (Object.hasOwn(source, key)) {
                const predicate = source[key];
                if (typeof predicate !== 'function') {
                    return false;
                }
                if (!predicate(obj[key])) {
                    return false;
                }
            }
        }
        return true;
    };
}
