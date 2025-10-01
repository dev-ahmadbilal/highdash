"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
/**
 * This method is like `set` except that it accepts `updater` to produce the value to set.
 *
 * @param object - The object to modify
 * @param path - The path of the property to set
 * @param updater - The function to produce the updated value
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * update(object, 'a[0].b.c', n => n * n);
 * console.log(object.a[0].b.c);
 * // => 9
 * ```
 */
function update(object, path, updater) {
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
            current[key] = {};
        }
        current = current[key];
    }
    const lastKey = pathParts[pathParts.length - 1];
    const currentValue = current[lastKey];
    current[lastKey] = updater(currentValue);
    return object;
}
