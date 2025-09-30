/**
 * The opposite of `filter`; this method returns the elements of `collection` that `predicate` does **not** return truthy for.
 *
 * @param collection - The collection to iterate over
 * @param predicate - The function invoked per iteration
 * @returns Returns the new filtered array
 *
 * @example
 * ```typescript
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred', 'active': false }
 * ];
 *
 * reject(users, 'active');
 * // => [{ 'user': 'fred', 'active': false }]
 * ```
 */
export function reject<T>(
  collection: T[] | Record<string, T>,
  predicate: ((value: T, index: number, collection: T[] | Record<string, T>) => boolean) | string,
): T[] {
  if (!collection) {
    return [];
  }

  const getValue =
    typeof predicate === 'function' ? predicate : (item: T) => Boolean((item as Record<string, unknown>)[predicate]);

  const items = Array.isArray(collection) ? collection : Object.values(collection);
  const result: T[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!getValue(item, i, collection)) {
      result.push(item);
    }
  }

  return result;
}
