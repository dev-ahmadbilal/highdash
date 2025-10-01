"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = defer;
/**
 * Defers invoking the `func` until the current call stack has cleared.
 * Any additional arguments are provided to `func` when it's invoked.
 *
 * @param func - The function to defer
 * @param args - The arguments to invoke `func` with
 * @returns Returns the timer id
 *
 * @example
 * ```typescript
 * defer(text => console.log(text), 'deferred');
 * // => Logs 'deferred' after the current call stack has cleared
 * ```
 */
function defer(func, ...args) {
    return setTimeout(() => func(...args), 0);
}
