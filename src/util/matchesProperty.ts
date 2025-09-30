/**
 * Creates a function that performs a partial deep comparison between a given object and `source`, returning `true` if the given object has equivalent property values, else `false`.
 *
 * @param path - The path of the property to get
 * @param srcValue - The value to match
 * @returns Returns the new function
 *
 * @example
 * ```typescript
 * const objects = [
 *   { 'a': 1, 'b': 2, 'c': 3 },
 *   { 'a': 4, 'b': 5, 'c': 6 }
 * ];
 *
 * find(objects, matchesProperty('a', 4));
 * // => { 'a': 4, 'b': 5, 'c': 6 }
 * ```
 */
export function matchesProperty<T = unknown>(path: string | string[], srcValue: T): (object: unknown) => boolean {
  return (object: unknown): boolean => {
    if (!object || typeof object !== 'object') {
      return false;
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
        return false;
      }
      current = (current as Record<string, unknown>)[part];
    }

    return current === srcValue;
  };
}
