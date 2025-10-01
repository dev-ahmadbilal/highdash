import { get } from '../object/get.js';

/**
 * This method is like `mean` except that it accepts `iteratee` which is invoked for each element in `array` to generate the value to be averaged.
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the mean
 *
 * @example
 * ```typescript
 * const objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 * meanBy(objects, o => o.n);
 * // => 5
 * ```
 */
export function meanBy<T>(array: T[], iteratee: ((value: T) => number) | string): number {
  if (!Array.isArray(array) || array.length === 0) {
    return NaN;
  }

  let getValue: (item: T) => unknown;
  if (typeof iteratee === 'function') {
    getValue = iteratee;
  } else {
    const path = iteratee as string;
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access
      getValue = (item: T) => (item as Record<string, unknown>)[path];
    } else {
      // Complex path
      getValue = (item: T) => get(item as unknown as Record<string, unknown>, path);
    }
  }

  const sum = array.reduce((acc, value) => {
    const val = getValue(value);
    // Handle undefined as 0, non-numeric values as NaN
    if (val === undefined) return acc + 0;
    if (typeof val !== 'number' || isNaN(val)) return NaN;
    return acc + val;
  }, 0);

  return sum / array.length;
}
