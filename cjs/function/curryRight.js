"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curryRight = curryRight;
/**
 * This method is like `curry` except that arguments are applied to `func` in the manner of `partialRight` instead of `partial`.
 *
 * @param func - The function to curry
 * @param arity - The arity of `func`
 * @returns Returns the new curried function
 *
 * @example
 * ```typescript
 * const abc = (a: string, b: string, c: string) => [a, b, c];
 * const curried = curryRight(abc);
 *
 * curried('c')('b')('a');
 * // => ['a', 'b', 'c']
 *
 * curried('c', 'b')('a');
 * // => ['a', 'b', 'c']
 * ```
 */
function curryRight(func, arity = func.length) {
    if (arity < 0) {
        arity = 0;
    }
    function curried(...args) {
        if (args.length >= arity) {
            const requiredLeft = Math.max(0, func.length - arity);
            const rightArgs = args.slice(args.length - arity);
            const haveLeft = args.length - arity;
            if (haveLeft >= requiredLeft) {
                const leftArgs = args.slice(0, haveLeft);
                return func(...[...leftArgs, ...rightArgs]);
            }
            const frozenRight = rightArgs.slice().reverse();
            return (...nextLeft) => {
                return func(...[...nextLeft, ...frozenRight]);
            };
        }
        return (...nextArgs) => {
            // Prepend nextArgs to the left, and keep previously provided args to the right
            return curried(...nextArgs, ...args);
        };
    }
    return curried;
}
