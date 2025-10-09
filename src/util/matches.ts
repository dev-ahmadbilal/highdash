/**
 * Creates a function that performs a partial deep comparison between a given object and `source`, returning `true` if the given object has equivalent property values, else `false`.
 *
 * @param source - The object of property values to match
 * @returns Returns the new spec function
 *
 * @example
 * ```typescript
 * const objects = [
 *   { 'a': 1, 'b': 2, 'c': 3 },
 *   { 'a': 4, 'b': 5, 'c': 6 }
 * ];
 *
 * filter(objects, matches({ 'a': 4, 'c': 6 }));
 * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
 * ```
 */
export function matches<T extends Record<string, unknown>>(source: T): (object: unknown) => boolean {
  return (object: unknown): boolean => {
    if (!object || typeof object !== 'object') {
      return false
    }

    for (const key in source) {
      if (Object.hasOwn(source, key)) {
        const sourceValue = source[key]
        const objectValue = (object as Record<string, unknown>)[key]

        if (
          sourceValue !== objectValue &&
          (sourceValue === null ||
            typeof sourceValue !== 'object' ||
            objectValue === null ||
            typeof objectValue !== 'object' ||
            !matches(sourceValue as Record<string, unknown>)(objectValue))
        ) {
          return false
        }
      }
    }

    return true
  }
}
