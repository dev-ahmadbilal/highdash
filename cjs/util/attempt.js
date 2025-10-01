"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attempt = attempt;
/**
 * Attempts to invoke `func`, returning either the result or the caught error object.
 *
 * @param func - The function to attempt
 * @param args - The arguments to invoke `func` with
 * @returns Returns the `func` result or error object
 *
 * @example
 * ```typescript
 * const elements = attempt(selector => document.querySelectorAll(selector), '>_>');
 * if (isError(elements)) {
 *   elements = [];
 * }
 * ```
 */
function attempt(func, ...args) {
    try {
        return func(...args);
    }
    catch (error) {
        return error instanceof Error ? error : new Error(String(error));
    }
}
