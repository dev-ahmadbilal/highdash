"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoolean = isBoolean;
/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is a boolean, else `false`
 *
 * @example
 * ```typescript
 * isBoolean(false);
 * // => true
 *
 * isBoolean(null);
 * // => false
 * ```
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
