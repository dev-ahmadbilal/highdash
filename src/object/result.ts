/**
 * This method is like `get` except that if the resolved value is a function it's invoked with the `this` binding of its parent object and its result is returned.
 *
 * @param object - The object to query
 * @param path - The path of the property to resolve
 * @param defaultValue - The value returned for `undefined` resolved values
 * @returns Returns the resolved value
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c1': 3, 'c2': () => 4 } }] };
 * result(object, 'a[0].b.c1');
 * // => 3
 *
 * result(object, 'a[0].b.c2');
 * // => 4
 *
 * result(object, 'a[0].b.c3', 'default');
 * // => 'default'
 * ```
 */
export function result<T = unknown>(object: unknown, path: string | string[], defaultValue?: T): T {
  if (!object || typeof object !== 'object') {
    return defaultValue as T
  }

  const pathParts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean)

  let current: unknown = object

  for (const part of pathParts) {
    if (current === null || typeof current !== 'object' || !(part in current)) {
      // Missing path → if defaultValue is a function, invoke it
      return (
        typeof defaultValue === 'function' ? (defaultValue as unknown as Function).call(object) : (defaultValue as T)
      ) as T
    }
    current = (current as Record<string, unknown>)[part]
  }

  if (typeof current === 'function') {
    return (current as Function).call(object) as T
  }

  if (current === undefined && typeof defaultValue === 'function') {
    return (defaultValue as unknown as Function).call(object) as T
  }

  return (current as T) ?? (defaultValue as T)
}
