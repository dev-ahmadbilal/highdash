/**
 * This method is like `find` except that it returns the key of the first element `predicate` returns truthy for instead of the element itself.
 *
 * @param object - The object to search
 * @param predicate - The function invoked per iteration
 * @returns Returns the key of the matched element, else `undefined`
 *
 * @example
 * ```typescript
 * const users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * findKey(users, o => o.age < 40);
 * // => 'barney'
 * ```
 */
export function findKey<T extends Record<string, unknown>>(
  object: T,
  predicate: ((value: T[keyof T], key: keyof T, object: T) => boolean) | string,
): keyof T | undefined {
  if (!object || typeof object !== 'object') {
    return undefined;
  }

  const getValue =
    typeof predicate === 'function'
      ? predicate
      : (item: T[keyof T]) => Boolean((item as Record<string, unknown>)[predicate]);

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      if (getValue(value, key, object)) {
        return key;
      }
    }
  }

  return undefined;
}
