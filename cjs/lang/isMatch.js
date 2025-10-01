"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatch = isMatch;
/**
 * Performs a partial deep comparison between `object` and `source` to determine if `object` contains equivalent property values.
 *
 * @param object - The object to inspect
 * @param source - The object of property values to match
 * @returns Returns `true` if `object` is a match, else `false`
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': 2 };
 * isMatch(object, { 'b': 2 });
 * // => true
 *
 * isMatch(object, { 'b': 1 });
 * // => false
 * ```
 */
function isMatch(object, source) {
    if (object === source) {
        return true;
    }
    if (object === null || typeof object !== 'object' || source === null || typeof source !== 'object') {
        return false;
    }
    const sourceObj = source;
    const objectObj = object;
    for (const key in sourceObj) {
        if (Object.prototype.hasOwnProperty.call(sourceObj, key)) {
            const sourceValue = sourceObj[key];
            const objectValue = objectObj[key];
            if (sourceValue !== objectValue &&
                (sourceValue === null ||
                    typeof sourceValue !== 'object' ||
                    objectValue === null ||
                    typeof objectValue !== 'object' ||
                    !isMatch(objectValue, sourceValue))) {
                return false;
            }
        }
    }
    return true;
}
