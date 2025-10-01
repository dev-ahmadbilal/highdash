"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultsDeep = defaultsDeep;
/**
 * This method is like `defaults` except that it recursively assigns default properties.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 * ```
 */
function defaultsDeep(object, ...sources) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    for (const source of sources) {
        if (!source || typeof source !== 'object') {
            continue;
        }
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                const sourceValue = source[key];
                const objectValue = object[key];
                if (objectValue !== null &&
                    typeof objectValue === 'object' &&
                    sourceValue !== null &&
                    typeof sourceValue === 'object' &&
                    !Array.isArray(objectValue) &&
                    !Array.isArray(sourceValue)) {
                    object[key] = defaultsDeep(objectValue, sourceValue);
                }
                else if (objectValue === undefined) {
                    object[key] = sourceValue;
                }
            }
        }
    }
    return object;
}
