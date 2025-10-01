"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ary = ary;
/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring any additional arguments.
 *
 * @param func - The function to cap arguments for
 * @param n - The arity cap
 * @returns Returns the new capped function
 *
 * @example
 * ```typescript
 * const map = ary(Array.prototype.map, 1);
 * map(['6', '8', '10'], parseInt);
 * // => [6, 8, 10]
 * ```
 */
function ary(func, n = func.length) {
    if (n < 0) {
        n = 0;
    }
    return ((...args) => {
        return func(...args.slice(0, n));
    });
}
