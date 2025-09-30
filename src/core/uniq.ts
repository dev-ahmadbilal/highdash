/**
 * Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array.
 *
 * @param array - The array to inspect
 * @returns Returns the new duplicate free array
 *
 * @example
 * ```typescript
 * uniq([2, 1, 2]);
 * // => [2, 1]
 *
 * uniq([1, 1, 2, 2, 3, 3]);
 * // => [1, 2, 3]
 * ```
 */
export function uniq<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  return [...new Set(array)];
}

/**
 * This method is like `uniq` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which uniqueness is computed.
 * The order of result values is determined by the order they occur in the array.
 *
 * @param array - The array to inspect
 * @param iteratee - The iteratee invoked per element
 * @returns Returns the new duplicate free array
 *
 * @example
 * ```typescript
 * uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 * ```
 */
export function uniqBy<T>(array: T[], iteratee: ((value: T) => unknown) | string): T[] {
  if (!Array.isArray(array)) {
    return [];
  }

  const seen = new Set();
  const result: T[] = [];
  const getValue =
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => get(item as unknown as Record<string, unknown>, iteratee as string);

  for (const item of array) {
    const key = getValue(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

import { get } from '../object/get';
