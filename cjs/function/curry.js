"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry = curry;
/**
 * Creates a function that accepts arguments of `func` and either invokes `func` returning its result, if at least `arity` number of arguments have been provided, or returns a function that accepts the remaining `func` arguments, and so on.
 * The arity of `func` may be specified if `func.length` is not sufficient.
 *
 * @param func - The function to curry
 * @param arity - The arity of `func`
 * @returns Returns the new curried function
 *
 * @example
 * ```typescript
 * const abc = (a, b, c) => [a, b, c];
 * const curried = curry(abc);
 * curried(1)(2)(3);
 * // => [1, 2, 3]
 * curried(1, 2)(3);
 * // => [1, 2, 3]
 * curried(1, 2, 3);
 * // => [1, 2, 3]
 * ```
 */
function curry(func, arity = func.length) {
    return function curried(...args) {
        if (args.length >= arity) {
            return func(...args);
        }
        return (...nextArgs) => curried(...args, ...nextArgs);
    };
}
