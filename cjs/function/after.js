"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.after = after;
/**
 * The opposite of `before`; this method creates a function that invokes `func` once it's called `n` or more times.
 *
 * @param n - The number of calls before `func` is invoked
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 *
 * @example
 * ```typescript
 * const saves = ['profile', 'settings'];
 * const done = after(saves.length, () => console.log('done saving!'));
 *
 * saves.forEach(save => {
 *   asyncSave({ 'type': save, 'complete': done });
 * });
 * // => Logs 'done saving!' after the two async saves have completed
 * ```
 */
function after(n, func) {
    let count = 0;
    return ((...args) => {
        count++;
        if (count >= n) {
            return func(...args);
        }
    });
}
