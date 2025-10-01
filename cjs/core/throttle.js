"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = throttle;
/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 * The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them.
 *
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout
 * @param options.trailing - Specify invoking on the trailing edge of the timeout
 * @returns Returns the new throttled function
 *
 * @example
 * ```typescript
 * const throttled = throttle(() => console.log('Hello'), 1000);
 * throttled(); // Will log 'Hello' immediately
 * throttled(); // Ignored
 * throttled(); // Ignored
 * // After 1000ms, the next call will be allowed
 * ```
 */
function throttle(func, wait = 0, options = {}) {
    const { leading = true, trailing = true } = options;
    return (0, debounce_js_1.debounce)(func, wait, {
        leading,
        trailing,
        maxWait: wait,
    });
}
// Re-export debounce for internal use
const debounce_js_1 = require("./debounce.js");
