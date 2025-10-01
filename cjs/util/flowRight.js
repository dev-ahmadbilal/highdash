"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowRight = flowRight;
/**
 * This method is like `flow` except that it creates a function that invokes the given functions from right to left.
 *
 * @param funcs - The functions to invoke
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * function square(n) {
 *   return n * n;
 * }
 *
 * const addSquare = flowRight([square, add]);
 * addSquare(1, 2);
 * // => 9
 * ```
 */
function flowRight(...funcs) {
    if (!funcs || funcs.length === 0) {
        return (...args) => args[0];
    }
    if (funcs.length === 1) {
        const single = funcs[0];
        return (...args) => single(...args);
    }
    return (...args) => {
        let result = funcs[funcs.length - 1](...args);
        for (let i = funcs.length - 2; i >= 0; i--) {
            const fn = funcs[i];
            if (result instanceof Promise) {
                result = result.then((val) => fn(val));
            }
            else {
                result = fn(result);
            }
        }
        return result;
    };
}
