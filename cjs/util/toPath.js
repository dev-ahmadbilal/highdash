"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPath = toPath;
/**
 * Converts `value` to a property path array.
 *
 * @param value - The value to convert
 * @returns Returns the new property path array
 *
 * @example
 * ```typescript
 * toPath('a.b.c');
 * // => ['a', 'b', 'c']
 *
 * toPath('a[0].b.c');
 * // => ['a', '0', 'b', 'c']
 * ```
 */
function toPath(value) {
    if (value === null)
        return [];
    if (Array.isArray(value))
        return value;
    if (typeof value !== 'string')
        return [];
    return value
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter((x) => x.length > 0);
}
