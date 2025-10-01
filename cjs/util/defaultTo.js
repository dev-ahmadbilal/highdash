"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTo = defaultTo;
/**
 * Checks `value` to determine whether a default value should be returned in its place.
 *
 * @param value - The value to check
 * @param defaultValue - The default value
 * @returns Returns the resolved value
 *
 * @example
 * ```typescript
 * defaultTo(1, 10);
 * // => 1
 *
 * defaultTo(undefined, 10);
 * // => 10
 * ```
 */
function defaultTo(value, defaultValue) {
    return value === null || value === undefined ? defaultValue : value;
}
