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
export function rangeRight(start: number, end?: number, step?: number): number[] {
  if (end === undefined) {
    end = start;
    start = 0;
  }

  if (step === undefined) {
    step = start < end ? 1 : -1;
  }

  if (step === 0) {
    return Array(Math.abs(end - start)).fill(start);
  }

  const result: number[] = [];
  let current = end - step;

  while (step > 0 ? current >= start : current <= start) {
    result.push(current);
    current -= step;
  }

  return result;
}
