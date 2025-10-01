"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isError = isError;
/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`, `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an error object, else `false`
 *
 * @example
 * ```typescript
 * isError(new Error);
 * // => true
 *
 * isError(Error);
 * // => false
 * ```
 */
function isError(value) {
    return value instanceof Error;
}
