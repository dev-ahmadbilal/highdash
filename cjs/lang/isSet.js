"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSet = isSet;
/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a set, else `false`
 *
 * @example
 * ```typescript
 * isSet(new Set);
 * // => true
 *
 * isSet(new WeakSet);
 * // => false
 * ```
 */
function isSet(value) {
    return value instanceof Set;
}
