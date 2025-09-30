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
  const result: Record<string, T[]> = {};

  if (!collection) {
    return result;
  }

  const getValue = typeof iteratee === 'function' ? iteratee : (item: T) => (item as Record<string, unknown>)[iteratee];

  const items = Array.isArray(collection) ? collection : Object.values(collection);

  for (const item of items) {
    const key = String(getValue(item));
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}
