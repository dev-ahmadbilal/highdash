"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArguments = isArguments;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is an `arguments` object, else `false`
 *
 * @example
 * ```typescript
 * isArguments(function() { return arguments; }());
 * // => true
 *
 * isArguments([1, 2, 3]);
 * // => false
 * ```
 */
function isArguments(value) {
    return Object.prototype.toString.call(value) === '[object Arguments]';
}
