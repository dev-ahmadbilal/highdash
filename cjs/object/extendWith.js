"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendWith = extendWith;
/**
 * This method is like `extend` except that it accepts `customizer` which is invoked to produce the merged values of the destination and source properties.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @param customizer - The function to customize assigned values
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function customizer(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * }
 *
 * const object = { 'a': 1 };
 * extendWith(object, { 'a': 2, 'b': 2 }, customizer);
 * // => { 'a': 1, 'b': 2 }
 * ```
 */
function extendWith(object, ...sources) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    const customizer = sources[sources.length - 1];
    const isCustomizer = typeof customizer === 'function';
    const sourceObjects = isCustomizer ? sources.slice(0, -1) : sources;
    for (const source of sourceObjects) {
        if (!source || typeof source !== 'object') {
            continue;
        }
        for (const key in source) {
            const srcValue = source[key];
            const objValue = object[key];
            if (objValue === undefined) {
                if (isCustomizer) {
                    const customValue = customizer(objValue, srcValue, key, object, source);
                    object[key] = customValue !== undefined ? customValue : srcValue;
                }
                else {
                    object[key] = srcValue;
                }
            }
            else {
                // Overwrite with later sources
                object[key] = srcValue;
            }
        }
    }
    return object;
}
