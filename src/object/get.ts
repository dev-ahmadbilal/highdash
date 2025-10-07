/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 *
 * @param object - The object to query
 * @param path - The path of the property to get
 * @param defaultValue - The value returned for `undefined` resolved values
 * @returns Returns the resolved value
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * get(object, 'a[0].b.c');
 * // => 3
 *
 * get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * get(object, 'a.b.c', 'default');
 * // => 'default'
 * ```
 */
export function get<T = unknown>(
  object: Record<string, unknown>,
  path: string | string[],
  defaultValue?: T,
): T | undefined {
  if (!object || typeof object !== 'object') {
    return defaultValue
  }

  let keys: string[]

  if (Array.isArray(path)) {
    keys = path
  } else {
    // Optimize for simple property access
    if (path.indexOf('.') === -1 && path.indexOf('[') === -1) {
      keys = [path]
    } else {
      // eslint-disable-next-line no-useless-escape
      keys = path.split(/[.[\]]+/).filter(Boolean)
    }
  }

  let result: unknown = object

  for (const key of keys) {
    if (result === null || result === undefined || typeof result !== 'object') {
      return defaultValue
    }
    result = (result as Record<string, unknown>)[key]
  }

  return result === undefined ? defaultValue : (result as T)
}
