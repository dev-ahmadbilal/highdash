/**
 * Checks if `value` is an empty object, collection, map, or set.
 * Objects are considered empty if they have no own enumerable string keyed properties.
 * Arrays are considered empty if they have a `length` of `0`.
 * Strings are considered empty if they have a `length` of `0`.
 *
 * @param value - The value to check
 * @returns Returns `true` if `value` is empty, else `false`
 *
 * @example
 * ```typescript
 * isEmpty(null);
 * // => true
 *
 * isEmpty(true);
 * // => true
 *
 * isEmpty(1);
 * // => true
 *
 * isEmpty([1, 2, 3]);
 * // => false
 *
 * isEmpty('abc');
 * // => false
 *
 * isEmpty({ 'a': 1 });
 * // => false
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return true
  }

  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}
