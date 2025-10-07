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
export function clamp(number: number, lower: number, upper: number): number {
  if (lower > upper) {
    ;[lower, upper] = [upper, lower]
  }

  return Math.min(Math.max(number, lower), upper)
}
