"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = delay;
/**
 * Invokes `func` after `wait` milliseconds. Any additional arguments are provided to `func` when it's invoked.
 *
 * @param func - The function to delay
 * @param wait - The number of milliseconds to delay invocation
 * @param args - The arguments to invoke `func` with
 * @returns Returns the timer id
 *
 * @example
 * ```typescript
 * delay(text => console.log(text), 1000, 'later');
 * // => Logs 'later' after one second
 * ```
 */
function delay(func, wait, ...args) {
    return setTimeout(() => func(...args), wait);
}
