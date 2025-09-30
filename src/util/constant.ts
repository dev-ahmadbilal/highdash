/**
 * Creates a function that returns `value`.
 *
 * @param value - The value to return from the new function
 * @returns Returns the new constant function
 *
 * @example
 * ```typescript
 * const objects = times(2, constant({ 'a': 1 }));
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 * ```
 */
export function constant<T>(value: T): () => T {
  return () => value;
}
