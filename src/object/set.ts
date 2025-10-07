/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist, it's created.
 * Arrays are created for missing index properties while objects are created for all other missing properties.
 *
 * @param object - The object to modify
 * @param path - The path of the property to set
 * @param value - The value to set
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 3 } }] };
 * set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 * ```
 */
export function set<T extends Record<string, unknown>>(object: T, path: string | string[], value: unknown): T {
  if (!object || typeof object !== 'object') {
    return object
  }

  // eslint-disable-next-line no-useless-escape
  const keys = Array.isArray(path) ? path : path.split(/[.[\]]+/).filter(Boolean)
  let current: Record<string, unknown> = object

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const nextKey = keys[i + 1]

    if (!(key in current) || current[key] === null || current[key] === undefined) {
      // Determine if next key is a number (array index)
      const isNextKeyNumeric = /^\d+$/.test(nextKey)
      current[key] = isNextKeyNumeric ? [] : {}
    }

    current = current[key] as Record<string, unknown>
  }

  const lastKey = keys[keys.length - 1]
  current[lastKey] = value

  return object
}
