"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.before = before;
/**
 * Creates a function that invokes `func`, with the `this` binding and arguments of the created function, while it's called less than `n` times.
 * Subsequent calls to the created function return the result of the last `func` invocation.
 *
 * @param n - The number of calls at which `func` is no longer invoked
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * ```typescript
 * const add = (a: number, b: number) => a + b;
 * const limitedAdd = before(3, add);
 *
 * limitedAdd(1, 2);
 * // => 3
 *
 * limitedAdd(2, 3);
 * // => 5
 *
 * limitedAdd(3, 4);
 * // => 5 (result of last invocation)
 * ```
 */
function before(n, func) {
    let remaining = n;
    let lastResult = undefined;
    const singleInvoke = n === 1;
    return ((...args) => {
        if (singleInvoke) {
            if (remaining === 1) {
                remaining = 0;
                return func(...args);
            }
            return undefined;
        }
        // n > 1: allow n-1 invocations, then return cached last result
        if (remaining > 1) {
            remaining -= 1;
            lastResult = func(...args);
            return lastResult;
        }
        return lastResult;
    });
}
