"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unset = unset;
/**
 * Removes the property at `path` of `object`.
 *
 * @param object - The object to modify
 * @param path - The path of the property to unset
 * @returns Returns `true` if the property is deleted, else `false`
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 7 } }] };
 * unset(object, 'a[0].b.c');
 * // => true
 *
 * console.log(object);
 * // => { 'a': [{ 'b': {} }] }
 * ```
 */
function unset(object, path) {
    if (!object || typeof object !== 'object') {
        return false;
    }
    const pathParts = Array.isArray(path)
        ? path
        : String(path)
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .filter(Boolean);
    if (pathParts.length === 0) {
        return false;
    }
    let current = object;
    for (let i = 0; i < pathParts.length - 1; i++) {
        const key = pathParts[i];
        if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
            return false;
        }
        current = current[key];
    }
    const lastKey = pathParts[pathParts.length - 1];
    if (lastKey in current) {
        delete current[lastKey];
        return true;
    }
    return false;
}
