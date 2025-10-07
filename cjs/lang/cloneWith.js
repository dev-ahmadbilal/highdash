"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneWith = cloneWith;
/**
 * This method is like `clone` except that it accepts `customizer` which is invoked to produce the cloned value.
 *
 * @param value - The value to clone
 * @param customizer - The function to customize cloning
 * @returns Returns the cloned value
 *
 * @example
 * ```typescript
 * function customizer(value) {
 *   if (isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * }
 *
 * const el = cloneWith(document.body, customizer);
 * // => <body></body>
 * ```
 */
function cloneWith(value, customizer) {
    if (customizer) {
        const result = customizer(value, '', value, undefined);
        if (result !== undefined) {
            return result;
        }
    }
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map((item) => cloneWith(item, customizer));
    }
    if (value instanceof Date) {
        return new Date(value.getTime());
    }
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags);
    }
    if (value instanceof Map) {
        const clonedMap = new Map();
        for (const [key, val] of value) {
            clonedMap.set(cloneWith(key, customizer), cloneWith(val, customizer));
        }
        return clonedMap;
    }
    if (value instanceof Set) {
        const clonedSet = new Set();
        for (const val of value) {
            clonedSet.add(cloneWith(val, customizer));
        }
        return clonedSet;
    }
    // For plain objects
    const cloned = {};
    for (const key in value) {
        if (Object.hasOwn(value, key)) {
            cloned[key] = cloneWith(value[key], customizer);
        }
    }
    return cloned;
}
