/**
 * Creates an object composed of keys generated from the results of running each element of `collection` through `iteratee`. The corresponding value of each key is the number of times the key was returned by `iteratee`.
 * The iteratee is invoked with one argument: (value).
 *
 * @param collection - The collection to iterate over
 * @param iteratee - The iteratee to transform keys
 * @returns Returns the composed aggregate object
 *
 * @example
 * ```typescript
 * countBy([6.1, 4.2, 6.3], Math.floor);
 * // => { '4': 1, '6': 2 }
 *
 * countBy(['one', 'two', 'three'], 'length');
 * // => { '3': 2, '5': 1 }
 * ```
 */
export function countBy<T>(
  collection: T[] | Record<string, T>,
  iteratee: ((value: T) => unknown) | string,
): Record<string, number> {
  const result: Record<string, number> = {};

  if (!collection) {
    return result;
  }

  const getValue = typeof iteratee === 'function' ? iteratee : (item: T) => (item as Record<string, unknown>)[iteratee];

  const items = Array.isArray(collection) ? collection : Object.values(collection);

  for (const item of items) {
    const key = String(getValue(item));
    result[key] = (result[key] || 0) + 1;
  }

  return result;
}
