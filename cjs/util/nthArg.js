"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nthArg = nthArg;
/**
 * Creates a function that gets the argument at index `n`.
 *
 * @param n - The index of the argument to return
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const func = nthArg(1);
 * func('a', 'b', 'c', 'd');
 * // => 'b'
 *
 * const func2 = nthArg(-2);
 * func2('a', 'b', 'c', 'd');
 * // => 'c'
 * ```
 */
function nthArg(n = 0) {
    return (...args) => {
        const index = n < 0 ? args.length + n : n;
        return args[index];
    };
}
