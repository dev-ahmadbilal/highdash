/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 * If only one argument is provided a number between `0` and the given number is returned.
 * If `floating` is `true`, or either `lower` or `upper` are floats, a floating-point number is returned instead of an integer.
 *
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @param floating - Specify returning a floating-point number
 * @returns Returns the random number
 *
 * @example
 * ```typescript
 * random(0, 5);
 * // => an integer between 0 and 5
 *
 * random(5);
 * // => an integer between 0 and 5
 *
 * random(5, true);
 * // => a floating-point number between 0 and 5
 *
 * random(1.2, 5.2);
 * // => a floating-point number between 1.2 and 5.2
 * ```
 */
export function random(lower: number = 0, upper?: number, floating?: boolean): number {
  if (upper === undefined) {
    upper = lower
    lower = 0
  }

  const isFloating = floating || lower % 1 !== 0 || upper % 1 !== 0

  if (isFloating) {
    return lower + Math.random() * (upper - lower)
  }

  return Math.floor(lower + Math.random() * (upper - lower + 1))
}
