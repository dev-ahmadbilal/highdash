/**
 * Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`.
 * The corresponding value of each key is an array of elements responsible for generating the key.
 * The iteratee is invoked with one argument: (value).
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * groupBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * groupBy(['one', 'two', 'three'], 'length');
 * // => { '3': ['one', 'two'], '5': ['three'] }
 * ```
 */
export function groupBy<T>(
  collection: T[] | Record<string, T>,
  iteratee: ((value: T) => unknown) | string,
): Record<string, T[]> {
  if (!collection) {
    return {};
  }

  const items = Array.isArray(collection) ? collection : Object.values(collection);
  const length = items.length;

  if (length === 0) {
    return {};
  }

  const result: Record<string, T[]> = {};

  if (typeof iteratee === 'function') {
    // Function iteratee
    for (let i = 0; i < length; i++) {
      const item = items[i];
      const key = String(iteratee(item));
      const group = result[key];
      if (group) {
        group.push(item);
      } else {
        result[key] = [item];
      }
    }
  } else {
    // String iteratee
    const path = iteratee as string;
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      // Simple property access
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const key = String((item as any)?.[path]);
        const group = result[key];
        if (group) {
          group.push(item);
        } else {
          result[key] = [item];
        }
      }
    } else {
      // Complex path
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const key = String(get(item as unknown as Record<string, unknown>, path));
        const group = result[key];
        if (group) {
          group.push(item);
        } else {
          result[key] = [item];
        }
      }
    }
  }

  return result;
}

import { get } from '../object/get.js';
