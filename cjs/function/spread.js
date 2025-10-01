"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spread = spread;
/**
 * Creates a function that invokes `func` with the array of arguments provided to the created function.
 *
 * @param func - The function to spread arguments over
 * @param start - The start position of spread
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const say = spread((who, what) => who + ' says ' + what);
 * say(['fred', 'hello']);
 * // => 'fred says hello'
 * ```
 */
function spread(func, start = 0) {
    return ((array) => {
        return func(...array.slice(start));
    });
}
