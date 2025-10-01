"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = identity;
/**
 * This method returns the first argument it receives.
 *
 * @param value - Any value
 * @returns Returns `value`
 *
 * @example
 * ```typescript
 * const object = { 'a': 1 };
 * identity(object) === object;
 * // => true
 * ```
 */
function identity(value) {
    return value;
}
