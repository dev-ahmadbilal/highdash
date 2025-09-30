/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @param path - The path of the property to get
 * @returns Returns the new accessor function
 *
 * @example
 * ```typescript
 * const objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * map(objects, property('a.b'));
 * // => [2, 1]
 * ```
 */
export function property<T = unknown>(path: string | string[]): (object: unknown) => T {
  const pathParts = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\d+)\]/g, '.$1')
        .split('.')
        .filter(Boolean);

  return (object: unknown): T => {
    if (!object || typeof object !== 'object') {
      return undefined as T;
    }

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
