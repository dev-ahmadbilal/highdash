"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeWith = mergeWith;
/**
 * This method is like `merge` except that it accepts `customizer` which is invoked to produce the merged values of the destination and source properties.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @param customizer - The function to customize assigned values
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * const object = { 'a': [1], 'b': [2] };
 * const other = { 'a': [3], 'b': [4] };
 * mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 * ```
 */
function mergeWith(object, ...sources) {
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
            if (Object.hasOwn(source, key)) {
                const srcValue = source[key];
                const objValue = object[key];
                if (isCustomizer) {
                    const customFn = customizer;
                    const customValue = customFn(objValue, srcValue, key, object, source);
                    if (customValue !== undefined) {
                        ;
                        object[key] = customValue;
                    }
                    else if (objValue &&
                        typeof objValue === 'object' &&
                        srcValue &&
                        typeof srcValue === 'object' &&
                        !Array.isArray(objValue) &&
                        !Array.isArray(srcValue)) {
                        ;
                        object[key] = mergeWith(objValue, srcValue, customFn);
                    }
                    else if (objValue === undefined) {
                        ;
                        object[key] = srcValue;
                    }
                }
                else {
                    if (objValue &&
                        typeof objValue === 'object' &&
                        srcValue &&
                        typeof srcValue === 'object' &&
                        !Array.isArray(objValue) &&
                        !Array.isArray(srcValue)) {
                        ;
                        object[key] = mergeWith(objValue, srcValue);
                    }
                    else if (objValue === undefined) {
                        ;
                        object[key] = srcValue;
                    }
                }
            }
        }
    }
    return object;
}
