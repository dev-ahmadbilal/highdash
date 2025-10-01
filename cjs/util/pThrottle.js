"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pThrottle = pThrottle;
/**
 * Promise-aware throttle. Limits invocation rate to at most once per `wait`.
 *
 * @example
 * const throttled = pThrottle(async (x: number) => x, 200);
 * await throttled(1);
 */
const pDebounce_js_1 = require("./pDebounce.js");
function pThrottle(fn, wait = 0, options = {}) {
    const { leading = true, trailing = true } = options;
    // Simulate throttle via debounce pattern for promises
    return (0, pDebounce_js_1.pDebounce)(fn, wait, { leading, trailing });
}
