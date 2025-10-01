"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWeakSet = isWeakSet;
/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a `WeakSet`, else `false`
 *
 * @example
 * ```typescript
 * isWeakSet(new WeakSet);
 * // => true
 *
 * isWeakSet(new Set);
 * // => false
 * ```
 */
function isWeakSet(value) {
    return value !== null && typeof value === 'object' && value.constructor === WeakSet;
}
