"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMatchWith = isMatchWith;
/**
 * This method is like `isMatch` except that it accepts `customizer` which is invoked to compare values.
 *
 * @param object - The object to inspect
 * @param source - The object of property values to match
 * @param customizer - The function to customize comparisons
 * @returns Returns `true` if `object` is a match, else `false`
 *
 * @example
 * ```typescript
 * function isGreeting(value) {
 *   return /^h(?:i|ello)$/.test(value);
 * }
 *
 * function customizer(objValue, srcValue) {
 *   if (isGreeting(objValue) && isGreeting(srcValue)) {
 *     return true;
 *   }
 * }
 *
 * const object = { 'greeting': 'hello' };
 * const source = { 'greeting': 'hi' };
 *
 * isMatchWith(object, source, customizer);
 * // => true
 * ```
 */
function isMatchWith(object, source, customizer) {
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
            if (customizer) {
                const result = customizer(objectValue, sourceValue, key, object, source);
                if (result !== undefined) {
                    if (!result) {
                        return false;
                    }
                    continue;
                }
            }
            if (sourceValue !== objectValue &&
                (sourceValue === null ||
                    typeof sourceValue !== 'object' ||
                    objectValue === null ||
                    typeof objectValue !== 'object' ||
                    !isMatchWith(objectValue, sourceValue, customizer))) {
                return false;
            }
        }
    }
    return true;
}
