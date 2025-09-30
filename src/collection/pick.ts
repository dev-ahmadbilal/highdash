/**
 * Creates an object composed of the picked `object` properties.
 *
 * @param object - The source object
 * @param paths - The property paths to pick
 * @returns Returns the new object
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': '2', 'c': 3 };
 * pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(object: T, paths: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;

  if (!object || typeof object !== 'object') {
    return result;
  }

  for (const path of paths) {
    if (Object.prototype.hasOwnProperty.call(object, path)) {
      result[path] = object[path];
    }
  }

  return result;
}
