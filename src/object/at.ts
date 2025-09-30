/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * @param object - The object to iterate over
 * @param paths - The property paths to pick
 * @returns Returns the picked values
 *
 * @example
 * ```typescript
 * const object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
 * at(object, ['a[0].b.c', 'a[1]']);
 * // => [3, 4]
 * ```
 */
export function at<T extends Record<string, unknown>>(object: T, paths: string[]): unknown[] {
  if (!object || typeof object !== 'object' || !Array.isArray(paths)) {
    return [];
  }

  return paths.map((path) => {
    const pathParts = String(path)
      .replace(/\[(\d+)\]/g, '.$1')
      .split('.')
      .filter(Boolean);

    let current: unknown = object;

    for (const part of pathParts) {
      if (current === null || typeof current !== 'object' || !(part in current)) {
        return undefined;
      }
      current = (current as Record<string, unknown>)[part];
    }

    return current;
  });
}
