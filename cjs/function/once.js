"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = once;
/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 * The `func` is invoked with the `this` binding and arguments of the created function.
 *
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * ```typescript
 * const initialize = once(() => console.log('Initialized'));
 * initialize();
 * // => 'Initialized'
 * initialize();
 * // => 'Initialized' (no output)
 * ```
 */
function once(func) {
    let called = false;
    let result;
    return function (...args) {
        if (!called) {
            called = true;
            result = func.apply(this, args);
        }
        return result;
    };
}
