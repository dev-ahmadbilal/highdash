/**
 * Creates an object composed of the own and inherited enumerable string keyed properties of `object` that `predicate` returns truthy for.
 * The predicate is invoked with two arguments: (value, key).
 *
 * @param object - The source object
 * @param predicate - The function invoked per property
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * pickBy(object, isNumber);
 * // => { 'a': 1, 'c': 3 }
 * ```
 */
export function pickBy<T extends Record<string, unknown>>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
  if (!object || typeof object !== 'object') {
    return {};
  }

  const result: Partial<T> = {};

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const value = object[key];
      if (predicate(value, key)) {
        result[key] = value;
      }
    }
  }

  return result;
}
