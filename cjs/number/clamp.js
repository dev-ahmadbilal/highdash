"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = clamp;
/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @param number - The number to clamp
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns Returns the clamped number
 *
 * @example
 * ```typescript
 * clamp(-10, -5, 5);
 * // => -5
 *
 * clamp(10, -5, 5);
 * // => 5
 *
 * clamp(3, -5, 5);
 * // => 3
 * ```
 */
function clamp(number, lower, upper) {
    if (lower > upper) {
        ;
        [lower, upper] = [upper, lower];
    }
    return Math.min(Math.max(number, lower), upper);
}
