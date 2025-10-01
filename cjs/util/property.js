"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.property = property;
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @param path - The path of the property to get
 * @returns Returns the new accessor function
 *
 * @example
 * ```typescript
 * const objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * map(objects, property('a.b'));
 * // => [2, 1]
 * ```
 */
function property(path) {
    const parts = Array.isArray(path)
        ? path
        : String(path)
            .replace(/\[(\d+)\]/g, '.$1')
            .split('.')
            .filter((x) => x.length > 0);
    return (object) => {
        if (object === null || object === undefined || typeof object !== 'object') {
            return undefined;
        }
        if (parts.length === 0)
            return undefined;
        let cur = object;
        for (const p of parts) {
            if (cur === null)
                return undefined;
            cur = cur[p];
        }
        return cur;
    };
}
