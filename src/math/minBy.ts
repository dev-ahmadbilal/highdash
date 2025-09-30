/**
 * This method is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 * The iteratee is invoked with one argument: (value).
 *
 * @param array - The array to iterate over
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the minimum value
 *
 * @example
 * ```typescript
 * const objects = [{ 'n': 1 }, { 'n': 2 }];
 * minBy(objects, o => o.n);
 * // => { 'n': 1 }
 *
 * minBy(objects, 'n');
 * // => { 'n': 1 }
 * ```
 */
export function minBy<T>(array: T[], iteratee: ((value: T) => number) | string): T | undefined {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const getValue =
    typeof iteratee === 'function' ? iteratee : (item: T) => Number((item as Record<string, unknown>)[iteratee]);

  let minValue = getValue(array[0]);
  let minItem = array[0];

  for (let i = 1; i < array.length; i++) {
    const value = getValue(array[i]);
    if (value < minValue) {
      minValue = value;
      minItem = array[i];
    }
  }

  return minItem;
}
