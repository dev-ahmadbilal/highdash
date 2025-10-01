"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWeakMap = isWeakMap;
/**
 * Checks if `value` is classified as a `WeakMap` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a `WeakMap`, else `false`
 *
 * @example
 * ```typescript
 * isWeakMap(new WeakMap);
 * // => true
 *
 * isWeakMap(new Map);
 * // => false
 * ```
 */
function isWeakMap(value) {
    return value !== null && typeof value === 'object' && value.constructor === WeakMap;
}
