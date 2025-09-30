/**
 * This method is like `merge` except that it accepts `customizer` which is invoked to produce the merged values of the destination and source properties.
 *
 * @param object - The destination object
 * @param sources - The source objects
 * @param customizer - The function to customize assigned values
 * @returns Returns `object`
 *
 * @example
 * ```typescript
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * const object = { 'a': [1], 'b': [2] };
 * const other = { 'a': [3], 'b': [4] };
 * mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 * ```
 */
export function mergeWith<T extends Record<string, unknown>>(
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
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const srcValue = source[key];
        const objValue = (object as Record<string, unknown>)[key];

        if (isCustomizer) {
          const customValue = (customizer as Function)(objValue, srcValue, key, object, source);
          if (customValue !== undefined) {
            (object as Record<string, unknown>)[key] = customValue;
          } else if (objValue === undefined) {
            (object as Record<string, unknown>)[key] = srcValue;
          }
        } else {
          if (objValue === undefined) {
            (object as Record<string, unknown>)[key] = srcValue;
          }
        }
      }
    }
  }

  return object;
}
