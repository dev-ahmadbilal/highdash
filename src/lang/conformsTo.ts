/**
 * Checks if `object` conforms to `source` by invoking the predicate properties of `source` with the corresponding property values of `object`.
 *
 * @param object - The object to inspect
 * @param source - The object of property predicates to conform to
 * @returns Returns `true` if `object` conforms, else `false`
 *
 * @example
 * ```typescript
 * const object = { 'a': 1, 'b': 2 };
 * conformsTo(object, { 'b': function(n) { return n > 1; } });
 * // => true
 *
 * conformsTo(object, { 'b': function(n) { return n > 2; } });
 * // => false
 * ```
 */
export function conformsTo<T extends Record<string, unknown>>(
  object: T,
  source: Record<string, (value: unknown) => boolean>,
): boolean {
  if (!object || typeof object !== 'object') {
    return false
  }

  for (const key in source) {
    if (Object.hasOwn(source, key)) {
      const predicate = source[key]
      if (typeof predicate !== 'function') {
        return false
      }

      if (!predicate(object[key])) {
        return false
      }
    }
  }

  return true
}
