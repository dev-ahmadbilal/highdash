/**
 * This method is like `find` except that it iterates over elements of `collection` from right to left.
 *
 * @param collection - The collection to inspect
 * @param predicate - The function invoked per iteration
 * @returns Returns the matched element, else `undefined`
 *
 * @example
 * ```typescript
 * findLast([1, 2, 3, 4], n => n % 2 === 1);
 * // => 3
 * ```
 */
export function findLast<T>(
  collection: T[] | Record<string, T>,
  predicate: ((value: T, index: number, collection: T[] | Record<string, T>) => boolean) | string,
): T | undefined {
  if (!collection) {
    return undefined;
  }

  const getValue =
    typeof predicate === 'function' ? predicate : (item: T) => Boolean((item as Record<string, unknown>)[predicate]);

  if (Array.isArray(collection)) {
    for (let i = collection.length - 1; i >= 0; i--) {
      if (getValue(collection[i], i, collection)) {
        return collection[i];
      }
    }
  } else {
    const keys = Object.keys(collection);
    for (let i = keys.length - 1; i >= 0; i--) {
      const key = keys[i];
      const value = collection[key];
      if (getValue(value, i, collection)) {
        return value;
      }
    }
  }

  return undefined;
}
