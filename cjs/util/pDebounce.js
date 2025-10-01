"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pDebounce = pDebounce;
/**
 * Promise-aware debounce. Collects calls within the wait window and resolves all callers
 * with the result of the last invocation.
 *
 * - Trailing by default; supports leading/trailing
 * - All pending callers receive the same resolved/rejected value
 *
 * @example
 * const fn = async (x: number) => x * 2;
 * const debounced = pDebounce(fn, 100);
 * const [a, b] = await Promise.all([debounced(1), debounced(2)]);
 * // a === 4, b === 4
 */
function pDebounce(fn, wait = 0, options = {}) {
    const { leading = false, trailing = true } = options;
    let timer;
    let lastArgs;
    let lastThis;
    const pendingResolvers = [];
    const pendingRejecters = [];
    let invoked = false;
    function invoke(timeArgs, timeThis) {
        try {
            const result = fn.apply(timeThis, timeArgs);
            Promise.resolve(result).then((value) => {
                const resolvers = pendingResolvers.slice();
                pendingResolvers.length = 0;
                pendingRejecters.length = 0;
                for (const resolve of resolvers)
                    resolve(value);
            }, (err) => {
                const rejecters = pendingRejecters.slice();
                pendingResolvers.length = 0;
                pendingRejecters.length = 0;
                for (const reject of rejecters)
                    reject(err);
            });
        }
        catch (err) {
            const rejecters = pendingRejecters.slice();
            pendingResolvers.length = 0;
            pendingRejecters.length = 0;
            for (const reject of rejecters)
                reject(err);
        }
    }
    function schedule() {
        if (timer !== undefined)
            clearTimeout(timer);
        timer = setTimeout(() => {
            timer = undefined;
            if (trailing && lastArgs) {
                const args = lastArgs;
                const ctx = lastThis;
                lastArgs = undefined;
                lastThis = undefined;
                invoke(args, ctx);
            }
            else {
                // If nothing to invoke, resolve pending with undefined
                const resolvers = pendingResolvers.slice();
                pendingResolvers.length = 0;
                pendingRejecters.length = 0;
                for (const resolve of resolvers)
                    resolve(undefined);
            }
        }, wait);
    }
    return function debounced(...args) {
        lastArgs = args;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        lastThis = this;
        const promise = new Promise((resolve, reject) => {
            pendingResolvers.push(resolve);
            pendingRejecters.push(reject);
        });
        const shouldInvokeLeading = leading && !invoked;
        if (shouldInvokeLeading) {
            invoked = true;
            invoke(args, this);
        }
        schedule();
        return promise;
    };
}
