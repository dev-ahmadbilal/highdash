"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = wrap;
/**
 * Creates a function that provides `value` to `wrapper` as its first argument. Any additional arguments provided to the function are appended to those provided to the `wrapper`.
 *
 * @param value - The value to wrap
 * @param wrapper - The wrapper function
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const p = wrap(escape, (func, text) => '<p>' + func(text) + '</p>');
 * p('fred, barney, & pebbles');
 * // => '<p>fred, barney, &amp; pebbles</p>'
 * ```
 */
function wrap(value, wrapper) {
    return function (...args) {
        return wrapper.apply(this, [value, ...args]);
    };
}
