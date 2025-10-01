"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = debounce;
/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * - Supports leading/trailing edges and optional `maxWait`.
 * - Exposes `cancel()`, `flush()`, and `pending()` helpers.
 * - Uses a monotonic clock when available for stable timing.
 *
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @param options - The options object
 * @param options.leading - Specify invoking on the leading edge of the timeout
 * @param options.trailing - Specify invoking on the trailing edge of the timeout
 * @param options.maxWait - The maximum time `func` is allowed to be delayed before it's invoked
 * @returns Returns the new debounced function
 *
 * @example
 * // Trailing call (default)
 * const debounced = debounce((x: number) => x * 2, 200);
 * debounced(2);
 * debounced(3);
 * debounced.flush(); // => 6
 *
 * @example
 * // Leading + trailing
 * const log = debounce((msg: string) => console.log(msg), 300, { leading: true, trailing: true });
 * log('first'); // prints immediately
 * log('second'); // coalesced
 * log.flush(); // prints 'second'
 */
function debounce(func, wait = 0, options = {}) {
    const now = typeof performance !== 'undefined' && typeof performance.now === 'function'
        ? () => performance.now()
        : () => Date.now();
    const { leading = false, trailing = true, maxWait } = options;
    let lastCallTime;
    let lastInvokeTime = 0;
    let lastArgs;
    let lastThis;
    let result;
    let timerId;
    let maxing = false;
    if (typeof maxWait === 'number') {
        maxing = true;
    }
    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;
        lastArgs = undefined;
        lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer
        lastInvokeTime = time;
        // Start the timer for the trailing edge
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        const timeSinceLastCall = time - (lastCallTime || 0);
        const timeWaiting = wait - timeSinceLastCall;
        if (!maxing)
            return timeWaiting;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const maxWaitTime = (maxWait || 0) - timeSinceLastInvoke;
        return Math.min(timeWaiting, maxWaitTime);
    }
    function shouldInvoke(time) {
        if (lastCallTime === undefined)
            return true;
        const timeSinceLastCall = time - lastCallTime;
        if (timeSinceLastCall >= wait || timeSinceLastCall < 0)
            return true;
        if (maxing) {
            const timeSinceLastInvoke = time - lastInvokeTime;
            return timeSinceLastInvoke >= (maxWait || 0);
        }
        return false;
    }
    function timerExpired() {
        const time = now();
        if (shouldInvoke(time)) {
            trailingEdge(time);
            return;
        }
        // Restart the timer
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = undefined;
        lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = undefined;
        lastCallTime = undefined;
        lastThis = undefined;
        timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(now());
    }
    function pending() {
        return timerId !== undefined;
    }
    function debounced(...args) {
        const time = now();
        const isInvoking = shouldInvoke(time);
        lastArgs = args;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
}
