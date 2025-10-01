"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectLike = isObjectLike;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null` and has a `typeof` result of "object".
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is object-like, else `false`
 *
 * @example
 * ```typescript
 * isObjectLike({});
 * // => true
 *
 * isObjectLike([1, 2, 3]);
 * // => true
 *
 * isObjectLike(Function);
 * // => false
 *
 * isObjectLike(null);
 * // => false
 * ```
 */
function isObjectLike(value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function');
}
