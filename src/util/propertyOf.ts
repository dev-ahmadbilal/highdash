/**
 * The opposite of `property`; this method creates a function that returns the value at a given path of `object`.
 *
 * @param object - The object to query
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const array = ['a', 'b', 'c'];
 * const object = { 'a': array, 'b': array, 'c': array };
 * const func = propertyOf(object);
 *
 * func('a[2]');
 * // => 'c'
 *
 * func(['a', '2']);
 * // => 'c'
 * ```
 */
export function propertyOf<T = unknown>(object: unknown): (path: string | string[]) => T {
  return (path: string | string[]): T => {
    if (!object || typeof object !== 'object') {
      return undefined as T;
    }

    const pathParts = Array.isArray(path)
      ? path
      : String(path)
          .replace(/\[(\d+)\]/g, '.$1')
          .split('.')
          .filter(Boolean);

    let current: unknown = object;

    for (const part of pathParts) {
      if (current === null || typeof current !== 'object' || !(part in current)) {
        return undefined as T;
      }
      current = (current as Record<string, unknown>)[part];
    }

    return current as T;
  };
}
