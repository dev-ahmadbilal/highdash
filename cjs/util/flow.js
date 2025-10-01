"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flow = flow;
/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function,
 * where each successive invocation is supplied the return value of the previous.
 *
 * @param funcs - The functions to invoke
 * @returns Returns the new composite function
 *
 * @example
 * ```typescript
 * function square(n) {
 *   return n * n;
 * }
 *
 * const addSquare = flow([add, square]);
 * addSquare(1, 2);
 * // => 9
 * ```
 */
function flow(funcs) {
    if (funcs.length === 0) {
        return (...args) => args[0];
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return (...args) => {
        let result = funcs[0](...args);
        for (let i = 1; i < funcs.length; i++) {
            result = funcs[i](result);
        }
        return result;
    };
}
