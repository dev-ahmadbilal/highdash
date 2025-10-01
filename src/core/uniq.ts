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
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  // Optimize for small arrays
  if (array.length < 10) {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      if (result.indexOf(item) === -1) {
        result.push(item);
      }
    }
    return result;
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
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  const seen = new Set();
  const result: T[] = [];

  let getValue: (item: T) => unknown;
  if (typeof iteratee === 'function') {
    getValue = iteratee;
  } else {
    const path = iteratee as string;
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access - avoid get() overhead
      getValue = (item: T) => (item as any)?.[path];
    } else {
      // Complex path - use get()
      getValue = (item: T) => {
        if (item !== null && typeof item === 'object') {
          return get(item as unknown as Record<string, unknown>, path);
        }
        return undefined;
      };
    }
  }

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const key = getValue(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

import { get } from '../object/get.js';
