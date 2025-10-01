"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.has = has;
/**
 * Checks if `path` is a direct property of `object`.
 *
 * @param object - The object to query
 * @param path - The path to check
 * @returns Returns `true` if `path` exists, else `false`
 *
 * @example
 * ```typescript
 * const object = { 'a': { 'b': 2 } };
 * has(object, 'a');
 * // => true
 *
 * has(object, 'a.b');
 * // => false
 *
 * has(object, ['a', 'b']);
 * // => false
 * ```
 */
function has(object, path) {
    if (object === null || typeof object !== 'object') {
        return false;
    }
    const pathParts = Array.isArray(path)
        ? path
        : String(path)
            .replace(/\[(\d+)\]/g, '.$1') // Convert indexes to properties
            .split('.')
            .filter(Boolean); // Split by dots and remove empty strings
    let current = object;
    for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];
        if (current === null || typeof current !== 'object' || !(part in current)) {
            return false;
        }
        current = current[part];
    }
    return true;
}
