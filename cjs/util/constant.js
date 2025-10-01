"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constant = constant;
/**
 * Creates a function that returns `value`.
 *
 * @param value - The value to return from the new function
 * @returns Returns the new constant function
 *
 * @example
 * ```typescript
 * const objects = times(2, constant({ 'a': 1 }));
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 * ```
 */
function constant(value) {
    return () => value;
}
