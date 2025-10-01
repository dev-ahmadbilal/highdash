"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWith = updateWith;
/**
 * This method is like `update` except that it accepts `customizer` which is invoked to produce the objects of `path`.
 *
 * @param object - The object to modify
 * @param path - The path of the property to set
 * @param updater - The function to produce the updated value
 * @param customizer - The function to customize path creation
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = {};
 * updateWith(object, '[0][1]', () => 'a', Object);
 * // => { '0': { '1': 'a' } }
 * ```
 */
function updateWith(object, path, updater, customizer) {
    if (!object || typeof object !== 'object') {
        return object;
    }
    const pathParts = Array.isArray(path)
        ? path
        : String(path)
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .filter(Boolean);
    if (pathParts.length === 0) {
        return object;
    }
    let current = object;
    for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
            const newValue = customizer ? customizer(current[key], key, current) : {};
            current[key] = newValue !== undefined ? newValue : {};
        }
        current = current[key];
    }
    const lastKey = pathParts[pathParts.length - 1];
    const currentValue = current[lastKey];
    current[lastKey] = updater(currentValue);
    return object;
}
