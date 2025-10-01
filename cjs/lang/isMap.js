"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMap = isMap;
/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a map, else `false`
 *
 * @example
 * ```typescript
 * isMap(new Map);
 * // => true
 *
 * isMap(new WeakMap);
 * // => false
 * ```
 */
function isMap(value) {
    return value instanceof Map;
}
