/**
 * This method is like `assignIn` except that it accepts `customizer` which is invoked to produce the assigned values.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @param customizer - The function to customize assigned values
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function customizer(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * }
 *
 * const object = { 'a': 1 };
 * assignInWith(object, { 'a': 2, 'b': 2 }, customizer);
 * // => { 'a': 1, 'b': 2 }
 * ```
 */
export function assignInWith<T extends Record<string, unknown>>(
  object: T,
  ...sources: (
    | Record<string, unknown>
    | ((objValue: unknown, srcValue: unknown, key: string, object: T, source: Record<string, unknown>) => unknown)
  )[]
): T {
  if (!object || typeof object !== 'object') {
    return object;
  }

  const customizer = sources[sources.length - 1];
  const isCustomizer = typeof customizer === 'function';
  const sourceObjects = isCustomizer ? sources.slice(0, -1) : sources;

  for (const source of sourceObjects) {
    if (!source || typeof source !== 'object') {
      continue;
    }

    for (const key in source) {
      const srcValue = (source as Record<string, unknown>)[key];
      const objValue = (object as Record<string, unknown>)[key];

      if (isCustomizer) {
        const customValue = (customizer as Function)(objValue, srcValue, key, object, source);
        (object as Record<string, unknown>)[key] = customValue !== undefined ? customValue : srcValue;
      } else {
        (object as Record<string, unknown>)[key] = srcValue;
      }
    }
  }

  return object;
}
