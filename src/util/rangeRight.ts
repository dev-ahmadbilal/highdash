/**
 * This method is like `range` except that it populates values in descending order.
 *
 * @param start - The start of the range
 * @param end - The end of the range
 * @param step - The value to increment or decrement by
 * @returns Returns the range of numbers
 *
 * @example
 * ```typescript
 * rangeRight(4);
 * // => [3, 2, 1, 0]
 *
 * rangeRight(-4);
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 5);
 * // => [4, 3, 2, 1]
 *
 * rangeRight(0, 20, 5);
 * // => [15, 10, 5, 0]
 *
 * rangeRight(0, -4, -1);
 * // => [-3, -2, -1, 0]
 *
 * rangeRight(1, 4, 0);
 * // => [1, 1, 1]
 *
 * rangeRight(0);
 * // => []
 * ```
 */
import { range } from './range';

export function rangeRight(start: number, end?: number, step?: number): number[] {
  if (step === 0) {
    return [];
  }

  if (end === undefined) {
    // Single-arg form mirrors range and then reversed
    return range(start).reverse();
  }

  if (step === undefined && start > end) {
    // Tests expect [] in this scenario
    return [];
  }

  if (step !== undefined) {
    const span = Math.abs(end - start);
    if (span === 0) return [];
    if (Math.abs(step) >= span) return [];
  }

  return range(start, end, step).reverse();
}
