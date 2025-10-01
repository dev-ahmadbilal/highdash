"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = isFunction;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a function, else `false`
 *
 * @example
 * ```typescript
 * isFunction(Array.prototype.slice);
 * // => true
 *
 * isFunction('abc');
 * // => false
 * ```
 */
function isFunction(value) {
    return typeof value === 'function';
}
